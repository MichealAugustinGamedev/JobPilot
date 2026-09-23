import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.resolve(
  process.cwd(),
  "storage",
  "resumes"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      extension;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const allowedExtensions = [".pdf", ".docx"];

  if (!allowedExtensions.includes(extension)) {
    return cb(
      new Error("Only PDF and DOCX resumes are allowed")
    );
  }

  cb(null, true);
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default uploadResume;