import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TicketSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/ticket/[ticketID]
    // @desc      Get ticket
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const ticket = await TicketSchema.findById(req.query.ticketID);
            res.status(200).json(ticket);
        } catch (err) {
            res.status(500).json({ err: "Invalid ticket" });
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

export default connectDB(handler, "/api/ticket/[ticketID]");
