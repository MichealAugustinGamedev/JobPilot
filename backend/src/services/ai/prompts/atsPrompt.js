// export function buildAtsPrompt({
//   resumeText,
//   job,
// }) {
//   return `
// You are an ATS resume optimization assistant.

// Analyze the candidate's resume against the job
// description.

// Your job is to suggest improvements while
// preserving factual accuracy.

// STRICT RULES:

// 1. Never invent experience.
// 2. Never invent projects.
// 3. Never invent employment.
// 4. Never invent education.
// 5. Never add a technology unless the resume
//    already supports it.
// 6. Do not use keyword stuffing.
// 7. Preserve the candidate's actual meaning.
// 8. Improve wording where appropriate.
// 9. Use job-relevant terminology only when
//    factually supported.
// 10. Return JSON only.

// RESUME:

// ${resumeText}

// JOB TITLE:

// ${job.title}

// COMPANY:

// ${job.company}

// JOB DESCRIPTION:

// ${job.description}

// REQUIREMENTS:

// ${(job.requirements || []).join("\n")}

// KEY SKILLS:

// ${(job.skills || []).join(", ")}

// Return:

// {
//   "atsKeywords": [],
//   "supportedKeywords": [],
//   "unsupportedKeywords": [],
//   "summarySuggestion": "",
//   "bulletSuggestions": [],
//   "formattingSuggestions": []
// }
// `;
// }

export function buildAtsPrompt({
  resumeText,
  job,
}) {
  return `
You are an ATS resume optimization assistant.

Compare the candidate resume with the supplied
job information.

Your response MUST be a single valid JSON object.

DO NOT:
- Write an introduction.
- Write an explanation before the JSON.
- Write an explanation after the JSON.
- Use Markdown.
- Use code fences.
- Use \`\`\`json.
- Invent experience.
- Invent projects.
- Invent employment.
- Invent education.
- Invent certifications.
- Invent skills.
- Add technologies that are not supported by the resume.
- Use keyword stuffing.

IMPORTANT:

A keyword is "supported" only when the candidate's
resume provides evidence that the candidate has
that skill, technology, experience, or knowledge.

A keyword is "unsupported" when the job requests it
but the supplied resume does not provide sufficient
evidence.

The purpose of this analysis is to improve the resume
without changing factual information.

CANDIDATE RESUME:

${resumeText}

JOB TITLE:

${job.title}

COMPANY:

${job.company}

JOB DESCRIPTION:

${job.description}

JOB REQUIREMENTS:

${(job.requirements || []).join("\n")}

JOB SKILLS:

${(job.skills || []).join(", ")}

Return EXACTLY this JSON structure:

{
  "atsKeywords": [
    "keyword"
  ],
  "supportedKeywords": [
    "keyword"
  ],
  "unsupportedKeywords": [
    "keyword"
  ],
  "summarySuggestion": "A concise improved summary based only on the candidate resume.",
  "bulletSuggestions": [
    {
      "original": "Original resume bullet if applicable",
      "suggestion": "Improved factual version"
    }
  ],
  "formattingSuggestions": [
    "Suggestion"
  ]
}

Rules for the JSON:

- atsKeywords must contain important job-related
  keywords found in the job information.
- supportedKeywords must contain only keywords
  supported by the resume.
- unsupportedKeywords must contain job keywords
  that are not supported by the resume.
- summarySuggestion must not introduce new facts.
- bulletSuggestions must only improve existing
  factual content.
- formattingSuggestions should contain practical
  ATS formatting improvements.
- Use empty arrays when there is no applicable data.
- Return ONLY the JSON object.
`;
}