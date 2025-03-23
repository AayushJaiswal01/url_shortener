import { Router } from "express";
import prisma from "../prisma_client.js";
import redisClient from "../redis_client.js";

const router = Router();

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;


    const cachedUrl = await redisClient.get(shortCode);
    if (cachedUrl) {
      console.log(" Cache Hit! Redirecting...");
      return res.redirect(301, cleanUrl(cachedUrl));
    }

    const urlMapping = await prisma.urlMapping.findUnique({
      where: { shortCode }
    });

    if (!urlMapping) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    await redisClient.set(shortCode, urlMapping.longUrl, { EX: 3600 });


    await prisma.urlMapping.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } }
    });


    const finalUrl = cleanUrl(urlMapping.longUrl);
    console.log(` Redirecting to: ${finalUrl}`);
    res.redirect(301, finalUrl);
  } catch (error) {
    console.error("Redirection Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const cleanUrl = (url) => {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.pathname + urlObj.search + urlObj.hash;
  } catch (error) {
    console.error(" URL Parsing Error:", error);
    return "/";
  }
};

export default router;
