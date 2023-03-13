import { EnquiryFormData } from "@/src/content/Landing/EnquiryForm";
import { fetcher, fetchParams } from "@/src/utils";
import { E_Fetches } from "../interfaces";

export const createEnquiry = async ({ formData }: { formData: EnquiryFormData }): Promise<any> => {
    try {
        return await fetcher(`/api/enquiry`, fetchParams({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};
