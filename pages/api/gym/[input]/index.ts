import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { GymBookingSchema } from "@/src/schemas";
import { connectDB, getDateRange } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/pool/[input]
    // @desc      Get pool bookings for specific date
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const { start, end } = getDateRange(req.query.input);
            const bookings = await GymBookingSchema.find({
                date: {
                    $gte: start,
                    $lt: end,
                },
            });
            res.json(bookings);
        } catch (err) {
            console.error(err);
        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    DELETE api/pool/[input]/[slot]
    // @desc      Delete existing pool booking
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.delete](req, res, session) {
        try {
            const booking = await GymBookingSchema.findById(req.query.input);
            if (!booking) return res.status(500).json({ err: "Booking not found" });
            await GymBookingSchema.findOneAndDelete({ _id: req.query.input });
            res.status(200).json({ msg: "Gym booking deleted successfully" });
        } catch (err) {
            res.status(500).json({ msg: "Gym booking could not be deleted" });
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

export default connectDB(handler, "/api/gym/[input]");
