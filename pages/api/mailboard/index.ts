import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { ResidentSchema } from "@/src/schemas";
import { MailBoardSchema } from "@/src/schemas/MailBoard";
import { sendEmail } from "@/src/services";
import { mailboardEmail } from "@/src/strings";
import { connectDB, getObjectKeysAboveZero } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @route    GET api/mailboard
    // @desc     Get mailboard (only one should exist)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            const mailboard = await MailBoardSchema.find({});
            if (mailboard.length > 1) return res.status(500).json({ err: "More than one mailboard exists" });
            res.json(mailboard[0]);
        } catch (err) {
            console.error(err);
        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @route    POST api/mailboard
    // @desc     Create new mailboard
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const { _id, updated, __v, ...mailboxes } = req.body;
            await MailBoardSchema.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        ...mailboxes,
                        updated: new Date().toISOString(),
                    },
                },
                { returnDocument: "after" }
            );

            const flatsToNotify = getObjectKeysAboveZero(mailboxes).map((x) => +x.replace("Flat", ""));
            const residents = await ResidentSchema.find({ flat: { $in: flatsToNotify } });

            Promise.all(
                residents.map(async (resident) => {
                    const { name, email, flat } = resident;
                    await sendEmail({
                        to: email,
                        subject: `Mailbox Update`,
                        html: mailboardEmail({ name, flat, items: mailboxes[`Flat${flat}`] }),
                    });
                })
            );

            res.json({ msg: "Mailboard updated successfully" });
        } catch (err) {
            res.status(500).json({ err: "Mailboard could not be updated" });
        }
    },
    ///////////////////////////////////////////////////////////
    // @route    FORBIDDEN
    // @desc     When a forbidden method is requested
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

export default connectDB(handler, "/api/mailboard");

export const config = {
    api: {
        externalResolver: true,
    },
};
