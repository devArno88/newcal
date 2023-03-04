import * as mongoose from "mongoose";
import { E_MongoCollection, E_Roles, I_Admin } from "../interfaces";

const Schema = new mongoose.Schema<I_Admin>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: [E_Roles.concierge, E_Roles.development, E_Roles.management] },
});

export const AdminSchema: mongoose.Model<I_Admin> =
    mongoose.models[E_MongoCollection.admin] || mongoose.model<I_Admin>(E_MongoCollection.admin, Schema);
