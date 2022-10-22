const mongoose = require("mongoose");

const PoolBooking = new mongoose.Schema({
    date: { type: Date },
    flat: { type: Number },
    slot: { type: Number },
});

export default mongoose.models.poolbooking || mongoose.model("poolbooking", PoolBooking);
