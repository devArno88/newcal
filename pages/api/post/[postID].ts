import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PostSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/post/[postID]
    // @desc      Get post
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const post = await PostSchema.findById(req.query.postID).populate([
                "user",
                "likes.user",
                "comments.user",
                "comments.likes.user",
                "views.user",
            ]);
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ err: "Invalid post" });
        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    DELETE api/post/[postID]
    // @desc      Delete post
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.delete](req, res, session) {
        try {
            const post = await PostSchema.findById(req.query.postID);
            if (!post) return res.status(500).json({ err: "Invalid post" });
            await PostSchema.findByIdAndDelete(req.query.postID);
            res.status(200).json({ msg: "Post deleted successfully" });
        } catch (err) {
            res.status(500).json({ err: "Post could not be deleted" });
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

export default connectDB(handler, "/api/post/[postID]");
