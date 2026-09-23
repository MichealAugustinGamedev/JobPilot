// export function parseAIJson(text) {
//   if (!text) {
//     throw new Error(
//       "AI returned an empty response"
//     );
//   }

//   let cleaned = text.trim();

//   if (
//     cleaned.startsWith("```json")
//   ) {
//     cleaned = cleaned
//       .replace(/^```json/, "")
//       .replace(/```$/, "")
//       .trim();
//   }

//   if (
//     cleaned.startsWith("```")
//   ) {
//     cleaned = cleaned
//       .replace(/^```/, "")
//       .replace(/```$/, "")
//       .trim();
//   }

//   try {
//     return JSON.parse(cleaned);
//   } catch (error) {
//     throw new Error(
//       `AI returned invalid JSON: ${error.message}`
//     );
//   }
// }

export function parseAIJson(responseText) {
  if (!responseText) {
    throw new Error(
      "AI returned an empty response"
    );
  }

  let cleaned = responseText.trim();

  // Remove Markdown code fences if the model
  // returns them despite the JSON instruction.
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // First attempt:
  // Parse the complete response directly.
  try {
    return JSON.parse(cleaned);
  } catch {
    // Continue with JSON extraction.
  }

  // Second attempt:
  // Extract the first JSON object from surrounding text.
  const firstBrace =
    cleaned.indexOf("{");

  const lastBrace =
    cleaned.lastIndexOf("}");

  if (
    firstBrace !== -1 &&
    lastBrace !== -1 &&
    lastBrace > firstBrace
  ) {
    const jsonCandidate =
      cleaned.slice(
        firstBrace,
        lastBrace + 1
      );

    try {
      return JSON.parse(
        jsonCandidate
      );
    } catch {
      // Continue to final error.
    }
  }

  throw new Error(
    `AI returned invalid JSON: ${cleaned.slice(
      0,
      200
    )}`
  );
}

// Optional alias.
// This allows either function name to be used
// elsewhere in the project.
export const parseJsonResponse =
  parseAIJson;

