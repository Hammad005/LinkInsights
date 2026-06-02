import { nanoid } from "nanoid";
import Link from "../models/Link.js";

export const createLink = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresIn } = req.body;

    const shortCode = customAlias || nanoid(7);

    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000) // Convert expiresIn to milliseconds
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default to 7 days

    const newLink = await Link.create({
      shortCode,
      originalUrl,
      expiresAt,
    });

    res.status(201).json({ 
        shortUrl: `${req.protocol}://${req.get("host")}${newLink.shortCode}`,
        link: newLink,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ error: error.message || "Failed to create link" });
  }
};
