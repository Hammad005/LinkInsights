import Link from '../models/Link.js';
import Click from '../models/Click.js';
import geoip from 'geoip-lite';
import {UAParser} from 'ua-parser-js';

export const addNewClick = async (req, res) => {
    try {
        const link = await Link.findOne({ shortCode: req.params.code });

        if (!link) return res.status(404).json({ error: "Link not found" });

        // Expiry check
        if (link.expiresAt && new Date() > link.expiresAt) {
            return res.status(410).json({ error: "Link has expired" });
        }

        // Ip - Extract real client IP (handles proxy/load balancer scenarios)
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
                   req.headers['x-real-ip'] || 
                   req.ip || 
                   req.connection.remoteAddress;
        
        
        let country = req.headers['x-vercel-ip-country'];
        if (!country) {
            const geo = geoip.lookup(ip);
            country = geo?.country || "Unknown";
        }
        

        // Device Info
        const parser = new UAParser(req.headers['user-agent']);
        const ua = parser.getResult();


        // Save click info
        await Click.create({
            linkId: link.shortCode,
            ipAddress: ip,
            country,
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