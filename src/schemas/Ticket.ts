import { E_MongoCollection, E_TicketStatus, E_TicketType, I_Ticket } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Ticket>({
    type: { type: String, enum: Object.values(E_TicketType) },
    date: { type: Date, default: Date.now },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident },
    title: { type: String, required: true },
    content: { type: String, required: true },
    review: {
        status: { type: String, enum: Object.values(E_TicketStatus) },
        comment: { type: String || null },
    },
});

export const TicketSchema: mongoose.Model<I_Ticket> =
    mongoose.models[E_MongoCollection.ticket] || mongoose.model<I_Ticket>(E_MongoCollection.ticket, Schema);
