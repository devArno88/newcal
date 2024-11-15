import { Types } from "mongoose";
import { PostFormData } from "../content/Modal/PostForm";
import { E_Fetches } from "../interfaces";
import { fetcher, fetchParams } from "../utils";

export const createPost = async ({ formData }: { formData: PostFormData }): Promise<any> => {
    try {
        return await fetcher(`/api/post`, fetchParams({ method: E_Fetches.post, body: formData }));
    } catch (err) {
        console.error(err);
    }
};

export const deletePost = async ({ postID }: { postID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/post/${postID}`, fetchParams({ method: E_Fetches.delete }));
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
        return await fetcher(`/api/post/comment/${postID}`, fetchParams({ method: E_Fetches.put, body: formData }));
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
        return await fetcher(`/api/post/comment/${postID}/${commentID}`, fetchParams({ method: E_Fetches.delete }));
    } catch (err) {
        console.error(err);
    }
};

export const handlePostLike = async ({ postID }: { postID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/post/like/${postID}`, fetchParams({ method: E_Fetches.put }));
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
        return await fetcher(`/api/post/comment/like/${postID}/${commentID}`, fetchParams({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};

export const addPostView = async ({ postID }: { postID: Types.ObjectId }): Promise<any> => {
    try {
        return await fetcher(`/api/post/view/${postID}`, fetchParams({ method: E_Fetches.put }));
    } catch (err) {
        console.error(err);
    }
};
