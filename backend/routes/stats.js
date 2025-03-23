import { Router } from "express";
import prisma from "../prisma_client.js"; 
import redisClient from "../redis_client.js";

const router = Router();

router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {

    const cachedStats = await redisClient.get(`stats:${shortCode}`);
    if (cachedStats) {
      console.log("Cache Hit! Returning stats...");
      return res.json(JSON.parse(cachedStats));
    }


    const urlData = await prisma.urlMapping.findUnique({
      where: { shortCode },
      select: { longUrl: true, clicks: true, createdAt: true }
    });

    if (!urlData) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    const stats = {
      longUrl: urlData.longUrl,
      clicks: urlData.clicks,
      createdAt: urlData.createdAt
    };

    await redisClient.set(`stats:${shortCode}`, JSON.stringify(stats), { EX: 600 });

    res.json(stats);
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
