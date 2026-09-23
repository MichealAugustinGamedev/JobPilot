import {
  filterJobs,
} from "../filters/jobFilter.js";

/**
 * Mock Job Adapter
 *
 * This adapter is used during Phase 3 development
 * to test the JobPilot job-search architecture
 * without depending on external job websites.
 *
 * Later, real permitted job-source adapters can
 * follow the same interface:
 *
 * searchJobs(filters)
 *
 * and return jobs in the same structure.
 */
export async function searchJobs(filters = {}) {
  const jobs = [
    {
      externalId: "mock-unity-001",
      source: "mock",

      title: "Unity Developer",

      company: "Example Game Studio",

      location: "Chennai, India",

      workMode: "Hybrid",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "Unity",
        "C#",
        "3D",
        "Game Development",
      ],

      description:
        "Looking for a Unity Developer to build and maintain interactive 2D and 3D game experiences.",

      requirements: [
        "Unity Engine",
        "C#",
        "Basic game development knowledge",
      ],

      responsibilities: [
        "Develop gameplay systems",
        "Debug Unity projects",
        "Optimize game performance",
      ],

      applicationUrl:
        "https://example.com/jobs/unity-developer",

      postedAt: new Date(),
    },

    {
      externalId: "mock-qa-001",
      source: "mock",

      title: "Game QA Tester",

      company: "Example Games",

      location: "Remote",

      workMode: "Remote",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "Game Testing",
        "QA",
        "Bug Tracking",
        "Unity",
      ],

      description:
        "Test games, identify bugs, reproduce issues, and document defects.",

      requirements: [
        "Basic game testing knowledge",
        "Bug reporting",
      ],

      responsibilities: [
        "Execute test cases",
        "Report bugs",
        "Perform regression testing",
      ],

      applicationUrl:
        "https://example.com/jobs/game-qa",

      postedAt: new Date(),
    },

    {
      externalId: "mock-ar-001",
      source: "mock",

      title: "AR/VR Developer Intern",

      company: "XR Technologies",

      location: "Chennai, India",

      workMode: "Onsite",

      employmentType: "Internship",

      experienceLevel: "Intern",

      skills: [
        "Unity",
        "C#",
        "AR",
        "VR",
        "Vuforia",
      ],

      description:
        "Assist in developing AR and VR applications using Unity.",

      requirements: [
        "Unity knowledge",
        "C# programming",
        "Interest in AR/VR",
      ],

      responsibilities: [
        "Develop Unity scenes",
        "Integrate AR assets",
        "Test AR/VR interactions",
      ],

      applicationUrl:
        "https://example.com/jobs/ar-vr-intern",

      postedAt: new Date(),
    },

    {
      externalId: "mock-unreal-001",
      source: "mock",

      title: "Unreal Engine Developer",

      company: "NextGen Interactive",

      location: "Bangalore, India",

      workMode: "Hybrid",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "Unreal Engine",
        "C++",
        "Blueprints",
        "3D",
        "Game Development",
      ],

      description:
        "Develop gameplay features and interactive experiences using Unreal Engine and C++.",

      requirements: [
        "Unreal Engine knowledge",
        "C++ programming",
        "Game development fundamentals",
      ],

      responsibilities: [
        "Create gameplay systems",
        "Develop Unreal Engine features",
        "Debug and optimize game projects",
      ],

      applicationUrl:
        "https://example.com/jobs/unreal-developer",

      postedAt: new Date(),
    },

    {
      externalId: "mock-react-001",
      source: "mock",

      title: "React Developer",

      company: "Tech Solutions India",

      location: "Chennai, India",

      workMode: "Remote",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Node.js",
      ],

      description:
        "Build modern web applications using React and JavaScript.",

      requirements: [
        "React knowledge",
        "JavaScript",
        "Frontend development",
      ],

      responsibilities: [
        "Develop React applications",
        "Create reusable UI components",
        "Debug frontend issues",
      ],

      applicationUrl:
        "https://example.com/jobs/react-developer",

      postedAt: new Date(),
    },

    {
      externalId: "mock-python-001",
      source: "mock",

      title: "Python Developer",

      company: "AI Technologies",

      location: "Remote",

      workMode: "Remote",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "Python",
        "FastAPI",
        "MongoDB",
        "REST API",
        "Git",
      ],

      description:
        "Develop backend services and APIs using Python and FastAPI.",

      requirements: [
        "Python programming",
        "REST API knowledge",
        "Database fundamentals",
      ],

      responsibilities: [
        "Develop backend APIs",
        "Integrate databases",
        "Write and maintain Python services",
      ],

      applicationUrl:
        "https://example.com/jobs/python-developer",

      postedAt: new Date(),
    },

    {
      externalId: "mock-game-designer-001",
      source: "mock",

      title: "Game Designer",

      company: "Pixel Forge Studios",

      location: "Chennai, India",

      workMode: "Onsite",

      employmentType: "Full-time",

      experienceLevel: "Entry Level",

      skills: [
        "Game Design",
        "Unity",
        "Level Design",
        "Game Mechanics",
        "Documentation",
      ],

      description:
        "Design gameplay mechanics, levels, player experiences, and game systems for mobile and PC games.",

      requirements: [
        "Understanding of game mechanics",
        "Game design fundamentals",
        "Documentation skills",
      ],

      responsibilities: [
        "Design gameplay mechanics",
        "Create game design documents",
        "Work with programmers and artists",
      ],

      applicationUrl:
        "https://example.com/jobs/game-designer",

      postedAt: new Date(),
    },
  ];

  /*
   * Apply JobPilot's common filtering system.
   *
   * Supported filters:
   *
   * keyword
   * location
   * workMode
   * employmentType
   * experienceLevel
   */
  const filteredJobs = filterJobs(
    jobs,
    filters
  );

  return filteredJobs;
}
