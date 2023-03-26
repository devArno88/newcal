import { E_Fetches } from "@/src/interfaces";
import { ResidentSchema } from "@/src/schemas";
import { sendEmail } from "@/src/services";
import { newResidentEmail } from "@/src/strings";
import { connectDB, isNumericString } from "@/src/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/resident
    // @desc      Create new resident
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res) {
        try {
            const { name, email, flat } = req.body;
            const exists = await ResidentSchema.findOne({ email });
            if (exists) return res.status(500).json({ err: "Resident email already exists" });
            const isNumeric = isNumericString(flat);
            if (!isNumeric) return res.status(500).json({ err: "Flat number should contain numbers only" });
            const resident = new ResidentSchema({
                name,
                email,
                flat: +flat, // Flat passed as string
            });
            await resident.save();
            await sendEmail({
                to: email,
                subject: `NewCal Resident Registration`,
                html: newResidentEmail({ name, email, flat }),
            });
            res.status(200).json({ msg: "Resident created successfully" });
        } catch (err) {
            res.status(500).json({ err: "Resident could not be created" });
        }
    },
    ///////////////////////////////////////////////////////////
    // @routes    FORBIDDEN
    // @desc      When a forbidden method is requested
    ///////////////////////////////////////////////////////////
    async [E_Fetches.forbidden](req, res) {
        res.status(405).end(`${req.method} Not Allowed`);
    },
};

const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        // if (!isManagement(session)) return res.status(500).json({ err: "Action only available to NewCal Management" });
        const execute = routes[req.method] || routes[E_Fetches.forbidden];
        return execute(req, res, session);
    } else {
        res.status(500).json({ err: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/resident");
