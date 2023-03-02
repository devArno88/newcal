import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TicketSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/ticket/like/[ticketID]
    // @desc      Like/unlike ticket
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const ticket = await TicketSchema.findById(req.query.ticketID);
            if (!ticket) return res.status(500).json({ err: "Invalid ticket" });
            if (ticket.likes.some((id) => id.toString() === session?.id)) {
                ticket.likes = ticket.likes.filter((id) => id.toString() !== session?.id);
            } else {
                ticket.likes.unshift(session?.id);
            }
            await ticket.save();
            res.status(200).json({ msg: "Post liked successfully" });
        } catch (err) {
            res.status(500).json({ err: "Post could not be liked" });
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

export default connectDB(handler, "/api/ticket/like/[ticketID]");
