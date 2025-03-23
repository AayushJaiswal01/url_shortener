import express, { json } from "express";
import cors from "cors";
import { PORT } from "./config.js";

import shortenRouter from "./routes/shorten.js";
import redirectRouter from "./routes/redirect.js";
import statsRouter from "./routes/stats.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/shorten", shortenRouter);
app.use("/", redirectRouter);
app.use("/stats", statsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
