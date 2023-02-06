import * as mongoose from "mongoose";
import { I_GymBooking } from "../interfaces";

const Schema = new mongoose.Schema<I_GymBooking>({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export const GymBookingSchema: mongoose.Model<I_GymBooking> =
    mongoose.models.gymbooking || mongoose.model<I_GymBooking>("gymbooking", Schema);
