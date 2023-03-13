import { E_Fetches, I_MailBoard } from "../interfaces";
import { fetcher, fetchParams } from "../utils";

export const updateMailboard = async ({ mailboard }: { mailboard: I_MailBoard }): Promise<any> => {
    try {
        return await fetcher("/api/mailboard", fetchParams({ method: E_Fetches.put, body: mailboard }));
    } catch (err) {
        console.error(err);
    }
};
