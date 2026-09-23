// import { useEffect, useState } from "react";
// import ResumeManager from "./pages/ResumeManager";
// import JobSearch from "./pages/JobSearch";

// const API_URL = "http://localhost:5000";

// const initialStats = [
//   { label: "Jobs Found", value: 0 },
//   { label: "Matched Jobs", value: 0 },
//   { label: "Applications", value: 0 },
//   { label: "Interviews", value: 0 },
// ];

// const initialJobs = [
//   {
//     id: 1,
//     title: "Unity Developer",
//     company: "RegiMc Studio",
//     location: "Chennai, India",
//     status: "Saved",
//   },
//   {
//     id: 2,
//     title: "Game QA Tester",
//     company: "RegiMc",
//     location: "Remote",
//     status: "Saved",
//   },
// ];

// function App() {
//   const [apiStatus, setApiStatus] = useState("Checking...");
//   const [activePage, setActivePage] = useState("Dashboard");

//   const [stats] = useState(initialStats);
//   const [jobs] = useState(initialJobs);
  

//   useEffect(() => {
//     async function checkApi() {
//       try {
//         const response = await fetch(`${API_URL}/api/health`);

//         if (!response.ok) {
//           throw new Error("API request failed");
//         }

//         const data = await response.json();

//         setApiStatus(
//           data.success ? "Connected" : "Unavailable"
//         );
//       } catch (error) {
//         console.error(
//           "API health check failed:",
//           error
//         );

//         setApiStatus("Offline");
//       }
//     }

//     checkApi();
//   }, []);

//   const navigationItems = [
//     "Dashboard",
//     "Job Search",
//     "Resume Manager",
//     "Application Tracker",
//     "Email Center",
//     "Settings",
//   ];

//   return (
//     <div className="app-shell">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="brand">
//           <div className="brand-mark">J</div>

//           <div>
//             <h1>JobPilot</h1>
//             <span>AI Job Assistant</span>
//           </div>
//         </div>

//         <nav className="navigation">
//           {navigationItems.map((item) => (
//             <button
//               key={item}
//               className={`nav-item ${
//                 activePage === item ? "active" : ""
//               }`}
//               onClick={() => setActivePage(item)}
//             >
//               {item}
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <span className="status-dot" />
//           Local application
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="main-content">
//         <header className="topbar">
//           <div>
//             <p className="eyebrow">WORKSPACE</p>
//             <h2>{activePage}</h2>
//           </div>

//           <div className="connection-status">
//             <span
//               className={`status-dot ${
//                 apiStatus === "Connected"
//                   ? "online"
//                   : ""
//               }`}
//             />

//             API: {apiStatus}
//           </div>
//         </header>

//         {/* ========================= */}
//         {/* DASHBOARD */}
//         {/* ========================= */}

//         {activePage === "Dashboard" && (
//           <>
//             <section className="welcome-section">
//               <div>
//                 <p className="eyebrow">
//                   YOUR JOB SEARCH
//                 </p>

//                 <h3>
//                   Welcome to JobPilot
//                 </h3>

//                 <p>
//                   Organize your job search,
//                   tailor your resume, and manage
//                   your application progress.
//                 </p>
//               </div>

//               <button
//                 className="primary-button"
//                 onClick={() =>
//                   setActivePage("Job Search")
//                 }
//               >
//                 Find Jobs
//               </button>
//             </section>

//             <section className="stats-grid">
//               {stats.map((stat) => (
//                 <div
//                   className="stat-card"
//                   key={stat.label}
//                 >
//                   <span>{stat.label}</span>
//                   <strong>{stat.value}</strong>
//                 </div>
//               ))}
//             </section>

//             <section className="content-card">
//               <div className="section-heading">
//                 <div>
//                   <h3>Recent Jobs</h3>

//                   <p>
//                     Example data for the initial
//                     dashboard.
//                   </p>
//                 </div>

//                 <button
//                   className="secondary-button"
//                   onClick={() =>
//                     setActivePage("Job Search")
//                   }
//                 >
//                   View Jobs
//                 </button>
//               </div>

//               <div className="jobs-list">
//                 {jobs.map((job) => (
//                   <div
//                     className="job-row"
//                     key={job.id}
//                   >
//                     <div className="job-info">
//                       <h4>{job.title}</h4>

//                       <p>
//                         {job.company} ·{" "}
//                         {job.location}
//                       </p>
//                     </div>

//                     <span className="job-status">
//                       {job.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </>
//         )}

//         {/* ========================= */}
//         {/* RESUME MANAGER */}
//         {/* ========================= */}

//         {activePage === "Resume Manager" && (
//           <ResumeManager />
//         )}

//         {/* ========================= */}
//         {/* OTHER MODULES */}
//         {/* ========================= */}

//         {activePage !== "Dashboard" &&
//           activePage !== "Resume Manager" && (
//             <section className="content-card page-placeholder">
//               <p className="eyebrow">
//                 MODULE
//               </p>

//               <h3>{activePage}</h3>

//               <p>
//                 This module is planned for a
//                 later development phase. Use the
//                 sidebar to explore the dashboard.
//               </p>

