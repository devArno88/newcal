import * as mongoose from "mongoose";
import { I_PoolBooking } from "../interfaces";

const Schema = new mongoose.Schema<I_PoolBooking>({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export const PoolBookingSchema: mongoose.Model<I_PoolBooking> =
    mongoose.models.poolbooking || mongoose.model<I_PoolBooking>("poolbooking", Schema);
