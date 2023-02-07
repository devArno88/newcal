import { E_Fetches } from "@/interfaces";
import { fetcher, fetcherPrep } from "@/utils";
import { Types } from "mongoose";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export const createPoolBooking = async ({ date, slot }: { date: string; slot: number }): Promise<any> => {
    try {
        return await fetcher(`/api/pool/${date}/${slot}`, fetcherPrep({ method: E_Fetches.post }));
    } catch (err) {
        console.error(err);
    }
};

export const deletePoolBooking = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/pool/${id}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
