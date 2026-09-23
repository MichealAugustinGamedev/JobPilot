// import { useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000";

// export default function JobSearch() {
//   const [keyword, setKeyword] =
//     useState("");

//   const [location, setLocation] =
//     useState("");

//   const [workMode, setWorkMode] =
//     useState("");

//   const [employmentType, setEmploymentType] =
//     useState("");

//   const [jobs, setJobs] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   async function handleSearch(event) {
//     event.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const response =
//         await axios.get(
//           `${API_URL}/api/jobs/search`,
//           {
//             params: {
//               keyword,
//               location,
//               workMode,
//               employmentType,
//             },
//           }
//         );

//       setJobs(
//         response.data.jobs || []
//       );
//     } catch (error) {
//       console.error(error);

//       setError(
//         "Failed to search jobs."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <p className="eyebrow">
//           JOB DISCOVERY
//         </p>

//         <h1>Job Search</h1>

//         <p>
//           Search and discover job
//           opportunities.
//         </p>
//       </div>

//       <form
//         className="job-search-form"
//         onSubmit={handleSearch}
//       >
//         <input
//           type="text"
//           placeholder="Job title or keyword"
//           value={keyword}
//           onChange={(event) =>
//             setKeyword(event.target.value)
//           }
//         />

//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(event) =>
//             setLocation(event.target.value)
//           }
//         />

//         <select
//           value={workMode}
//           onChange={(event) =>
//             setWorkMode(event.target.value)
//           }
//         >
//           <option value="">
//             Any work mode
//           </option>

//           <option value="remote">
//             Remote
//           </option>

//           <option value="hybrid">
//             Hybrid
//           </option>

//           <option value="onsite">
//             Onsite
//           </option>
//         </select>

//         <select
//           value={employmentType}
//           onChange={(event) =>
//             setEmploymentType(
//               event.target.value
//             )
//           }
//         >
//           <option value="">
//             Any employment type
//           </option>

//           <option value="full-time">
//             Full-time
//           </option>

//           <option value="part-time">
//             Part-time
//           </option>

//           <option value="contract">
//             Contract
//           </option>

//           <option value="internship">
//             Internship
//           </option>
//         </select>

//         <button
//           type="submit"
//           className="primary-button"
//           disabled={loading}
//         >
//           {loading
//             ? "Searching..."
//             : "Search Jobs"}
//         </button>
//       </form>

//       {error && (
//         <div className="content-card">
//           <p>{error}</p>
//         </div>
//       )}

//       <section className="jobs-list">
//         {jobs.length === 0 &&
//           !loading && (
//             <div className="content-card">
//               <p>
//                 No jobs found. Try another
//                 search.
//               </p>
//             </div>
//           )}

//         {jobs.map((job) => (
//           <article
//             className="content-card job-result"
//             key={job._id}
//           >
//             <div className="job-info">
//               <h3>{job.title}</h3>

//               <p>
//                 {job.company}
//               </p>

//               <p>
//                 {job.location}
//               </p>

//               <div className="job-tags">
//                 <span>
//                   {job.workMode}
//                 </span>

//                 <span>
//                   {job.employmentType}
//                 </span>

//                 {job.experienceLevel && (
//                   <span>
//                     {job.experienceLevel}
//                   </span>
//                 )}
//               </div>

//               <p className="job-description">
//                 {job.description}
//               </p>

//               <div className="job-skills">
//                 {job.skills.map(
//                   (skill) => (
//                     <span key={skill}>
//                       {skill}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="job-actions">
//               <a
//                 href={
//                   job.applicationUrl
//                 }
//                 target="_blank"
//                 rel="noreferrer"
//                 className="secondary-button"
//               >
//                 View Job
//               </a>
//             </div>
//           </article>
//         ))}
//       </section>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

// Temporary Phase 4 user.
// Authentication will replace this later.
const TEST_USER_ID = "6ab39f773b97c7116bde9a60";

