import Job from "../../models/Job.js";
import JobSearch from "../../models/JobSearch.js";

import {
  searchJobs as searchMockJobs,
} from "./adapters/mockJobAdapter.js";

import {
  normalizeJob,
} from "./normalizers/jobNormalizer.js";

import {
  deduplicateJobs,
} from "./deduplication/jobDeduplicator.js";

export async function searchJobs(
  filters = {}
) {
  const rawJobs =
    await searchMockJobs(filters);

  const normalizedJobs =
    rawJobs.map(normalizeJob);

  const uniqueJobs =
    deduplicateJobs(
      normalizedJobs
    );

  const savedJobs = [];

  for (const job of uniqueJobs) {
    const existing =
      await Job.findOne({
        source: job.source,
        externalId:
          job.externalId,
      });

    if (existing) {
      Object.assign(
        existing,
        job
      );

      await existing.save();

      savedJobs.push(existing);
    } else {
      const created =
        await Job.create(job);

      savedJobs.push(created);
    }
  }

  if (filters.userId) {
    await JobSearch.create({
      userId: filters.userId,

      keyword:
        filters.keyword || "",

      role:
        filters.role || "",

      location:
        filters.location || "",

      workMode:
        filters.workMode || "",

      employmentType:
        filters.employmentType || "",

      experienceLevel:
        filters.experienceLevel || "",

      minimumSalary:
        filters.minimumSalary,

      resultsCount:
        savedJobs.length,
    });
  }

  return savedJobs;
}