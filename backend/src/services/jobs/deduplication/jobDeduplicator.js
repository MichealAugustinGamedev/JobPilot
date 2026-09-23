function normalizeText(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function createJobKey(job) {
  if (
    job.source &&
    job.externalId
  ) {
    return `${job.source}:${job.externalId}`;
  }

  return [
    normalizeText(job.title),
    normalizeText(job.company),
    normalizeText(job.location),
  ].join(":");
}

export function deduplicateJobs(jobs) {
  const uniqueJobs = new Map();

  for (const job of jobs) {
    const key = createJobKey(job);

    if (!uniqueJobs.has(key)) {
      uniqueJobs.set(key, job);
    }
  }

  return Array.from(
    uniqueJobs.values()
  );
}