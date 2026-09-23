import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

savedJobSchema.index(
  {
    userId: 1,
    jobId: 1,
  },
  {
    unique: true,
  }
);

const SavedJob =
  mongoose.model(
    "SavedJob",
    savedJobSchema
  );

export default SavedJob;