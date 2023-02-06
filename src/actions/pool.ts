import { E_Fetches } from "@/interfaces";
import { createFetchParams, fetcher } from "@/utils";
import { Types } from "mongoose";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export const createPoolBooking = async ({ date, slot }: { date: string; slot: number }): Promise<any> => {
    console.log({ NEXTAUTH_URL });
    try {
        return await fetcher(`/api/pool/${date}/${slot}`, createFetchParams({ method: E_Fetches.post }));
    } catch (err) {
        console.error(err);
    }
};

export const deletePoolBooking = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/pool/${id}`, createFetchParams({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
