import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

import { connectDatabase } from "./config/database.js";
const app = express();
app.use("/api/resumes", resumeRoutes);
app.use("/api/jobs", jobRoutes);


const PORT = process.env.PORT || 5000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

// Security headers
app.use(helmet());

// Allow requests from the configured frontend
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

// Parse JSON requests
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "JobPilot API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/resumes", resumeRoutes);

// Start server after database connection
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`JobPilot API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed");

    process.exit(1);
  }
}

startServer();