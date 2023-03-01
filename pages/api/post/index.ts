import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PostSchema } from "@/src/schemas/Post";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/post
    // @desc      Create new post
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res, session) {
        try {
            const { ...data } = req.body;
            const post = new PostSchema({
                ...data,
                resident: session.id,
            });
            await post.save();
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ err: "Post could not be created" });
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

export default connectDB(handler, "/api/pool/[date]");
