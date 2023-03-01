import { E_Fetches, I_MailBoard } from "../interfaces";
import { fetcher, fetcherPrep } from "../utils";

export const updateMailboard = async ({ mailboard }: { mailboard: I_MailBoard }): Promise<any> => {
    try {
        return await fetcher("/api/mailboard", fetcherPrep({ method: E_Fetches.put, body: mailboard }));
    } catch (err) {
        console.error(err);
    }
};
