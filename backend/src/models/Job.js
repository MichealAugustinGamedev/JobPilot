import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    sourceUrl: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    workMode: {
      type: String,
      enum: [
        "remote",
        "hybrid",
        "onsite",
        "unknown",
      ],
      default: "unknown",
    },

    employmentType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "temporary",
        "unknown",
      ],
      default: "unknown",
    },

    experienceLevel: {
      type: String,
      trim: true,
    },

    salary: {
      min: Number,
      max: Number,
      currency: String,
      period: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    requirements: {
      type: [String],
      default: [],
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    applicationUrl: {
      type: String,
      trim: true,
    },

    postedAt: {
      type: Date,
    },

    fetchedAt: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    searchKeywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

jobSchema.index({
  source: 1,
  externalId: 1,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;