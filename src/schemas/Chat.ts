import { E_MongoCollection, I_Chat } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Chat>({
    participants: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "participants.userType" },
            userType: { type: String, enum: ["resident", "admin"] },
        },
    ],
    messages: [
        {
            author: { type: mongoose.Schema.Types.ObjectId, refPath: "messages.userType" },
            userType: { type: String, enum: ["resident", "admin"] },
            text: { type: String, required: true },
            date: { type: String, default: Date.now },
        },
    ],
});

export const ChatSchema: mongoose.Model<I_Chat> =
    mongoose.models[E_MongoCollection.chat] || mongoose.model<I_Chat>(E_MongoCollection.chat, Schema);
