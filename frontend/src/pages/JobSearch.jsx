import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function JobSearch() {
  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [workMode, setWorkMode] =
    useState("");

  const [employmentType, setEmploymentType] =
    useState("");

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response =
        await axios.get(
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
    } catch (error) {
      console.error(error);

      setError(
        "Failed to search jobs."
      );
    } finally {
      setLoading(false);
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
          Search and discover job
          opportunities.
        </p>
      </div>

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

      {error && (
        <div className="content-card">
          <p>{error}</p>
        </div>
      )}

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

        {jobs.map((job) => (
          <article
            className="content-card job-result"
            key={job._id}
          >
            <div className="job-info">
              <h3>{job.title}</h3>

              <p>
                {job.company}
              </p>

              <p>
                {job.location}
              </p>

              <div className="job-tags">
                <span>
                  {job.workMode}
                </span>

                <span>
                  {job.employmentType}
                </span>

                {job.experienceLevel && (
                  <span>
                    {job.experienceLevel}
                  </span>
                )}
              </div>

              <p className="job-description">
                {job.description}
              </p>

              <div className="job-skills">
                {job.skills.map(
                  (skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="job-actions">
              <a
                href={
                  job.applicationUrl
                }
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                View Job
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}