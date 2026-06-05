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

    const insights = [];

    const allClicks = await Click.find().sort({ createdAt: -1 });

    // Device insights
    const deviceCounts = {};

    allClicks.forEach((click) => {
      const device = click.device || "unknown";

      deviceCounts[device] =
        (deviceCounts[device] || 0) + 1;
    });

    const topDevice = Object.entries(deviceCounts)
      .sort((a, b) => b[1] - a[1])[0];

    const devicePercentage = Math.round(
      (topDevice[1] / allClicks.length) * 100
    );

    const deviceInsight =
      `${topDevice[0]} users account for ${devicePercentage}% of traffic.`;

    insights.push(deviceInsight);

    // Country insights
    const countryCounts = {};

    allClicks.forEach((click) => {
      const country = click.country || "Unknown";
      const city = click.city || "Unknown";

      countryCounts[`${country}`] =
        (countryCounts[`${country}`] || 0) + 1;
    });

    const topCountryEntry = Object.entries(countryCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const topCountry = `The most visited country is ${
        topCountryEntry ? topCountryEntry[0] : "Unknown"
      }`;

    insights.push(topCountry);


    // Referrer insights
    const referrerCounts = {};

    allClicks.forEach((click) => {
      const referrer = click.referrer || "Direct";
      referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    const topReferrerEntry = Object.entries(referrerCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];


    const topReferrer = `The most visited referrer is ${topReferrerEntry ? topReferrerEntry[0] : "Direct"}`;

    insights.push(topReferrer);

    // Hourly traffic
    const hourlyTraffic = {};

    allClicks.forEach((click) => {
      const hour = new Date(click.createdAt).getHours();
      hourlyTraffic[hour] = (hourlyTraffic[hour] || 0) + 1;
    });

    // Find peak hour
    const peakHour = Number(
      Object.entries(hourlyTraffic)
        .sort((a, b) => b[1] - a[1])[0][0]
    );

    // Helper: convert 24h → 12h AM/PM
    const formatHour = (hour) => {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour} ${ampm}`;
    };

    // Safe end hour (wrap around 24)
    const startHour = peakHour;
    const endHour = (peakHour + 3) % 24;

    // Final readable output
    const peakHourTraffic = `Peak traffic is between ${formatHour(
      startHour
    )} and ${formatHour(endHour)}.`;

    insights.push(peakHourTraffic);


    // Response
    res.status(200).json({
      totalLinks: Links.length,
      totalClicksOnLinks: totalClicks,
      highestClick: highestClicks?.totalClicks || 0,
      linksData: linksWithClicks,
      insights
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: error.message || "Failed to fetch analytics" });
  }
};

export const getMyLinks = async (req, res) => {
  try {
    const user = req.user;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalLinks = await Link.countDocuments({
      createdBy: user._id,
    });

    const links = await Link.find({
      createdBy: user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const linksClicksData = await Promise.all(
      links.map(async (link) => {
        const clicks = await Click.find({
          linkId: link.shortCode,
        }).sort({ createdAt: -1 });

        return {
          ...link.toObject(),
          clickData: clicks,
          totalClicks: clicks.length,
        };
      })
    );

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalLinks / limit),
      totalLinks,
      hasNextPage: page * limit < totalLinks,
      hasPrevPage: page > 1,
      linksWithClicks: linksClicksData,
    });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch links",
    });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const linkId = req.params.id;

    const link = await Link.findOne({
      _id: linkId,
      createdBy: req.user._id,
    });

    if (!link) {
      return res.status(404).json({
        error: "Link not found",
      });
    }

    await Click.deleteMany({
      linkId: link.shortCode,
    });

    await Link.findByIdAndDelete(link._id);

    return res.status(200).json({
      message: "Link and clicks deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting link:", error);

    return res.status(500).json({
      error: error.message || "Failed to delete link",
    });
  }
};