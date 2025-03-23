import { Router } from "express";
import prisma from "../prisma_client.js";
import { customAlphabet } from "nanoid";

const generateShortCode = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const router = Router();

router.post("/", async (req, res) => {
    try {
        const { long_url, alias } = req.body;

        if (!long_url) {
            return res.status(400).json({ error: "URL is required" });
        }

        let shortCode = alias || generateShortCode();


        if (alias) {
            const aliasExists = await prisma.urlMapping.findUnique({ where: { shortCode: alias } });
            if (aliasExists) {
                return res.status(400).json({ error: "Alias already taken" });
            }
        }

        const existingUrl = await prisma.urlMapping.findUnique({ where: { longUrl: long_url } });
        if (existingUrl) {
            return res.json({ short_url: `${req.protocol}://${req.get("host")}/${existingUrl.shortCode}` });
        }

        const newUrl = await prisma.urlMapping.create({
            data: {
                longUrl: long_url,
                shortCode
            }
        });

        return res.json({ short_url: `${req.protocol}://${req.get("host")}/${newUrl.shortCode}` });

    } catch (error) {
        console.error("🔥 Backend Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
