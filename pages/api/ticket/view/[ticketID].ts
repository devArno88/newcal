import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { TicketSchema } from "@/src/schemas";
import { connectDB, isAdmin } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/ticket/view/[ticketID]
    // @desc      Add ticket view
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const ticket = await TicketSchema.findById(req.query.ticketID);
            if (!ticket) return res.status(500).json({ err: "Invalid ticket" });
            const userType = isAdmin(session) ? "admin" : "resident";
            if (!ticket.views.some((x) => x.user.toString() === session?.id && x.userType === userType))
                ticket.views.unshift({ user: session?.id, userType });
            await ticket.save();
            res.status(200).json({ msg: "Post viewed successfully" });
        } catch (err) {
            res.status(500).json({ err: "Post could not be viewed" });
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

export default connectDB(handler, "/api/ticket/view/[ticketID]");
