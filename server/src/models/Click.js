import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    linkId: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    device:{
        type: String,
    },
    browser: {
        type: String,
    },
    referrer: {
        type: String,
    },
}, {timestamps: true});

const Click = mongoose.model("Click", clickSchema);

export default Click;