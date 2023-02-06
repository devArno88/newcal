import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PoolBookingSchema } from "@/src/schemas";
import { connectDB, getDateRange } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/pool/[date]
    // @desc      Get pool bookings for specific date
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const { start, end } = getDateRange(req.query.input);
            const bookings = await PoolBookingSchema.find({
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
    // @routes    DELETE api/pool/[date]/[slot]
    // @desc      Delete existing pool booking
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.delete](req, res, session) {
        try {
            // const { start, end } = getDateRange(req.query.date);
            const booking = await PoolBookingSchema.findById(req.query.input);
            if (!booking) return res.status(500).json({ err: "Booking not found" });
            await PoolBookingSchema.findOneAndDelete({ _id: req.query.input });
            res.json({ msg: `Pool booking deleted successfully` });
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

export default connectDB(handler, "/api/pool/[date]");
