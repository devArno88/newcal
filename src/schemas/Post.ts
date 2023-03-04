import * as mongoose from "mongoose";
import { E_MongoCollection } from "../interfaces";
import { E_PostType, I_Post } from "../interfaces/post";

const Schema = new mongoose.Schema<I_Post>({
    type: { type: String, enum: Object.values(E_PostType) },
    user: { type: mongoose.Schema.Types.ObjectId, refPath: "userType" },
    userType: { type: String, enum: ["resident", "admin"] },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "likes.userType" },
            userType: { type: String, enum: ["resident", "admin"] },
        },
    ],
    views: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "views.userType" },
            userType: { type: String, enum: ["resident", "admin"] },
            date: { type: Date, default: Date.now },
        },
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "comments.userType" },
            userType: { type: String, enum: ["resident", "admin"] },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
            likes: [
                {
                    user: { type: mongoose.Schema.Types.ObjectId, refPath: "comments.likes.userType" },
                    userType: { type: String, enum: ["resident", "admin"] },
                },
            ],
        },
    ],
    // TODO: Incorporate S3 bucket logic
    files: [],
});

export const PostSchema: mongoose.Model<I_Post> =
    mongoose.models[E_MongoCollection.post] || mongoose.model<I_Post>(E_MongoCollection.post, Schema);
