import express from "express";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import "dotenv/config";
import linksRoutes from "./src/routes/LinksRoutes.js";
import { addNewClick } from "./src/controllers/clickController.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }),
);
app.use(express.json());

app.use("/links", linksRoutes);
app.use("/:code", addNewClick); // Handle clicks on short URLs

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
