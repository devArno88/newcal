import { E_MongoCollection, E_TicketStatus, E_TicketType, I_Ticket } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Ticket>({
    type: { type: String, enum: Object.values(E_TicketType) },
    user: { type: mongoose.Schema.Types.ObjectId, refPath: "userType" },
    userType: { type: String, enum: ["resident", "admin"] },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(E_TicketStatus) },
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

export const TicketSchema: mongoose.Model<I_Ticket> =
    mongoose.models[E_MongoCollection.ticket] || mongoose.model<I_Ticket>(E_MongoCollection.ticket, Schema);
