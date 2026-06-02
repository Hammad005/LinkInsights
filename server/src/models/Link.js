import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
}, {timestamps: true});

const Link = mongoose.model("Link", linkSchema);

export default Link;