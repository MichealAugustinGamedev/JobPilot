// export function buildJobMatchPrompt({
//   resumeText,
//   job,
// }) {
//   return `
// You are an AI job-matching assistant.

// Your task is to compare a candidate's resume
// with a job description.

// IMPORTANT RULES:

// 1. Do not invent skills.
// 2. Do not invent work experience.
// 3. Do not invent education.
// 4. Do not assume a skill exists unless supported
//    by the resume.
// 5. Clearly distinguish matching skills from
//    missing skills.
// 6. Do not guarantee that the candidate will
//    get the job.
// 7. Return valid JSON only.

// CANDIDATE RESUME:

// ${resumeText}

// JOB TITLE:

// ${job.title}

// COMPANY:

// ${job.company}

// LOCATION:

// ${job.location}

// JOB DESCRIPTION:

// ${job.description}

// JOB REQUIREMENTS:

// ${(job.requirements || []).join("\n")}

// JOB SKILLS:

// ${(job.skills || []).join(", ")}

// Return exactly this JSON structure:

// {
//   "matchPercentage": 0,
//   "matchingSkills": [],
//   "missingSkills": [],
//   "matchingExperience": [],
//   "relevantProjects": [],
//   "importantKeywords": [],
//   "recommendations": []
// }

// The matchPercentage must represent resume-to-job
// alignment based only on the supplied information.
// It is NOT a hiring probability.
// `;
// }



export function buildJobMatchPrompt({
  resumeText,
  job,
}) {
  return `
You are a professional job matching and resume analysis assistant.

Your task is to compare the candidate's resume with
the supplied job information and determine how closely
the resume aligns with the job.

IMPORTANT:

You must analyze the ACTUAL CONTENT of the resume.

Do not assume that a skill is missing simply because
the wording is not exactly identical.

Use semantic matching.

For example:

Resume:
"executed functional and regression testing"

Job:
"perform regression testing"

This is a MATCH.

Resume:
"identified, reproduced, and documented functional
and interaction bugs"

Job:
"identify bugs, reproduce issues, and document defects"

This is a MATCH.

Resume:
"Unity and C#"

Job:
"Unity"

This is a MATCH.

Resume:
"test cases"

Job:
"execute test cases"

This is a MATCH.

Resume:
"QA-tested tracking accuracy and performance"

Job:
"game testing and performance testing"

This can be considered relevant matching experience.

STRICT FACTUAL RULES:

1. Never invent skills.
2. Never invent work experience.
3. Never invent education.
4. Never invent projects.
5. Never assume the candidate has a skill that is
   not supported by the resume.
6. Use semantic similarity when comparing related
   wording.
7. A direct skill match should be identified when
   the same skill appears in both the resume and job.
8. A related experience match should be identified
   when the resume demonstrates the same type of
   work even if the wording differs.
9. Do not treat missing skills as automatic rejection.
10. Do not calculate hiring probability.
11. matchPercentage represents ONLY resume-to-job
    alignment.
12. Do not use keyword stuffing.
13. Return valid JSON only.
14. Do not write explanations outside the JSON object.

CANDIDATE RESUME:

${resumeText}

JOB TITLE:

${job.title}

COMPANY:

${job.company}

LOCATION:

${job.location}

JOB DESCRIPTION:

${job.description}

JOB REQUIREMENTS:

${(job.requirements || []).join("\n")}

JOB RESPONSIBILITIES:

${(job.responsibilities || []).join("\n")}

JOB SKILLS:

${(job.skills || []).join(", ")}

MATCHING METHOD:

Evaluate the job using these categories:

A. Direct Skill Matches
Skills explicitly present in both the resume and job.

B. Semantic Skill Matches
Skills where the resume and job use different but
clearly related wording.

C. Experience Matches
Evidence that the candidate has performed work
related to the job responsibilities.

D. Project Matches
Projects from the resume that demonstrate relevant
skills or experience.

E. Missing Skills
Important job requirements that are not supported
by the resume.

F. Important Keywords
Important job-related terms that should be considered
when tailoring the resume.

MATCH PERCENTAGE:

Calculate matchPercentage based on the overall
alignment between the resume and the job.

Consider:

- Direct skill matches
- Semantic skill matches
- Relevant experience
- Relevant projects
- Job responsibilities
- Job requirements

Do NOT require the candidate to satisfy every
requirement before giving a non-zero percentage.

For this task, a candidate with several strong
matches should receive a meaningful alignment
percentage even if some requirements are missing.

Return exactly this JSON structure:

{
  "matchPercentage": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "matchingExperience": [],
  "relevantProjects": [],
  "importantKeywords": [],
  "recommendations": []
}

FIELD RULES:

matchPercentage:
A number from 0 to 100 representing resume-to-job
alignment. This is NOT hiring probability.

matchingSkills:
List the skills from the job that are supported
by the resume.

missingSkills:
List important job skills or requirements that are
not supported by the resume.

matchingExperience:
List specific evidence from the resume that relates
to the job responsibilities.

relevantProjects:
List actual projects from the resume that are relevant
to this job.

importantKeywords:
List important job-related keywords that matter for
resume alignment.

recommendations:
Provide practical recommendations for improving the
resume for this specific job.

Recommendations must NOT ask the candidate to claim
skills or experience they do not have.

Return ONLY the JSON object.
`;
}