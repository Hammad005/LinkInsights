import mongoose from "mongoose";
import dns from "dns";
if (process.env.NODE_ENV !== "production") {
    dns.setServers(['1.1.1.1']);
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "linkinsights",
        });
        console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;