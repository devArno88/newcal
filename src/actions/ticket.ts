import { TicketFormData } from "@/src/content/Modal";
import { E_Fetches } from "@/src/interfaces";
import { fetcher, fetcherPrep } from "@/src/utils";
import { Types } from "mongoose";

export const createTicket = async ({ formData }: { formData: TicketFormData }): Promise<any> => {
    try {
        return await fetcher(`/api/ticket`, fetcherPrep({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteTicket = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/ticket/${id}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};

export const createTicketComment = async ({
    ticketID,
    formData,
}: {
    ticketID: Types.ObjectId;
    formData: { text: string };
}): Promise<any> => {
    try {
        return await fetcher(`/api/ticket/comment/${ticketID}`, fetcherPrep({ method: E_Fetches.put, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deleteTicketComment = async ({
    ticketID,
    commentID,
}: {
    ticketID: Types.ObjectId;
    commentID: Types.ObjectId;
}): Promise<any> => {
    try {
        return await fetcher(`/api/ticket/comment/${ticketID}/${commentID}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};

export const handleTicketLike = async ({ ticketID }: { ticketID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/ticket/like/${ticketID}`, fetcherPrep({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};

export const handleTicketCommentLike = async ({
    ticketID,
    commentID,
}: {
    ticketID: Types.ObjectId;
    commentID: Types.ObjectId;
}): Promise<any> => {
    try {
        return await fetcher(
            `/api/ticket/comment/like/${ticketID}/${commentID}`,
            fetcherPrep({ method: E_Fetches.put })
        );
    } catch (err) {
        console.error(err);
    }
};

export const addTicketView = async ({ ticketID }: { ticketID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/ticket/view/${ticketID}`, fetcherPrep({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};