export default function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [employmentType, setEmploymentType] =
    useState("");

  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] =
    useState(false);

  const [error, setError] = useState("");

  // Job Match state
  const [analysisLoading, setAnalysisLoading] =
    useState(null);

  const [analysisResults, setAnalysisResults] =
    useState({});

  // ATS state
  const [atsLoading, setAtsLoading] =
    useState(null);

  const [atsResults, setAtsResults] =
    useState({});

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      setResumeLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/resumes`,
        {
          params: {
            userId: TEST_USER_ID,
          },
        }
      );

      const resumeList =
        response.data.resumes || [];

      setResumes(resumeList);

      const primaryResume =
        resumeList.find(
          (resume) => resume.isPrimary
        );

      if (primaryResume) {
        setSelectedResumeId(
          primaryResume._id
        );
      } else if (resumeList.length > 0) {
        setSelectedResumeId(
          resumeList[0]._id
        );
      }
    } catch (error) {
      console.error(
        "Failed to load resumes:",
        error
      );

      setError(
        "Unable to load your resumes."
      );
    } finally {
      setResumeLoading(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/jobs/search`,
        {
          params: {
            keyword,
            location,
            workMode,
            employmentType,
          },
        }
      );

      setJobs(
        response.data.jobs || []
      );

      // Clear old AI results when
      // performing a new search.
      setAnalysisResults({});
      setAtsResults({});
    } catch (error) {
      console.error(
        "Job search failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to search jobs."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyzeMatch(jobId) {
    if (!selectedResumeId) {
      setError(
        "Please upload/select a resume before analyzing a job."
      );
      return;
    }

    try {
      setAnalysisLoading(jobId);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/ai/match`,
        {
          resumeId: selectedResumeId,
          jobId,
        }
      );

      setAnalysisResults(
        (previous) => ({
          ...previous,
          [jobId]:
            response.data.analysis,
        })
      );
    } catch (error) {
      console.error(
        "AI match analysis failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "AI job matching failed."
      );
    } finally {
      setAnalysisLoading(null);
    }
  }

  async function handleAnalyzeATS(jobId) {
    if (!selectedResumeId) {
      setError(
        "Please upload/select a resume before running ATS analysis."
      );
      return;
    }

    try {
      setAtsLoading(jobId);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/ai/ats`,
        {
          resumeId: selectedResumeId,
          jobId,
        }
      );

      setAtsResults(
        (previous) => ({
          ...previous,
          [jobId]:
            response.data.analysis,
        })
      );
    } catch (error) {
      console.error(
        "ATS analysis failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          "ATS analysis failed."
      );
    } finally {
      setAtsLoading(null);
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <p className="eyebrow">
          JOB DISCOVERY
        </p>

        <h1>Job Search</h1>

        <p>
          Find jobs and compare them with
          your resume using local AI.
        </p>
      </div>

      {/* Resume Selection */}
      <section className="content-card">
        <div className="section-heading">
          <div>
            <h3>AI Matching Resume</h3>

            <p>
              Select the resume JobPilot
              should compare against jobs.
            </p>
          </div>
        </div>

        {resumeLoading ? (
          <p>Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <div>
            <p>No resumes found.</p>

            <p>
              Upload a resume in Resume
              Manager before using AI
              matching.
            </p>
          </div>
        ) : (
          <select
            value={selectedResumeId}
            onChange={(event) =>
              setSelectedResumeId(
                event.target.value
              )
            }
            className="resume-selector"
          >
            <option value="">
              Select a resume
            </option>

            {resumes.map((resume) => (
              <option
                key={resume._id}
                value={resume._id}
              >
                {resume.originalFileName}

                {resume.isPrimary
                  ? " — Primary"
                  : ""}
              </option>
            ))}
          </select>
        )}
      </section>

      {/* Search Form */}
      <form
        className="job-search-form"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) =>
            setLocation(event.target.value)
          }
        />

        <select
          value={workMode}
          onChange={(event) =>
            setWorkMode(event.target.value)
          }
        >
          <option value="">
            Any work mode
          </option>

          <option value="remote">
            Remote
          </option>

          <option value="hybrid">
            Hybrid
          </option>

          <option value="onsite">
            Onsite
          </option>
        </select>

        <select
          value={employmentType}
          onChange={(event) =>
            setEmploymentType(
              event.target.value
            )
          }
        >
          <option value="">
            Any employment type
          </option>

          <option value="full-time">
            Full-time
          </option>

          <option value="part-time">
            Part-time
          </option>

          <option value="contract">
            Contract
          </option>

          <option value="internship">
            Internship
          </option>
        </select>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Search Jobs"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="content-card error-card">
          <p>{error}</p>
        </div>
      )}

      {/* Job Results */}
      <section className="jobs-list">
        {jobs.length === 0 &&
          !loading && (
            <div className="content-card">
              <p>
                No jobs found. Try another
                search.
              </p>
            </div>
          )}

        {jobs.map((job) => {
          const analysis =
            analysisResults[job._id];

          const atsAnalysis =
            atsResults[job._id];

          const isAnalyzingMatch =
            analysisLoading === job._id;

          const isAnalyzingATS =
            atsLoading === job._id;

          return (
            <article
              className="content-card job-result"
              key={job._id}
            >
              <div className="job-info">
                {/* Job Header */}
                <h3>{job.title}</h3>

                <p>
                  <strong>
                    {job.company}
                  </strong>
                </p>

                <p>
                  {job.location} ·{" "}
                  {job.workMode}
                </p>

                {/* Job Tags */}
                <div className="job-tags">
                  <span>
                    {job.employmentType}
                  </span>

                  {job.experienceLevel && (
                    <span>
                      {job.experienceLevel}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="job-description">
                  {job.description}
                </p>

                {/* Job Skills */}
                {job.skills?.length > 0 && (
                  <div className="job-skills">
                    {job.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                )}

                {/* ========================= */}
                {/* JOB MATCH ANALYSIS */}
                {/* ========================= */}

                {analysis && (
                  <div className="ai-analysis">
                    <div className="ai-analysis-header">
                      <h4>
                        AI Match Analysis
                      </h4>

                      <strong>
                        {analysis.matchPercentage ??
                          "N/A"}
                        %
                      </strong>
                    </div>

                    <p className="ai-note">
                      This percentage represents
                      alignment between the supplied
                      resume and job information. It
                      is not a hiring probability.
                    </p>

                    {/* Matching Skills */}
                    <div className="analysis-section">
                      <h5>
                        Matching Skills
                      </h5>

                      {analysis.matchingSkills
                        ?.length ? (
                        <div className="analysis-tags">
                          {analysis.matchingSkills.map(
                            (skill) => (
                              <span
                                key={skill}
                              >
                                ✓ {skill}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No matching skills
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Missing Skills */}
                    <div className="analysis-section">
                      <h5>
                        Missing Skills
                      </h5>

                      {analysis.missingSkills
                        ?.length ? (
                        <div className="analysis-tags">
                          {analysis.missingSkills.map(
                            (skill) => (
                              <span
                                key={skill}
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No additional missing
                          skills identified.
                        </p>
                      )}
                    </div>

                    {/* Matching Experience */}
                    <div className="analysis-section">
                      <h5>
                        Matching Experience
                      </h5>

                      {analysis.matchingExperience
                        ?.length ? (
                        <ul>
                          {analysis.matchingExperience.map(
                            (
                              experience,
                              index
                            ) => (
                              <li
                                key={index}
                              >
                                {experience}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>
                          No matching experience
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Relevant Projects */}
                    <div className="analysis-section">
                      <h5>
                        Relevant Projects
                      </h5>

                      {analysis.relevantProjects
                        ?.length ? (
                        <ul>
                          {analysis.relevantProjects.map(
                            (
                              project,
                              index
                            ) => (
                              <li
                                key={index}
                              >
                                {project}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>
                          No relevant projects
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Important Keywords */}
                    <div className="analysis-section">
                      <h5>
                        Important Keywords
                      </h5>

                      {analysis.importantKeywords
                        ?.length ? (
                        <div className="analysis-tags">
                          {analysis.importantKeywords.map(
                            (keyword) => (
                              <span
                                key={keyword}
                              >
                                {keyword}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No important keywords
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div className="analysis-section">
                      <h5>
                        Recommendations
                      </h5>

                      {analysis.recommendations
                        ?.length ? (
                        <ul>
                          {analysis.recommendations.map(
                            (
                              recommendation,
                              index
                            ) => (
                              <li
                                key={index}
                              >
                                {
                                  recommendation
                                }
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>
                          No recommendations
                          returned.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ========================= */}
                {/* ATS ANALYSIS */}
                {/* ========================= */}

                {atsAnalysis && (
                  <div className="ai-analysis ats-analysis">
                    <div className="ai-analysis-header">
                      <h4>
                        ATS Resume Analysis
                      </h4>

                      <span className="ats-badge">
                        ATS
                      </span>
                    </div>

                    <p className="ai-note">
                      This analysis identifies job
                      keywords and suggests resume
                      improvements. Suggestions must
                      remain factually accurate.
                    </p>

                    {/* ATS Keywords */}
                    <div className="analysis-section">
                      <h5>
                        ATS Keywords
                      </h5>

                      {atsAnalysis.atsKeywords
                        ?.length ? (
                        <div className="analysis-tags">
                          {atsAnalysis.atsKeywords.map(
                            (keyword) => (
                              <span
                                key={keyword}
                              >
                                {keyword}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No ATS keywords identified.
                        </p>
                      )}
                    </div>

                    {/* Supported Keywords */}
                    <div className="analysis-section">
                      <h5>
                        Supported Keywords
                      </h5>

                      {atsAnalysis.supportedKeywords
                        ?.length ? (
                        <div className="analysis-tags">
                          {atsAnalysis.supportedKeywords.map(
                            (keyword) => (
                              <span
                                key={keyword}
                              >
                                ✓ {keyword}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No supported keywords
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Unsupported Keywords */}
                    <div className="analysis-section">
                      <h5>
                        Unsupported / Missing
                        Keywords
                      </h5>

                      {atsAnalysis.unsupportedKeywords
                        ?.length ? (
                        <div className="analysis-tags">
                          {atsAnalysis.unsupportedKeywords.map(
                            (keyword) => (
                              <span
                                key={keyword}
                              >
                                {keyword}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No unsupported keywords
                          identified.
                        </p>
                      )}
                    </div>

                    {/* Summary Suggestion */}
                    <div className="analysis-section">
                      <h5>
                        Summary Suggestion
                      </h5>

                      {atsAnalysis.summarySuggestion ? (
                        <div className="suggestion-box">
                          <p>
                            {
                              atsAnalysis.summarySuggestion
                            }
                          </p>
                        </div>
                      ) : (
                        <p>
                          No summary suggestion
                          returned.
                        </p>
                      )}
                    </div>

                    {/* Bullet Suggestions */}
                    <div className="analysis-section">
                      <h5>
                        Bullet Suggestions
                      </h5>

                      {atsAnalysis.bulletSuggestions
                        ?.length ? (
                        <div className="bullet-suggestions">
                          {atsAnalysis.bulletSuggestions.map(
                            (
                              bullet,
                              index
                            ) => (
                              <div
                                className="suggestion-box"
                                key={index}
                              >
                                {bullet.original && (
                                  <div>
                                    <strong>
                                      Original
                                    </strong>

                                    <p>
                                      {
                                        bullet.original
                                      }
                                    </p>
                                  </div>
                                )}

                                {bullet.suggestion && (
                                  <div>
                                    <strong>
                                      Suggested
                                    </strong>

                                    <p>
                                      {
                                        bullet.suggestion
                                      }
                                    </p>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p>
                          No bullet suggestions
                          returned.
                        </p>
                      )}
                    </div>

                    {/* Formatting Suggestions */}
                    <div className="analysis-section">
                      <h5>
                        Formatting Suggestions
                      </h5>

                      {atsAnalysis
                        .formattingSuggestions
                        ?.length ? (
                        <ul>
                          {atsAnalysis.formattingSuggestions.map(
                            (
                              suggestion,
                              index
                            ) => (
                              <li
                                key={index}
                              >
                                {suggestion}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>
                          No formatting suggestions
                          returned.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ========================= */}
              {/* JOB ACTIONS */}
              {/* ========================= */}

              <div className="job-actions">
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  View Job
                </a>

                <button
                  className="primary-button"
                  onClick={() =>
                    handleAnalyzeMatch(
                      job._id
                    )
                  }
                  disabled={
                    isAnalyzingMatch ||
                    isAnalyzingATS ||
                    !selectedResumeId
                  }
                >
                  {isAnalyzingMatch
                    ? "Analyzing..."
                    : "Analyze Match"}
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    handleAnalyzeATS(
                      job._id
                    )
                  }
                  disabled={
                    isAnalyzingATS ||
                    isAnalyzingMatch ||
                    !selectedResumeId
                  }
                >
                  {isAnalyzingATS
                    ? "Analyzing ATS..."
                    : "Analyze ATS"}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}