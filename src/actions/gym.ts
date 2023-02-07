import { E_Fetches } from "@/interfaces";
import { fetcher, fetcherPrep } from "@/utils";
import { Types } from "mongoose";

export const createGymBooking = async ({ date, slot }: { date: string; slot: number }): Promise<any> => {
    try {
        return await fetcher(`/api/gym/${date}/${slot}`, fetcherPrep({ method: E_Fetches.post }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteGymBooking = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/gym/${id}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
