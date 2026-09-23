import mongoose from "mongoose";

const jobSearchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    keyword: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    workMode: {
      type: String,
      trim: true,
    },

    employmentType: {
      type: String,
      trim: true,
    },

    experienceLevel: {
      type: String,
      trim: true,
    },

    minimumSalary: {
      type: Number,
    },

    resultsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const JobSearch =
  mongoose.model(
    "JobSearch",
    jobSearchSchema
  );

export default JobSearch;