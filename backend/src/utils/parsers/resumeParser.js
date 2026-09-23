// import fs from "fs/promises";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";

// export async function extractResumeText(filePath, fileType) {
//   const buffer = await fs.readFile(filePath);

//   if (fileType === "pdf") {
//     const result = await pdfParse(buffer);
//     return result.text;
//   }

//   if (fileType === "docx") {
//     const result = await mammoth.extractRawText({
//       buffer,
//     });

//     return result.value;
//   }

//   throw new Error("Unsupported resume format");
// }


import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function extractResumeText(filePath, fileType) {
  const buffer = await fs.readFile(filePath);

  if (fileType === "pdf") {
    const parser = new PDFParse({
      data: new Uint8Array(buffer),
    });

    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  if (fileType === "docx") {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  throw new Error("Unsupported resume format");
}
  