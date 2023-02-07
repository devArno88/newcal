import { TicketFormData } from "../content/Modal/TicketForm";
import { E_Fetches } from "../interfaces";
import { fetcher, fetcherPrep } from "../utils";

export const createTicket = async ({ formData }: { formData: TicketFormData }): Promise<any> => {
    try {
        return await fetcher(`/api/ticket`, fetcherPrep({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};
