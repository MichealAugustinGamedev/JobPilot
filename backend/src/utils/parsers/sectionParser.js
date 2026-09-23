const SECTION_NAMES = {
  summary: [
    "summary",
    "professional summary",
    "profile",
    "objective",
  ],

  skills: [
    "skills",
    "technical skills",
    "core skills",
    "skills & technologies",
  ],

  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment",
  ],

  education: [
    "education",
    "academic background",
    "qualifications",
  ],

  projects: [
    "projects",
    "personal projects",
    "academic projects",
  ],

  certifications: [
    "certifications",
    "certificates",
    "licenses",
  ],
};

function identifySection(line) {
  const normalized = line
    .trim()
    .toLowerCase()
    .replace(/[:\-]/g, "");

  for (const [section, names] of Object.entries(SECTION_NAMES)) {
    if (names.includes(normalized)) {
      return section;
    }
  }

  return null;
}

export function parseResumeSections(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = {
    summary: "",
    skills: [],
    experience: "",
    education: "",
    projects: "",
    certifications: "",
  };

  let currentSection = null;

  for (const line of lines) {
    const detectedSection = identifySection(line);

    if (detectedSection) {
      currentSection = detectedSection;
      continue;
    }

    if (!currentSection) {
      continue;
    }

    if (currentSection === "skills") {
      const skills = line
        .split(/[,|•]/)
        .map((skill) => skill.trim())
        .filter(Boolean);

      sections.skills.push(...skills);
    } else {
      sections[currentSection] += `${line}\n`;
    }
  }

  sections.summary = sections.summary.trim();
  sections.experience = sections.experience.trim();
  sections.education = sections.education.trim();
  sections.projects = sections.projects.trim();
  sections.certifications = sections.certifications.trim();

  sections.skills = [
    ...new Set(
      sections.skills.map((skill) => skill.trim()).filter(Boolean)
    ),
  ];

  return sections;
}