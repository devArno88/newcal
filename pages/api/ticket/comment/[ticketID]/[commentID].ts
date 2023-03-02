import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TicketSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    DELETE api/ticket/comment/[ticketID]/[commentID]
    // @desc      Add ticket comment
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.delete](req, res, session) {
        try {
            const ticket = await TicketSchema.findById(req.query.ticketID);
            if (!ticket) return res.status(500).json({ err: "Invalid ticket" });
            const comment = ticket.comments.filter((x) => x._id.toString() === req.query.commentID)[0];
            if (!comment) return res.status(500).json({ err: "Invalid comment" });
            ticket.comments = ticket.comments.filter((x) => x._id.toString() !== req.query.commentID);
            await ticket.save();
            res.status(200).json({ msg: "Comment deleted successfully" });
        } catch (err) {
            res.status(500).json({ err: "Comment could not be created" });
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

export default connectDB(handler, "/api/ticket/comment/[ticketID]/[commentID]");
