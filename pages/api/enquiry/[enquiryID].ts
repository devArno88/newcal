import { E_Fetches } from "@/src/interfaces";
import { EnquirySchema } from "@/src/schemas/Enquiry";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/enquiry/[enquiryID]
    // @desc      Close enquiry
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res, session) {
        try {
            const enquiry = await EnquirySchema.findById(req.query.enquiryID);
            if (enquiry.open) {
                enquiry.open = false;
            } else {
                enquiry.open = true;
            }
            await enquiry.save();
            res.status(200).json({ msg: "Enquiry status updated successfully" });
        } catch (err) {
            res.status(500).json({ err: "Enquiry status could not be updated" });
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

export default connectDB(handler, "/api/enquiry/[enquiryID]");
