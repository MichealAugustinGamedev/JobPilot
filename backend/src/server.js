// import "dotenv/config";

// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import resumeRoutes from "./routes/resumeRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// import { connectDatabase } from "./config/database.js";
// const app = express();
// app.use("/api/resumes", resumeRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/ai", aiRoutes);

// const PORT = process.env.PORT || 5000;
// const FRONTEND_URL =
//   process.env.FRONTEND_URL || "http://localhost:5173";

// // Security headers
// app.use(helmet());

// // Allow requests from the configured frontend
// app.use(
//   cors({
//     origin: FRONTEND_URL,
//   })
// );

// // Parse JSON requests
// app.use(express.json({ limit: "1mb" }));

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "JobPilot API is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// app.use("/api/resumes", resumeRoutes);

// // Start server after database connection
// async function startServer() {
//   try {
//     await connectDatabase();

//     app.listen(PORT, () => {
//       console.log(`JobPilot API running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed");

//     process.exit(1);
//   }
// }

// startServer();


import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { connectDatabase } from "./config/database.js";

import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

const PORT =
  process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

/*
 * Security
 */
app.use(helmet());

/*
 * CORS
 */
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

/*
 * JSON body parser
 */
app.use(
  express.json({
    limit: "1mb",
  })
);

/*
 * Health check
 */
app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "JobPilot API is running",
      timestamp:
        new Date().toISOString(),
    });
  }
);

/*
 * API routes
 */
app.use(
  "/api/resumes",
  resumeRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

/*
 * 404 handler
 *
 * This makes missing API routes easier
 * to identify than Express's default
 * HTML error page.
 */
app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "API route not found",
      method: req.method,
      path: req.originalUrl,
    });
  }
);

/*
 * Start server
 */
async function startServer() {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        console.log(
          `JobPilot API running on port ${PORT}`
        );

        console.log(
          `Frontend: ${FRONTEND_URL}`
        );

        console.log(
          "AI routes: /api/ai"
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();
