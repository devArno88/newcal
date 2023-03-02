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

export const createPostComment = async ({
    postID,
    formData,
}: {
    postID: Types.ObjectId;
    formData: { text: string };
}): Promise<any> => {
    try {
        return await fetcher(`/api/post/comment/${postID}`, fetcherPrep({ method: E_Fetches.put, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deletePostComment = async ({
    postID,
    commentID,
}: {
    postID: Types.ObjectId;
    commentID: Types.ObjectId;
}): Promise<any> => {
    try {
        return await fetcher(`/api/post/comment/${postID}/${commentID}`, fetcherPrep({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};

export const handlePostLike = async ({ postID }: { postID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/post/like/${postID}`, fetcherPrep({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};

export const handlePostCommentLike = async ({
    postID,
    commentID,
}: {
    postID: Types.ObjectId;
    commentID: Types.ObjectId;
}): Promise<any> => {
    try {
        return await fetcher(`/api/post/comment/like/${postID}/${commentID}`, fetcherPrep({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};