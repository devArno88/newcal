import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_BookingType, E_Fetches } from "@/src/interfaces";
import { PoolBookingSchema, ResidentSchema } from "@/src/schemas";
import { sendEmail } from "@/src/services";
import { bookingEmail } from "@/src/strings";
// import { PoolBookingSchema } from "@/src/schemas";
import { connectDB, defaultSlotDetails, niceDate } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/pool/[input]/[slot]
    // @desc      Create new pool booking
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res, session) {
        try {
            const booking = new PoolBookingSchema({ date: req.query.input, slot: req.query.slot, flat: session?.flat });
            await booking.save();
            const resident = await ResidentSchema.findById(session?.id);
            if (!resident) return res.status(500).json({ err: "Invalid resident" });
            const { name, email, flat } = resident;
            const { start, end } = defaultSlotDetails({ type: E_BookingType.pool, slot: +req.query.slot });
            const date = niceDate(new Date(req.query.input));
            await sendEmail({
                to: email,
                subject: "Pool Booking Confirmed",
                html: bookingEmail({ name, flat, start, end, date, type: E_BookingType.pool }),
            });
            res.status(200).json({ msg: `Pool booked successfully for ${niceDate(req.query.input)}` });
        } catch (err) {
            res.status(500).json({ err: "Pool booking could not be created" });
        }
    },

    ///////////////////////////////////////////////////////////
    // @routes    FORBIDDEN
    // @desc      When a forbidden method is requested
    ///////////////////////////////////////////////////////////
    async [E_Fetches.forbidden](req, res, session) {
        res.status(405).end(`${req.method} Not Allowed`);
    },
};

const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        const execute = routes[req.method] || routes[E_Fetches.forbidden];
        return execute(req, res, session);
    } else {
        res.status(500).json({ err: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/pool/[input]/[slot]");
