import { E_MongoCollection, E_TicketStatus, E_TicketType, I_Ticket } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Ticket>({
    type: { type: String, enum: Object.values(E_TicketType) },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(E_TicketStatus) },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident }],
    comments: [
        {
            resident: { type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident }],
        },
    ],
    // TODO: Incorporate S3 bucket logic
    files: [],
});

export const TicketSchema: mongoose.Model<I_Ticket> =
    mongoose.models[E_MongoCollection.ticket] || mongoose.model<I_Ticket>(E_MongoCollection.ticket, Schema);
