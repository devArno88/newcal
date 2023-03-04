import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PostSchema } from "@/src/schemas";
import { connectDB, isAdmin } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/post/view/[postID]
    // @desc      Add post view
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const post = await PostSchema.findById(req.query.postID);
            if (!post) return res.status(500).json({ err: "Invalid post" });
            const userType = isAdmin(session) ? "admin" : "resident";
            if (!post.views.some((x) => x.user.toString() === session?.id && x.userType === userType))
                post.views.unshift({ user: session?.id, userType });
            await post.save();
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

export default connectDB(handler, "/api/post/view/[postID]");
