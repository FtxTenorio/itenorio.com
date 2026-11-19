// Newest first. `inProgress: { start, end }` (ISO dates) marks a course still
// being taken: its card shows an "In progress" badge and how far along it is.
export const educationList = [
  {
    id: "pg-cloud-computing-projects",
    degree: "Postgraduate Specialisation, Cloud Computing Projects",
    levelBadge: "Lato sensu",
    institution: "Uniamérica",
    period: "Nov 2026 - May 2027",
    duration: "7 mos",
    inProgress: { start: "2026-11-01", end: "2027-05-31" },
    icon: "fa-cloud",
    accentColor: "#38bdf8",
    summary:
      "Postgraduate program on planning and delivering cloud computing projects, from architecture and migration to cost and governance.",
    focusTopics: [
      "Cloud Architecture",
      "Cloud Migration",
      "Project Management",
      "Cost Optimization",
      "Governance",
    ],
  },
  {
    id: "mba-information-security",
    degree: "Postgraduate Specialisation, Information Security",
    // the course's Brazilian title; a lato sensu specialisation, not a
    // UK/US-style MBA (a master's degree)
    officialName: "MBA em Segurança da Informação",
    levelBadge: "Lato sensu · 360h",
    institution: "Uniamérica",
    period: "Apr 2026 - Aug 2026",
    duration: "5 mos",
    icon: "fa-shield-alt",
    accentColor: "#a855f7",
    summary:
      "360-hour lato sensu specialisation, 100% online and recognised by Brazil's Ministry of Education (MEC), on cybersecurity, cloud and IoT security, threat management and governance.",
    focusTopics: [
      "Network Defense",
      "Cyber Threat Management",
      "Cloud Security",
      "IoT Security",
      "Governance & Risk",
    ],
  },
  {
    id: "bsc-info-systems",
    degree: "Bachelor's Degree, Information Systems",
    levelBadge: "Bachelor's · BSc",
    institution: "Uniamérica",
    period: "Jan 2022 - Dec 2025",
    duration: "4 yrs",
    icon: "fa-graduation-cap",
    accentColor: "#8b5cf6",
    summary:
      "Core academic foundation in software engineering principles, distributed systems architecture, relational database design, and enterprise IT governance.",
    focusTopics: [
      "Software Engineering",
      "Database Modeling",
      "Computer Networks",
      "Systems Analysis",
      "IT Management",
    ],
  },
];
