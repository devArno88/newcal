import { E_Fetches } from "@/src/interfaces";
import { EnquirySchema } from "@/src/schemas/Enquiry";
import { connectDB } from "@/src/utils";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/enquiry/[enquiryID]
    // @desc      Close enquiry
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res) {
        try {
            const enquiry = await EnquirySchema.findById(req.query.enquiryID);
            enquiry.open = false;
            await enquiry.save();
            res.status(200).json({ msg: "Enquiry closed successfully" });
        } catch (err) {
            res.status(500).json({ err: "Enquiry could not be closed" });
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
    const execute = routes[req.method] || routes[E_Fetches.forbidden];
    return execute(req, res);
};

export default connectDB(handler, "/api/enquiry/[enquiryID]");
