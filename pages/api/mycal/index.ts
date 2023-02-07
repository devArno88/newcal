import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches, E_TicketType } from "@/src/interfaces";
import { E_PostType } from "@/src/interfaces/activity";
import { GymBookingSchema, PoolBookingSchema, TableBookingSchema, TicketSchema } from "@/src/schemas";
import { MailBoardSchema } from "@/src/schemas/MailBoard";
import { PostSchema } from "@/src/schemas/Post";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    GET api/mycal
    // @desc      Get MyCal Dashboard data
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const mailboards = await MailBoardSchema.find({});
            if (mailboards.length > 1) return res.status(500).json({ err: "Multiple existing mailboards" });
            const mailboard = mailboards[0];
            const pool = await PoolBookingSchema.find({
                flat: session?.flat,
            });
            const gym = await GymBookingSchema.find({
                flat: session?.flat,
            });
            const table = await TableBookingSchema.find({
                flat: session?.flat,
            });

            const post_notice_total = await PostSchema.count({ type: E_PostType.notice });
            const post_notice_own = await PostSchema.count({ type: E_PostType.notice, resident: session?.resident });

            const post_listing_total = await PostSchema.count({ type: E_PostType.listing });
            const post_listing_own = await PostSchema.count({ type: E_PostType.listing, resident: session?.resident });

            const post_question_total = await PostSchema.count({ type: E_PostType.question });
            const post_question_own = await PostSchema.count({
                type: E_PostType.question,
                resident: session?.resident,
            });

            const ticket_enhancement_total = await TicketSchema.count({ type: E_TicketType.enhancement });
            const ticket_enhancement_own = await TicketSchema.count({
                type: E_TicketType.enhancement,
                resident: session?.resident,
            });

            const ticket_issue_total = await TicketSchema.count({ type: E_TicketType.issue });
            const ticket_issue_own = await TicketSchema.count({
                type: E_TicketType.issue,
                resident: session?.resident,
            });

            const ticket_question_total = await TicketSchema.count({ type: E_TicketType.question });
            const ticket_question_own = await TicketSchema.count({
                type: E_TicketType.question,
                resident: session?.resident,
            });

            res.json({
                mailbox: {
                    items: mailboard[`Flat${session?.flat}`],
                    updated: mailboard.updated,
                },
                bookings: {
                    pool,
                    gym,
                    table,
                },
                posts: {
                    notice: {
                        own: post_notice_own,
                        total: post_notice_total,
                    },
                    listing: {
                        own: post_listing_own,
                        total: post_listing_total,
                    },
                    question: {
                        own: post_question_own,
                        total: post_question_total,
                    },
                },
                tickets: {
                    enhancement: {
                        own: ticket_enhancement_own,
                        total: ticket_enhancement_total,
                    },
                    issue: {
                        own: ticket_issue_own,
                        total: ticket_issue_total,
                    },
                    question: {
                        own: ticket_question_own,
                        total: ticket_question_total,
                    },
                },
            });
        } catch (err) {
            console.error(err);
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
        res.status(500).json({ msg: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/pool/[date]");
