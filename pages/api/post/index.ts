import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { PostSchema, ResidentSchema } from "@/src/schemas";
import { sendEmail } from "@/src/services";
import { warningEmail } from "@/src/strings";
import { capitalise, connectDB, isAdmin } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/post
    // @desc      Create new post
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res, session) {
        try {
            const { ...data } = req.body;
            const userType = isAdmin(session) ? "admin" : "resident";
            const post = new PostSchema({
                ...data,
                user: session.id,
                userType,
            });
            await post.save();

            const residents = await ResidentSchema.find({});
            if (post.type === "warning") {
                Promise.all(
                    residents.map(async (resident) => {
                        const { name, email } = resident;
                        await sendEmail({
                            to: email,
                            subject: `Warning`,
                            html: warningEmail({
                                name,
                                postID: post._id.toString(),
                                title: post.title,
                                content: post.content,
                                author: `NewCal ${capitalise(session?.role)}`,
                            }),
                        });
                    })
                );
            }

            res.status(200).json({ msg: "Post created successfully" });
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

export default connectDB(handler, "/api/post");
