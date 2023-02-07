import * as mongoose from "mongoose";
import { E_MongoCollection, I_Resident } from "../interfaces";

const Schema = new mongoose.Schema<I_Resident>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    flat: { type: Number, required: true },
});

export const ResidentSchema: mongoose.Model<I_Resident> =
    mongoose.models[E_MongoCollection.resident] || mongoose.model<I_Resident>(E_MongoCollection.resident, Schema);
