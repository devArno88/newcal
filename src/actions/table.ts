import { E_Fetches } from "@/interfaces";
import { fetcher, fetchParams } from "@/utils";
import { Types } from "mongoose";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export const createTableBooking = async ({ date, slot }: { date: string; slot: number }): Promise<any> => {
    try {
        return await fetcher(`/api/table/${date}/${slot}`, fetchParams({ method: E_Fetches.post }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteTableBooking = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/table/${id}`, fetchParams({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
