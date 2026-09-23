// import express from "express";

// import {
//   matchResumeToJob,
//   analyzeAts,
// } from "../controllers/aiController.js";

// const router = express.Router();

// router.post(
//   "/match",
//   matchResumeToJob
// );

// router.post(
//   "/ats",
//   analyzeAts
// );

// export default router;

// New code///

import express from "express";

import {
  matchResumeToJob,
  analyzeAts,
} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/match",
  matchResumeToJob
);

router.post(
  "/ats",
  analyzeAts
);

export default router;