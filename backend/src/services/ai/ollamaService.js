// import "dotenv/config";

// const OLLAMA_BASE_URL =
//   process.env.OLLAMA_BASE_URL ||
//   "http://127.0.0.1:11434";

// const OLLAMA_MODEL =
//   process.env.OLLAMA_MODEL ||
//   "llama3.2";

// export async function generateWithOllama(
//   prompt,
//   options = {}
// ) {
//   const response = await fetch(
//     `${OLLAMA_BASE_URL}/api/generate`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//           "application/json",
//       },

//       body: JSON.stringify({
//         model: OLLAMA_MODEL,

//         prompt,

//         stream: false,

//         options: {
//           temperature:
//             options.temperature ?? 0.2,

//           num_predict:
//             options.numPredict ?? 2048,
//         },
//       }),
//     }
//   );

//   if (!response.ok) {
//     const errorText =
//       await response.text();

//     throw new Error(
//       `Ollama request failed: ${errorText}`
//     );
//   }

//   const data =
//     await response.json();

//   return data.response || "";
// }


import "dotenv/config";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ||
  "http://127.0.0.1:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL ||
  "llama3.2";

export async function generateWithOllama(
  prompt,
  options = {}
) {
  const response = await fetch(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,

        stream: false,

        // Ask Ollama to return JSON.
        format: "json",

        options: {
          temperature:
            options.temperature ?? 0.1,

          num_predict:
            options.numPredict ?? 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Ollama request failed: ${errorText}`
    );
  }

  const data =
    await response.json();

  return data.response || "";
}
