const mongoose = require("mongoose");

const GymBooking = new mongoose.Schema({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export default mongoose.models.gymbooking || mongoose.model("gymbooking", GymBooking);
