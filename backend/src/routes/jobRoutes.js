import express from "express";

import {
  searchJobsController,
  getJobsController,
} from "../controllers/jobController.js";

const router = express.Router();

router.get(
  "/search",
  searchJobsController
);

router.get(
  "/",
  getJobsController
);

export default router;