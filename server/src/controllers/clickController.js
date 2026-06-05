import Link from '../models/Link.js';
import Click from '../models/Click.js';
import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

export const addNewClick = async (req, res) => {
    try {
        const link = await Link.findOne({ shortCode: '/' + req.params.code });

        if (!link) return res.status(404).json({ error: "Link not found" });

        // Expiry check
        if (link.expiresAt && new Date() > link.expiresAt) {
            return res.status(410).json({ error: "Link has expired" });
        }


        // Get the client's IP address from the request
        const getClientIP = (req) => {
            return (req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                req.headers['x-real-ip'] ||
                req.headers['cf-connecting-ip'] ||  // Cloudflare
                req.ip ||
                req.socket.remoteAddress ||
                req.connection.remoteAddress ||
                'Unknown').trim();
        };


        // Geo Location
        const geo = geoip.lookup(ip);

        // Location Info from IPapi (Fallback to geoiplite)
        const location = await fetch(`https://ipapi.co/${ip}/json/`)
            .then((res) => res.json())
            .catch(() => ({ city: "Unknown", country_name: "Unknown" }));

        // Add fallback with another service
        if (location.city === 'Unknown') {
            const backup = await fetch(`https://ip-api.com/json/${ip}`).then(r => r.json());
            location.city = backup.city || 'Unknown';
        }



        // Device Info
        const parser = new UAParser(req.headers['user-agent']);
        const ua = parser.getResult();


        // Save click info
        await Click.create({
            linkId: link.shortCode,
            ipAddress: ip,
            country: geo?.country || location.country_name,
            city: geo?.city || location.city,
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