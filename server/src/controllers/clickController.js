import Link from '../models/Link.js';
import Click from '../models/Click.js';
import geoip from 'geoip-lite';
import {UAParser} from 'ua-parser-js';

export const addNewClick = async (req, res) => {
    try {
        const link = await Link.findOne({ shortCode: '/' + req.params.code });

        if (!link) return res.status(404).json({ error: "Link not found" });

        // Expiry check
        if (link.expiresAt && new Date() > link.expiresAt) {
            return res.status(410).json({ error: "Link has expired" });
        }

        // Ip
        const ip = req.ip || req.connection.remoteAddress;
        
        
        // Geo Location
        const geo = geoip.lookup(ip);
        

        // Device Info
        const parser = new UAParser(req.headers['user-agent']);
        const ua = parser.getResult();


        // Save click info
        await Click.create({
            linkId: link.shortCode,
            ipAddress: ip,
            country: geo?.country || "Unknown",
            device: ua.device.type || "desktop",
            browser: ua.browser.name,
            referrer: req.headers.referer || "direct",
        });

        // Increase click count
        link.clicks += 1;
        await link.save();

        // Redirect to original URL
        res.redirect(link.originalUrl);

    } catch (error) {
        console.error("Error processing click:", error);
        res.status(500).json({ error: error.message || "Failed to process click" });
    }
};