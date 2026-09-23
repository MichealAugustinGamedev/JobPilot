import {
  generateWithOllama,
} from "./ollamaService.js";

import {
  buildJobMatchPrompt,
} from "./prompts/jobMatchPrompt.js";

import {
  parseAIJson,
} from "./jsonParser.js";

export async function analyzeJobMatch({
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
    buildJobMatchPrompt({
      resumeText,
      job,
    });

  const response =
    await generateWithOllama(
      prompt,
      {
        temperature: 0.1,
        numPredict: 1500,
      }
    );

  return parseAIJson(response);
}