//               <button
//                 className="secondary-button"
//                 onClick={() =>
//                   setActivePage("Dashboard")
//                 }
//               >
//                 Back to Dashboard
//               </button>
//             </section>
//           )}
//       </main>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import ResumeManager from "./pages/ResumeManager";
import JobSearch from "./pages/JobSearch";

const API_URL = "http://localhost:5000";

const initialStats = [
  {
    label: "Jobs Found",
    value: 0,
  },
  {
    label: "Matched Jobs",
    value: 0,
  },
  {
    label: "Applications",
    value: 0,
  },
  {
    label: "Interviews",
    value: 0,
  },
];

const initialJobs = [
  {
    id: 1,
    title: "Unity Developer",
    company: "RegiMc Studio",
    location: "Chennai, India",
    status: "Saved",
  },
  {
    id: 2,
    title: "Game QA Tester",
    company: "RegiMc",
    location: "Remote",
    status: "Saved",
  },
];

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [activePage, setActivePage] = useState("Dashboard");

  const [stats] = useState(initialStats);
  const [jobs] = useState(initialJobs);

  // =========================
  // API HEALTH CHECK
  // =========================

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch(
          `${API_URL}/api/health`
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();

        setApiStatus(
          data.success
            ? "Connected"
            : "Unavailable"
        );
      } catch (error) {
        console.error(
          "API health check failed:",
          error
        );

        setApiStatus("Offline");
      }
    }

    checkApi();
  }, []);

  // =========================
  // SIDEBAR NAVIGATION
  // =========================

  const navigationItems = [
    "Dashboard",
    "Job Search",
    "Resume Manager",
    "Application Tracker",
    "Email Center",
    "Settings",
  ];

  return (
    <div className="app-shell">

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}

      <aside className="sidebar">

        {/* BRAND */}

        <div className="brand">

          <div className="brand-mark">
            J
          </div>

          <div>
            <h1>JobPilot</h1>

            <span>
              AI Job Assistant
            </span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="navigation">

          {navigationItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item)
              }
            >
              {item}
            </button>
          ))}

        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="sidebar-footer">

          <span className="status-dot" />

          Local application

        </div>

      </aside>

      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}

      <main className="main-content">

        {/* ========================= */}
        {/* TOP BAR */}
        {/* ========================= */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              WORKSPACE
            </p>

            <h2>
              {activePage}
            </h2>

          </div>

          <div className="connection-status">

            <span
              className={`status-dot ${
                apiStatus === "Connected"
                  ? "online"
                  : ""
              }`}
            />

            API: {apiStatus}

          </div>

        </header>

        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {activePage === "Dashboard" && (
          <>

            {/* WELCOME SECTION */}

            <section className="welcome-section">

              <div>

                <p className="eyebrow">
                  YOUR JOB SEARCH
                </p>

                <h3>
                  Welcome to JobPilot
                </h3>

                <p>
                  Organize your job search,
                  tailor your resume, and manage
                  your application progress.
                </p>

              </div>

              <button
                className="primary-button"
                onClick={() =>
                  setActivePage("Job Search")
                }
              >
                Find Jobs
              </button>

            </section>

            {/* STATS */}

            <section className="stats-grid">

              {stats.map((stat) => (
                <div
                  className="stat-card"
                  key={stat.label}
                >

                  <span>
                    {stat.label}
                  </span>

                  <strong>
                    {stat.value}
                  </strong>

                </div>
              ))}

            </section>

            {/* RECENT JOBS */}

            <section className="content-card">

              <div className="section-heading">

                <div>

                  <h3>
                    Recent Jobs
                  </h3>

                  <p>
                    Example data for the
                    initial dashboard.
                  </p>

                </div>

                <button
                  className="secondary-button"
                  onClick={() =>
                    setActivePage(
                      "Job Search"
                    )
                  }
                >
                  View Jobs
                </button>

              </div>

              <div className="jobs-list">

                {jobs.map((job) => (
                  <div
                    className="job-row"
                    key={job.id}
                  >

                    <div className="job-info">

                      <h4>
                        {job.title}
                      </h4>

                      <p>
                        {job.company}
                        {" · "}
                        {job.location}
                      </p>

                    </div>

                    <span className="job-status">
                      {job.status}
                    </span>

                  </div>
                ))}

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* RESUME MANAGER */}
        {/* ================================================= */}

        {activePage === "Resume Manager" && (
          <ResumeManager />
        )}

        {/* ================================================= */}
        {/* JOB SEARCH */}
        {/* ================================================= */}

        {activePage === "Job Search" && (
          <JobSearch />
        )}

        {/* ================================================= */}
        {/* OTHER MODULES */}
        {/* ================================================= */}

        {activePage !== "Dashboard" &&
          activePage !== "Resume Manager" &&
          activePage !== "Job Search" && (

            <section className="content-card page-placeholder">

              <p className="eyebrow">
                MODULE
              </p>

              <h3>
                {activePage}
              </h3>

              <p>
                This module is planned for a
                later development phase. Use
                the sidebar to explore the
                dashboard.
              </p>

              <button
                className="secondary-button"
                onClick={() =>
                  setActivePage("Dashboard")
                }
              >
                Back to Dashboard
              </button>

            </section>

          )}

      </main>

    </div>
  );
}

export default App;