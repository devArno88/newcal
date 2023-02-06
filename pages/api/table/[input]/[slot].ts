import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TableBookingSchema } from "@/src/schemas";
// import { TableBookingSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/pool/[date]/[slot]
    // @desc      Create new pool booking
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res, session) {
        try {
            // const existingBooking = await TableBookingSchema.findOne({ date: req.query.date, flat: session?.flat });
            // if (existingBooking) return res.status(500).json({ err: "You already have a booking for this day" });
            const booking = new TableBookingSchema({
                date: req.query.input,
                slot: req.query.slot,
                flat: session?.flat,
            });
            await booking.save();
            res.json({ msg: `Table booked successfully for ${req.query.input}` });
        } catch (err) {
            console.error(err);
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
        res.status(500).json({ msg: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/pool/[date]/[slot]");
