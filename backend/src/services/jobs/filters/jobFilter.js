function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function matchesKeyword(job, keyword) {
  if (!keyword) {
    return true;
  }

  const searchableText = normalize(
    [
      job.title,
      job.company,
      job.description,
      job.location,
      job.experienceLevel,
      ...(job.skills || []),
      ...(job.requirements || []),
      ...(job.responsibilities || []),
    ].join(" ")
  );

  /*
   * Multiple keywords are treated as AND.
   *
   * Example:
   *
   * Unity C#
   *
   * The job must contain both
   * "unity" and "c#".
   */
  const keywords = keyword
    .split(/[\s,]+/)
    .map(normalize)
    .filter(Boolean);

  return keywords.every((word) =>
    searchableText.includes(word)
  );
}

function matchesLocation(
  job,
  location
) {
  if (!location) {
    return true;
  }

  return normalize(
    job.location
  ).includes(
    normalize(location)
  );
}

function matchesWorkMode(
  job,
  workMode
) {
  if (!workMode) {
    return true;
  }

  return (
    normalize(job.workMode) ===
    normalize(workMode)
  );
}

function matchesEmploymentType(
  job,
  employmentType
) {
  if (!employmentType) {
    return true;
  }

  return (
    normalize(
      job.employmentType
    ) ===
    normalize(employmentType)
  );
}

function matchesExperienceLevel(
  job,
  experienceLevel
) {
  if (!experienceLevel) {
    return true;
  }

  return normalize(
    job.experienceLevel
  ).includes(
    normalize(experienceLevel)
  );
}

export function filterJobs(
  jobs,
  filters = {}
) {
  return jobs.filter((job) => {
    return (
      matchesKeyword(
        job,
        filters.keyword
      ) &&
      matchesLocation(
        job,
        filters.location
      ) &&
      matchesWorkMode(
        job,
        filters.workMode
      ) &&
      matchesEmploymentType(
        job,
        filters.employmentType
      ) &&
      matchesExperienceLevel(
        job,
        filters.experienceLevel
      )
    );
  });
}
