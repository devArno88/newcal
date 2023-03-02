import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TicketSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/ticket/comment/like/[ticketID]/[commentID]
    // @desc      Like/unlike ticket comment
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const ticket = await TicketSchema.findById(req.query.ticketID);
            if (!ticket) return res.status(500).json({ err: "Invalid ticket" });
            const comment = ticket.comments.filter((x) => x._id.toString() === req.query.commentID)[0];
            if (!comment) return res.status(500).json({ err: "Invalid comment" });
            if (comment.likes.some((id) => id.toString() === session?.id)) {
                comment.likes = comment.likes.filter((id) => id.toString() !== session?.id);
            } else {
                comment.likes.unshift(session?.id);
            }
            await ticket.save();
            res.status(200).json({ msg: "Post comment liked successfully" });
        } catch (err) {
            res.status(500).json({ err: "Post comment could not be liked" });
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
