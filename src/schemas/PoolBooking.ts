import * as mongoose from "mongoose";
import { E_MongoCollection, I_PoolBooking } from "../interfaces";

const Schema = new mongoose.Schema<I_PoolBooking>({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export const PoolBookingSchema: mongoose.Model<I_PoolBooking> =
    mongoose.models[E_MongoCollection.poolbooking] ||
    mongoose.model<I_PoolBooking>(E_MongoCollection.poolbooking, Schema);
