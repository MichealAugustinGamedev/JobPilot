import {
  generateWithOllama,
} from "./ollamaService.js";

import {
  buildAtsPrompt,
} from "./prompts/atsPrompt.js";

import {
  parseAIJson,
} from "./jsonParser.js";

export async function analyzeResumeForAts({
  resumeText,
  job,
}) {
  if (!resumeText) {
    throw new Error(
      "Resume text is required"
    );
  }

  if (!job) {
    throw new Error(
      "Job data is required"
    );
  }

  const prompt =
    buildAtsPrompt({
      resumeText,
      job,
    });

  const response =
    await generateWithOllama(
      prompt,
      {
        temperature: 0.1,
        numPredict: 2000,
      }
    );

  return parseAIJson(response);
}