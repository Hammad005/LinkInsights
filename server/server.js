import express from "express";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import "dotenv/config";

import authRoutes from "./src/routes/authRoutes.js";
import linksRoutes from "./src/routes/linksRoutes.js";
import { addNewClick } from "./src/controllers/clickController.js";

const app = express();

const isProd = process.env.NODE_ENV === "production";

/**
 * Only connect DB once (important for serverless)
 */
let isConnected = false;
const initDB = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

/**
 * Middlewares
 */
app.set("trust proxy", true);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/links", linksRoutes);
app.get("/:code", addNewClick);

/**
 * IMPORTANT:
 * Vercel runs serverless → no app.listen()
 * But locally we still need it
 */
if (!isProd) {
  const PORT = process.env.PORT || 8080;

  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
} else {
  // Vercel entry point
  initDB();
}

export default app;