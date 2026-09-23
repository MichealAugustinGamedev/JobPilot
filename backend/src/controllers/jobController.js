import {
  searchJobs,
} from "../services/jobs/jobSearchService.js";

import {
  filterJobs,
} from "../services/jobs/jobFilterService.js";

export async function searchJobsController(
  req,
  res
) {
  try {
    const filters = {
      keyword:
        req.query.keyword || "",

      role:
        req.query.role || "",

      location:
        req.query.location || "",

      workMode:
        req.query.workMode || "",

      employmentType:
        req.query.employmentType || "",

      experienceLevel:
        req.query.experienceLevel || "",

      minimumSalary:
        req.query.minimumSalary
          ? Number(
              req.query.minimumSalary
            )
          : undefined,

      userId:
        req.query.userId || undefined,
    };

    const jobs =
      await searchJobs(filters);

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(
      "Job search failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Job search failed",
      error: error.message,
    });
  }
}

export async function getJobsController(
  req,
  res
) {
  try {
    const filters = {
      keyword:
        req.query.keyword || "",

      location:
        req.query.location || "",

      workMode:
        req.query.workMode || "",

      employmentType:
        req.query.employmentType || "",

      experienceLevel:
        req.query.experienceLevel || "",
    };

    const jobs =
      await filterJobs(filters);

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(
      "Get jobs failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch jobs",
      error: error.message,
    });
  }
}