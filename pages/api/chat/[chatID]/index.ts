import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { ChatSchema } from "@/src/schemas";
import { connectDB, isAdmin } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/chat/chatID
    // @desc      Get chat
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const chat = await ChatSchema.findOne({ _id: req.query.chatID }).populate("messages.user");
            res.status(200).json(chat);
        } catch (err) {
            res.status(500).json({ err: `Could not fetch and populate chat ${req.query.chatID}` });
        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/chat/chatID
    // @desc      Send chat message
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const { text } = req.body;
            const chat = await ChatSchema.findById(req.query.chatID);
            if (!chat) return res.status(500).json({ err: "Invalid chat" });
            chat.messages.unshift({
                text,
                user: session?.id,
                userType: isAdmin(session) ? "admin" : "resident",
            });
            await chat.save();
            res.status(200).json({ msg: "Message sent successfully" });
        } catch (err) {
            res.status(500).json({ err: "Message could not be sent" });
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

export default connectDB(handler, "/api/chat/[chatID]");
