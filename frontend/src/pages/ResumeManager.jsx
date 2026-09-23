import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const TEST_USER_ID = "6ab39f773b97c7116bde9a60";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function loadResumes() {
    try {
      const response = await axios.get(
        `${API_URL}/api/resumes`,
        {
          params: {
            userId: TEST_USER_ID,
          },
        }
      );

      setResumes(response.data.resumes);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load resumes");
    }
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Please select a PDF or DOCX file.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "userId",
      TEST_USER_ID
    );

    formData.append(
      "resume",
      selectedFile
    );

    try {
      setUploading(true);
      setMessage("");

      await axios.post(
        `${API_URL}/api/resumes/upload`,
        formData
      );

      setSelectedFile(null);

      setMessage(
        "Resume uploaded successfully."
      );

      await loadResumes();
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Delete this resume?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/resumes/${id}`
      );

      await loadResumes();

      setMessage(
        "Resume deleted successfully."
      );
    } catch (error) {
      console.error(error);
      setMessage(
        "Failed to delete resume."
      );
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Resume Manager</h1>

          <p>
            Upload and manage your resumes
            for JobPilot.
          </p>
        </div>
      </div>

      <div className="upload-card">
        <h2>Upload Resume</h2>

        <p>
          Supported formats: PDF and DOCX.
          Maximum size: 10 MB.
        </p>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(event) =>
            setSelectedFile(
              event.target.files?.[0] ||
                null
            )
          }
        />

        {selectedFile && (
          <p>
            Selected:{" "}
            {selectedFile.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading
            ? "Processing..."
            : "Upload Resume"}
        </button>

        {message && (
          <p className="status-message">
            {message}
          </p>
        )}
      </div>

      <div className="resume-list">
        <h2>Your Resumes</h2>

        {resumes.length === 0 ? (
          <p>
            No resumes uploaded yet.
          </p>
        ) : (
          resumes.map((resume) => (
            <div
              className="resume-card"
              key={resume._id}
            >
              <div>
                <h3>
                  {resume.originalFileName}
                </h3>

                <p>
                  Type:{" "}
                  {resume.fileType.toUpperCase()}
                </p>

                <p>
                  Version:{" "}
                  {resume.version}
                </p>

                <p>
                  Status:{" "}
                  {resume.status}
                </p>

                {resume.isPrimary && (
                  <span>
                    Primary Resume
                  </span>
                )}
              </div>

              <button
                onClick={() =>
                  handleDelete(
                    resume._id
                  )
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}