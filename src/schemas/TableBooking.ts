import * as mongoose from "mongoose";
import { I_TableBooking } from "../interfaces";

const Schema = new mongoose.Schema<I_TableBooking>({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export const TableBookingSchema: mongoose.Model<I_TableBooking> =
    mongoose.models.gymbooking || mongoose.model<I_TableBooking>("tablebooking", Schema);
