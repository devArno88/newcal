import { E_Fetches } from "@/src/interfaces";
import { fetcher, fetchParams } from "@/src/utils";
import { Types } from "mongoose";

export const createResident = async ({
    formData,
}: {
    formData: {
        name: string;
        email: string;
        flat: string;
    };
}): Promise<any> => {
    try {
        return await fetcher(`/api/resident`, fetchParams({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const updateResident = async ({
    residentID,
    formData,
}: {
    residentID: Types.ObjectId;
    formData: {
        name: string;
        email: string;
        flat: string;
    };
}): Promise<any> => {
    try {
        return await fetcher(`/api/resident/${residentID}`, fetchParams({ method: E_Fetches.put, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteResident = async ({ residentID }: { residentID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/resident/${residentID}`, fetchParams({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
