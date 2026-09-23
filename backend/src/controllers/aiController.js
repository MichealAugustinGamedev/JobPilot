import Resume from "../models/Resume.js";
import Job from "../models/Job.js";

import {
  analyzeJobMatch,
} from "../services/ai/jobMatchService.js";

import {
  analyzeResumeForAts,
} from "../services/ai/atsService.js";

export async function matchResumeToJob(
  req,
  res
) {
  try {
    const {
      resumeId,
      jobId,
    } = req.body;

    if (!resumeId || !jobId) {
      return res.status(400).json({
        success: false,
        message:
          "resumeId and jobId are required",
      });
    }

    const resume =
      await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const job =
      await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const result =
      await analyzeJobMatch({
        resumeText:
          resume.extractedText,
        job,
      });

    res.json({
      success: true,
      resumeId,
      jobId,
      analysis: result,
    });
  } catch (error) {
    console.error(
      "AI job match failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "AI job matching failed",
      error: error.message,
    });
  }
}

export async function analyzeAts(
  req,
  res
) {
  try {
    const {
      resumeId,
      jobId,
    } = req.body;

    if (!resumeId || !jobId) {
      return res.status(400).json({
        success: false,
        message:
          "resumeId and jobId are required",
      });
    }

    const resume =
      await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const job =
      await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const result =
      await analyzeResumeForAts({
        resumeText:
          resume.extractedText,
        job,
      });

    res.json({
      success: true,
      resumeId,
      jobId,
      analysis: result,
    });
  } catch (error) {
    console.error(
      "ATS analysis failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "ATS analysis failed",
      error: error.message,
    });
  }
}