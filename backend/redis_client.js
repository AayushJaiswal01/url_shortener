import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ;

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => console.error(" Redis Error:", err));

await redisClient.connect();

console.log("Connected to Redis");

export default redisClient;
