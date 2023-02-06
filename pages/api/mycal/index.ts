import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { GymBookingSchema, PoolBookingSchema, TableBookingSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/pool/[date]
    // @desc      Get pool bookings for specific date
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const pool = await PoolBookingSchema.find({
                flat: session?.flat,
            });
            const gym = await GymBookingSchema.find({
                flat: session?.flat,
            });
            const table = await TableBookingSchema.find({
                flat: session?.flat,
            });
            res.json({
                pool,
                gym,
                table,
            });
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
