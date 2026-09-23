export function normalizeJob(rawJob) {
  return {
    externalId:
      rawJob.externalId ||
      rawJob.id ||
      null,

    source:
      rawJob.source ||
      "unknown",

    sourceUrl:
      rawJob.sourceUrl ||
      rawJob.url ||
      "",

    title:
      rawJob.title?.trim() ||
      "Unknown Title",

    company:
      rawJob.company?.trim() ||
      "Unknown Company",

    location:
      rawJob.location?.trim() ||
      "Unknown",

    workMode:
      normalizeWorkMode(
        rawJob.workMode
      ),

    employmentType:
      normalizeEmploymentType(
        rawJob.employmentType
      ),

    experienceLevel:
      rawJob.experienceLevel ||
      "",

    salary:
      rawJob.salary || {},

    skills:
      Array.isArray(rawJob.skills)
        ? rawJob.skills
        : [],

    description:
      rawJob.description || "",

    requirements:
      Array.isArray(rawJob.requirements)
        ? rawJob.requirements
        : [],

    responsibilities:
      Array.isArray(
        rawJob.responsibilities
      )
        ? rawJob.responsibilities
        : [],

    applicationUrl:
      rawJob.applicationUrl ||
      rawJob.url ||
      "",

    postedAt:
      rawJob.postedAt
        ? new Date(rawJob.postedAt)
        : null,

    fetchedAt: new Date(),

    isActive: true,
  };
}

function normalizeWorkMode(value) {
  if (!value) {
    return "unknown";
  }

  const normalized =
    value.toLowerCase();

  if (
    normalized.includes("remote")
  ) {
    return "remote";
  }

  if (
    normalized.includes("hybrid")
  ) {
    return "hybrid";
  }

  if (
    normalized.includes("onsite") ||
    normalized.includes("on-site") ||
    normalized.includes("office")
  ) {
    return "onsite";
  }

  return "unknown";
}

function normalizeEmploymentType(value) {
  if (!value) {
    return "unknown";
  }

  const normalized =
    value.toLowerCase();

  if (
    normalized.includes("full")
  ) {
    return "full-time";
  }

  if (
    normalized.includes("part")
  ) {
    return "part-time";
  }

  if (
    normalized.includes("contract")
  ) {
    return "contract";
  }

  if (
    normalized.includes("intern")
  ) {
    return "internship";
  }

  if (
    normalized.includes("temporary")
  ) {
    return "temporary";
  }

  return "unknown";
}