import path from "path";
import fs from "fs/promises";

import Resume from "../models/Resume.js";

import {
  extractResumeText,
} from "../utils/parsers/resumeParser.js";

import {
  parseResumeSections,
} from "../utils/parsers/sectionParser.js";

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    // Phase 2 temporarily uses a development user.
    // Authentication will replace this in the authentication phase.
    const userId = req.body.userId;

    if (!userId) {
      await fs.unlink(req.file.path);

      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const extension = path
      .extname(req.file.originalname)
      .toLowerCase();

    const fileType =
      extension === ".pdf"
        ? "pdf"
        : "docx";

    const extractedText =
      await extractResumeText(
        req.file.path,
        fileType
      );

    const sections =
      parseResumeSections(extractedText);

    const existingResumeCount =
      await Resume.countDocuments({ userId });

    const resume = await Resume.create({
      userId,

      originalFileName:
        req.file.originalname,

      storedFileName:
        req.file.filename,

      filePath:
        req.file.path,

      fileType,

      fileSize:
        req.file.size,

      extractedText,

      sections,

      version:
        existingResumeCount + 1,

      isPrimary:
        existingResumeCount === 0,

      status: "processed",
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error(
      "Resume upload error:",
      error
    );

    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch {
        // Ignore cleanup error
      }
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to process resume",
      error: error.message,
    });
  }
}

export async function getResumes(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const resumes =
      await Resume.find({ userId })
        .sort({ createdAt: -1 })
        .select(
          "-extractedText -filePath"
        );

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch resumes",
      error: error.message,
    });
  }
}

export async function getResumeById(req, res) {
  try {
    const { id } = req.params;

    const resume =
      await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to fetch resume",
      error: error.message,
    });
  }
}

export async function deleteResume(req, res) {
  try {
    const { id } = req.params;

    const resume =
      await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    try {
      await fs.unlink(resume.filePath);
    } catch {
      // File may already be deleted
    }

    await Resume.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete resume",
      error: error.message,
    });
  }
}