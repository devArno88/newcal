import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PostSchema } from "@/src/schemas/Post";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/post/comment/like/[postID]/[commentID]
    // @desc      Like/unlike post comment
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const post = await PostSchema.findById(req.query.postID);
            if (!post) return res.status(500).json({ err: "Invalid post" });
            const comment = post.comments.filter((x) => x._id.toString() === req.query.commentID)[0];
            if (!comment) return res.status(500).json({ err: "Invalid comment" });
            if (comment.likes.some((id) => id.toString() === session?.id)) {
                comment.likes = comment.likes.filter((id) => id.toString() !== session?.id);
            } else {
                comment.likes.unshift(session?.id);
            }
            await post.save();
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

export default connectDB(handler, "/api/post/like/[postID]");
