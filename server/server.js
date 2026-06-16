import express from "express";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import linksRoutes from "./src/routes/linksRoutes.js";
import { addNewClick } from "./src/controllers/clickController.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Trust proxy to get real client IP from headers
app.set("trust proxy", 1);

app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/auth", authRoutes);
app.use("/links", linksRoutes);
app.use("/:code", addNewClick); // Handle clicks on short URLs

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
