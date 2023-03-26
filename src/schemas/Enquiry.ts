import { E_MongoCollection, I_Enquiry } from "@/src/interfaces";
import * as mongoose from "mongoose";

const Schema = new mongoose.Schema<I_Enquiry>({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String || null, default: null },
    message: { type: String, required: true },
    open: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

export const EnquirySchema: mongoose.Model<I_Enquiry> =
    mongoose.models[E_MongoCollection.enquiry] || mongoose.model<I_Enquiry>(E_MongoCollection.enquiry, Schema);
