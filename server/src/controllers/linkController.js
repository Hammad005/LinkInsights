import { nanoid } from "nanoid";
import Link from "../models/Link.js";
import Click from "../models/Click.js";

export const createLink = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresIn } = req.body;

    const shortCode = customAlias ? customAlias : "/" + nanoid(7);

    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000) // Convert expiresIn to milliseconds
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default to 7 days

    // Check if the link already exists
    const existingLink = await Link.findOne({ shortCode });
    if (existingLink) {
      return res.status(409).json({ error: "Short code already exists" });
    }

    const newLink = await Link.create({
      shortCode,
      originalUrl,
      expiresAt,
      createdBy: req.user._id,
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


export const analytics = async (req, res) => {
  try {

    const user = req.user;

    const Links = await Link.find({ createdBy: user._id }).sort({ createdAt: -1 });

    // const linksWithClicks = await Promise.all(
    //   Links.map(async (link) => {
    //     const clicks = await Click.find({
    //       linkId: link.shortCode,
    //     }).sort({ createdAt: -1 });

    //     return {
    //       ...link.toObject(),
    //       clickData: clicks,
    //       totalClicks: clicks.length,
    //     };
    //   })
    // );

    const linksWithClicks = Links.map((link) => ({
      shortenedURL: `${req.protocol}://${req.get("host")}${link.shortCode}`,
      originalURL: link.originalUrl,
      totalClicks: link.clicks,
    }));

    const totalClicks = linksWithClicks.reduce((total, link) => {
      return total + link.totalClicks;
    }, 0);


    const highestClicks =
      linksWithClicks.length > 0
        ? linksWithClicks.reduce((prev, current) =>
          prev.totalClicks > current.totalClicks ? prev : current
        )
        : null;

    res.status(200).json({
      totalLinks: Links.length,
      totalClicksOnLinks: totalClicks,
      highestClick: highestClicks?.totalClicks || 0,
      linksData: linksWithClicks

    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: error.message || "Failed to fetch analytics" });
  }
};
