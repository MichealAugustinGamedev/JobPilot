import Job from "../../models/Job.js";

export async function filterJobs(
  filters = {}
) {
  const query = {};

  if (filters.keyword) {
    query.$text = {
      $search: filters.keyword,
    };
  }

  if (filters.location) {
    query.location = {
      $regex: filters.location,
      $options: "i",
    };
  }

  if (filters.workMode) {
    query.workMode =
      filters.workMode;
  }

  if (filters.employmentType) {
    query.employmentType =
      filters.employmentType;
  }

  if (filters.experienceLevel) {
    query.experienceLevel = {
      $regex:
        filters.experienceLevel,
      $options: "i",
    };
  }

  const jobs =
    await Job.find(query)
      .sort({
        postedAt: -1,
        createdAt: -1,
      })
      .limit(100);

  return jobs;
}