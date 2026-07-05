/*
 * ==========================================
 *  SITE DATA — Edit this file to update your portfolio content
 * ==========================================
 *
 *  How to edit:
 *  1. Replace anything marked (수정 필요) with your real information
 *  2. Add/remove entries in timeline[] and projects[] arrays
 *  3. Projects with `sample: true` show a "SAMPLE" badge — set to false
 *     (or remove the field) once you replace them with real projects
 *  4. Save and refresh the browser to see changes
 */

const SITE_DATA = {

  // --- Personal Information ---
  personal: {
    name: "Dongjun Jang",
    tagline: "Software Engineer @ LG Electronics",
    introduction:
      "성균관대학교 전자전기공학부를 졸업하고, 2021년 11월부터 LG전자에서 " +
      "소프트웨어 엔지니어로 일하고 있습니다. " +
      "(여기에 관심 분야, 강점, 커리어 방향 등 한두 문장을 채워주세요 — 수정 필요)",
    email: "jangkimdj@gmail.com",
    github: "https://github.com/DJ-Kor",
    linkedin: "", // LinkedIn 프로필이 있으면 URL 입력
    profileImage: "", // optional: e.g. "assets/profile.jpg"
  },

  // --- Skills (About 페이지에 표시) ---
  // 카테고리와 항목은 자유롭게 수정/추가하세요 (수정 필요)
  skills: {
    "Languages": ["C", "C++", "Python", "JavaScript"],
    "Platforms & Tools": ["Linux", "Git", "Docker", "Firebase"],
  },

  // --- Timeline (Education & Career) ---
  // type: "career" or "education", newest first
  timeline: [
    {
      type: "career",
      title: "Software Engineer — (현재 직무명 수정 필요)",
      organization: "LG전자",
      team: "(현재 팀명 — 수정 필요)",
      period: "20XX.XX — Present",
      description:
        "(직무 변경 후 담당 업무와 주요 성과 — 수정 필요)",
    },
    {
      type: "career",
      title: "Software Engineer — (이전 직무명 수정 필요)",
      organization: "LG전자",
      team: "(이전 팀명 — 수정 필요)",
      period: "2021.11 — 20XX.XX",
      description:
        "(직무 변경 전 담당 업무와 주요 성과 — 수정 필요)",
    },
    {
      type: "education",
      title: "전자전기공학부 학사",
      organization: "성균관대학교",
      team: "",
      period: "2015.03 — 2021.08",
      description: "",
    },
  ],

  // --- Projects ---
  // sample: true → 카드에 SAMPLE 배지 표시. 실제 프로젝트로 교체 후 제거하세요.
  projects: [
    {
      title: "Project Alpha",
      techStack: ["C++", "Linux", "CMake"],
      description:
        "프로젝트에 대한 설명을 작성하세요. " +
        "어떤 문제를 해결했고, 어떤 역할을 했는지 포함해주세요.",
      link: "",
      highlights: [
        "주요 성과 또는 기능 1",
        "주요 성과 또는 기능 2",
      ],
      sample: true,
    },
    {
      title: "Project Beta",
      techStack: ["Python", "FastAPI", "Docker"],
      description:
        "프로젝트에 대한 설명을 작성하세요.",
      link: "",
      highlights: [
        "주요 성과 또는 기능 1",
        "주요 성과 또는 기능 2",
      ],
      sample: true,
    },
    {
      title: "Portfolio Website (this site)",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase", "GitHub Pages"],
      description:
        "빌드 도구 없이 순수 HTML/CSS/JS로 만든 정적 포트폴리오. " +
        "Firestore 기반 미니게임 리더보드와 giscus 방명록을 붙여 " +
        "정적 호스팅에서도 동적 기능이 동작하도록 구성했습니다.",
      link: "https://github.com/DJ-Kor/AAB-DJJ",
      highlights: [
        "GitHub Pages 정적 호스팅 + Firestore 연동",
        "데스크탑/모바일 반응형 UI (하단 탭 내비게이션)",
        "Canvas 기반 미니게임 및 실시간 랭킹",
      ],
    },
  ],
};
