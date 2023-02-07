import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { E_Fetches } from "@/src/interfaces";
import { MailBoardSchema } from "@/src/schemas/MailBoard";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @route    POST api/mailboard
    // @desc      Create new mailboard
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.get](req, res, session) {
        try {
            //     const mailboard = new MailBoardSchema({
            // updated: new Date(),
            //         Flat1: 0,
            //         Flat2: 0,
            //         Flat3: 0,
            //         Flat4: 0,
            //         Flat5: 0,
            //         Flat6: 0,
            //         Flat7: 0,
            //         Flat8: 0,
            //         Flat9: 0,
            //         Flat10: 0,
            //         Flat11: 0,
            //         Flat12: 0,
            //         Flat13: 0,
            //         Flat14: 0,
            //         Flat15: 0,
            //         Flat16: 0,
            //         Flat17: 0,
            //         Flat18: 0,
            //         Flat19: 0,
            //         Flat20: 0,
            //         Flat21: 0,
            //         Flat22: 0,
            //         Flat23: 0,
            //         Flat24: 0,
            //         Flat25: 0,
            //         Flat26: 0,
            //         Flat27: 0,
            //         Flat28: 0,
            //         Flat29: 0,
            //         Flat30: 0,
            //         Flat31: 0,
            //         Flat32: 0,
            //         Flat33: 0,
            //         Flat34: 0,
            //         Flat35: 0,
            //         Flat36: 0,
            //         Flat37: 0,
            //         Flat38: 0,
            //         Flat39: 0,
            //         Flat40: 0,
            //         Flat41: 0,
            //         Flat42: 0,
            //         Flat43: 0,
            //         Flat44: 0,
            //         Flat45: 0,
            //         Flat46: 0,
            //         Flat47: 0,
            //         Flat48: 0,
            //         Flat49: 0,
            //         Flat50: 0,
            //         Flat51: 0,
            //         Flat52: 0,
            //         Flat53: 0,
            //         Flat54: 0,
            //         Flat55: 0,
            //         Flat56: 0,
            //         Flat57: 0,
            //         Flat58: 0,
            //         Flat59: 0,
            //         Flat60: 0,
            //         Flat61: 0,
            //         Flat62: 0,
            //         Flat63: 0,
            //         Flat64: 0,
            //         Flat65: 0,
            //         Flat66: 0,
            //         Flat67: 0,
            //         Flat68: 0,
            //         Flat69: 0,
            //         Flat70: 0,
            //         Flat71: 0,
            //         Flat72: 0,
            //         Flat73: 0,
            //         Flat74: 0,
            //         Flat75: 0,
            //         Flat76: 0,
            //         Flat77: 0,
            //         Flat78: 0,
            //         Flat79: 0,
            //         Flat80: 0,
            //         Flat81: 0,
            //         Flat82: 0,
            //         Flat83: 0,
            //         Flat84: 0,
            //         Flat85: 0,
            //         Flat86: 0,
            //         Flat87: 0,
            //         Flat88: 0,
            //         Flat89: 0,
            //         Flat90: 0,
            //         Flat91: 0,
            //         Flat92: 0,
            //         Flat93: 0,
            //         Flat94: 0,
            //         Flat95: 0,
            //         Flat96: 0,
            //         Flat97: 0,
            //         Flat98: 0,
            //         Flat99: 0,
            //         Flat100: 0,
            //     });
            //     await mailboard.save();
            const mailboard = await MailBoardSchema.find({});
            if (mailboard.length > 1) return res.status(500).json({ err: "More than one mailboard exists" });
            res.json(mailboard);
        } catch (err) {
            console.error(err);
        }
    },
    ///////////////////////////////////////////////////////////
    // @route    FORBIDDEN
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
