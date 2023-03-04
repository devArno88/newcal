import { Types } from "mongoose";
import { E_Fetches } from "../interfaces";
import { fetcher, fetcherPrep } from "../utils";

export const createMessage = async ({
    chatID,
    formData,
}: {
    chatID: Types.ObjectId;
    formData: { text: string };
}): Promise<any> => {
    try {
        return await fetcher(`/api/chat/${chatID}`, fetcherPrep({ method: E_Fetches.put, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteMessage = async ({
    chatID,
    messageID,
}: {
    chatID: Types.ObjectId;
    messageID: Types.ObjectId;
}): Promise<any> => {
    try {
        return await fetcher(`/api/chat/${chatID}/${messageID}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
