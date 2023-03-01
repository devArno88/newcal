import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { GymBookingSchema } from "@/src/schemas";
import { connectDB, niceDate } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/pool/[date]/[slot]
    // @desc      Create new pool booking
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res, session) {
        try {
            const booking = new GymBookingSchema({ date: req.query.input, slot: req.query.slot, flat: session?.flat });
            await booking.save();
            res.status(200).json({ msg: `Gym booked successfully for ${niceDate(req.query.input)}` });
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
        res.status(500).json({ err: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/gym/[input]/[slot]");
