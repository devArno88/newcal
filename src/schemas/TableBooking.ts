import * as mongoose from "mongoose";
import { E_MongoCollection, I_TableBooking } from "../interfaces";

const Schema = new mongoose.Schema<I_TableBooking>({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export const TableBookingSchema: mongoose.Model<I_TableBooking> =
    mongoose.models[E_MongoCollection.tablebooking] ||
    mongoose.model<I_TableBooking>(E_MongoCollection.tablebooking, Schema);
