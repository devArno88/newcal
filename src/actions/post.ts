import { Types } from "mongoose";
import { PostFormData } from "../content/Modal/PostForm";
import { E_Fetches } from "../interfaces";
import { fetcher, fetcherPrep } from "../utils";

export const createPost = async ({ formData }: { formData: PostFormData }): Promise<any> => {
    try {
        return await fetcher(`/api/post`, fetcherPrep({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deletePost = async ({ id }: { id: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/post/${id}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};
