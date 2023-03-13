import { E_Fetches } from "@/interfaces";
import { fetcher, fetchParams } from "@/utils";
import { Types } from "mongoose";

export const createGymBooking = async ({ date, slot }: { date: string; slot: number }): Promise<any> => {
    try {
        return await fetcher(`/api/gym/${date}/${slot}`, fetchParams({ method: E_Fetches.post }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteGymBooking = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/gym/${id}`, fetchParams({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
