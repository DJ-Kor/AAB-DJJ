/*
 * ==========================================
 *  SITE DATA — Edit this file to update your portfolio content
 * ==========================================
 *
 *  How to edit:
 *  1. Replace placeholder text with your real information
 *  2. Add/remove entries in timeline[] and projects[] arrays
 *  3. To add a new entry, copy an existing one and modify the values
 *  4. Save and refresh the browser to see changes
 */

const SITE_DATA = {

  // --- Personal Information ---
  personal: {
    name: "Your Name",
    tagline: "Software Engineer | Problem Solver | Builder",
    introduction:
      "간단한 자기소개를 여기에 작성하세요. " +
      "어떤 분야에 관심이 있고, 어떤 가치를 추구하는지, " +
      "어떤 경험을 통해 성장해왔는지 등을 담아주세요.",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    profileImage: "", // optional: path to image file e.g. "assets/profile.jpg"
  },

  // --- Timeline (Education & Career) ---
  // type: "career" or "education"
  // Newest first
  timeline: [
    {
      type: "career",
      title: "Software Engineer",
      organization: "회사 이름",
      team: "팀 이름",
      period: "2024.03 — Present",
      description:
        "담당 업무와 주요 성과를 간략하게 작성하세요.",
    },
    {
      type: "career",
      title: "Backend Developer (Intern)",
      organization: "회사 이름",
      team: "팀 이름",
      period: "2023.06 — 2023.12",
      description:
        "인턴십에서의 주요 경험과 배운 점을 작성하세요.",
    },
    {
      type: "education",
      title: "컴퓨터공학 학사",
      organization: "대학교 이름",
      team: "",
      period: "2019.03 — 2024.02",
      description:
        "전공, 관련 수업, 학업 성과 등을 작성하세요.",
    },
    {
      type: "education",
      title: "졸업",
      organization: "고등학교 이름",
      team: "",
      period: "2016.03 — 2019.02",
      description: "",
    },
  ],

  // --- Projects ---
  projects: [
    {
      title: "Project Alpha",
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      description:
        "프로젝트에 대한 설명을 작성하세요. " +
        "어떤 문제를 해결했고, 어떤 역할을 했는지 포함해주세요.",
      link: "https://github.com/yourusername/project-alpha",
      highlights: [
        "주요 성과 또는 기능 1",
        "주요 성과 또는 기능 2",
        "주요 성과 또는 기능 3",
      ],
    },
    {
      title: "Project Beta",
      techStack: ["Python", "FastAPI", "Docker", "AWS"],
      description:
        "프로젝트에 대한 설명을 작성하세요.",
      link: "https://github.com/yourusername/project-beta",
      highlights: [
        "주요 성과 또는 기능 1",
        "주요 성과 또는 기능 2",
      ],
    },
    {
      title: "Project Gamma",
      techStack: ["Java", "Spring Boot", "MySQL", "Redis"],
      description:
        "프로젝트에 대한 설명을 작성하세요.",
      link: "",
      highlights: [
        "주요 성과 또는 기능 1",
        "주요 성과 또는 기능 2",
      ],
    },
    {
      title: "Project Delta",
      techStack: ["Flutter", "Dart", "Firebase"],
      description:
        "프로젝트에 대한 설명을 작성하세요.",
      link: "",
      highlights: [
        "주요 성과 또는 기능 1",
      ],
    },
  ],
};
