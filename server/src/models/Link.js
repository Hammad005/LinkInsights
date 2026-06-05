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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

// Index the expiresAt field to enable expiration of links
// linkSchema.index(
//   { expiresAt: 1 },
//   { expireAfterSeconds: 0 }
// );


const Link = mongoose.model("Link", linkSchema);

export default Link;