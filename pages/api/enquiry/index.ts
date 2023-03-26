import { E_Fetches } from "@/src/interfaces";
import { EnquirySchema } from "@/src/schemas/Enquiry";
import { sendEmail } from "@/src/services";
import { enquiryEmail } from "@/src/strings";
import { connectDB, shortID } from "@/src/utils";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    POST api/enquiry
    // @desc      Send new enquiry
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.post](req, res) {
        try {
            const { name, email, phone, message } = req.body;
            const id = shortID();
            const enquiry = new EnquirySchema({
                uid: id,
                name,
                email,
                phone: phone || null,
                message,
            });
            await enquiry.save();
            await sendEmail({
                to: email,
                subject: `Enquiry #${id} Submitted Successfully`,
                html: enquiryEmail({ name, message, id }),
            });
            res.status(200).json({ msg: `Enquiry #${id} received` });
        } catch (err) {
            res.status(500).json({ err: "Enquiry could not be created" });
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

export default connectDB(handler, "/api/enquiry");
