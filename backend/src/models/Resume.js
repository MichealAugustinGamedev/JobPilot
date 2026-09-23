import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    storedFileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    sections: {
      summary: {
        type: String,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      experience: {
        type: String,
        default: "",
      },

      education: {
        type: String,
        default: "",
      },

      projects: {
        type: String,
        default: "",
      },

      certifications: {
        type: String,
        default: "",
      },
    },

    version: {
      type: Number,
      default: 1,
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["uploaded", "processed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;