import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    professionalTitle: {
      type: String,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
      },
    ],

    preferences: {
      preferredRoles: [String],
      preferredLocations: [String],
      workModes: [String],
      employmentTypes: [String],
      minimumSalary: Number,
      experienceLevel: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model(
  "UserProfile",
  userProfileSchema
);

export default UserProfile;