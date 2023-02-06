import { E_MongoCollection, E_TicketStatus, I_Issue } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Issue>({
    date: { type: Date, default: Date.now },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: E_MongoCollection.resident },
    content: { type: String, required: true },
    review: {
        status: { type: String, enum: Object.values(E_TicketStatus) },
        comment: { type: String || null },
    },
});

export const IssueSchema: mongoose.Model<I_Issue> =
    mongoose.models.poolbooking || mongoose.model<I_Issue>("issue", Schema);
