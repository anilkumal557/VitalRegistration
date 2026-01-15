import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import birthRoutes from "./routes/birth.routes.js";
import marriageRoutes from "./routes/marriage.routes.js";
import deathRoutes from "./routes/death.routes.js";
import migrationRoutes from "./routes/migration.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/birth", birthRoutes);
app.use("/api/marriage", marriageRoutes);
app.use("/api/death", deathRoutes);
app.use("/api/migration", migrationRoutes);

export default app;
