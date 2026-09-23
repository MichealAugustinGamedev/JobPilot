import express from "express";

import uploadResume from "../middleware/uploadResume.js";

import {
  uploadResume as uploadResumeController,
  getResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post(
  "/upload",
  uploadResume.single("resume"),
  uploadResumeController
);

router.get("/", getResumes);

router.get("/:id", getResumeById);

router.delete("/:id", deleteResume);

export default router;