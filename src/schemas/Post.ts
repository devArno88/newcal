import * as mongoose from "mongoose";
import { E_MongoCollection } from "../interfaces";
import { E_PostType, I_Post } from "../interfaces/activity";

const Schema = new mongoose.Schema<I_Post>({
    type: { type: String, enum: Object.values(E_PostType) },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },

    // LIKES, COMMENTS

    // TODO: Incorporate S3 bucket logic
    files: [],
});

export const PostSchema: mongoose.Model<I_Post> =
    mongoose.models[E_MongoCollection.post] || mongoose.model<I_Post>(E_MongoCollection.post, Schema);
