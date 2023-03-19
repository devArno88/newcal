import { E_Fetches } from "@/src/interfaces";
import { ResidentSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/enquiry
    // @desc      Send new enquiry
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res) {
        try {
            const { ...data } = req.body;
            const resident = new ResidentSchema({
                ...data,
            });
            await resident.save();
            // await sendEmail({
            //     to: email,
            //     subject: `New Caledonian Wharf Enquiry`,
            //     html: residentEmail({ name, message }),
            // });
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
