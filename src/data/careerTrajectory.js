export const careerTrajectory = [
  {
    id: "itenorio-tech",
    role: "Senior Backend Engineer & Cloud Architect",
    company: "iTenorio Tech",
    employmentType: "Contract · Self-employed",
    period: "Aug 2026 - Present",
    duration: "Current",
    location: "Global · Remote",
    isCurrent: true,
    accentColor: "#10b981",
    summary:
      "Partnering with international clients to architect scalable B2B backend ecosystems, payment integrations, and resilient cloud infrastructure.",
    highlights: [
      "Architect and deliver scalable B2B backend solutions and RESTful APIs using Node.js, TypeScript, and NestJS.",
      "Lead end-to-end integration of complex third-party services and payment gateways with high reliability and seamless data flow.",
      "Design and manage AWS infrastructure via Terraform, resolving critical bottlenecks and optimizing performance for high-demand workloads.",
    ],
    unlockedStack: [],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "terraform",
      "docker",
      "postgresql",
      "python",
      "kubernetes",
      "prometheus",
      "grafana",
    ],
    certsEarned: [],
    certsApplied: ["aws-saa", "terraform-assoc", "aws-dva"],
  },
  {
    id: "ifood",
    role: "Mid-level Software Analyst",
    company: "iFood",
    badgeNote: "Acquired Anota AI · same team",
    employmentType: "Full-time",
    period: "Apr 2026 - Sep 2026",
    duration: "6 mos",
    location: "Brazil · Remote",
    isCurrent: false,
    accentColor: "#ef4444",
    summary:
      "Same team and role as at Anota AI, moved to iFood by its acquisition of Anota AI (one continuous year, Nov 2025 - Sep 2026). Focused on day-to-day API integrations, endpoint security risk mitigation, and cross-platform delivery monitoring.",
    highlights: [
      "Maintained and developed RESTful API integrations connecting order management services across iFood, Anota AI, and partner platforms.",
      "Identified and mitigated security risks across existing API endpoints, hardening request validation and preventing unauthorized data exposure.",
      "Evolved a MongoDB-based monitoring solution to track and calculate average delivery access metrics across Anota AI, iFood, and third-party channels.",
    ],
    unlockedStack: [],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "docker",
      "terraform",
      "postgresql",
      "mongodb",
      "kubernetes",
      "prometheus",
      "grafana",
    ],
    certsEarned: [],
    certsApplied: ["aws-saa", "terraform-assoc", "aws-dva"],
  },
  {
    id: "anota-ai",
    role: "Mid-level Software Analyst",
    company: "Anota AI",
    badgeNote: "Acquired by iFood · same team",
    employmentType: "Full-time",
    period: "Nov 2025 - Apr 2026",
    duration: "6 mos",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#3b82f6",
    summary:
      "Worked on core backend maintenance, external delivery API integrations, and observability for automated restaurant order flows. When iFood acquired Anota AI in April 2026, the team and I moved to iFood: one continuous year in the same role, split across two employers.",
    highlights: [
      "Built and maintained standard backend integrations with external delivery and restaurant management APIs using Node.js and TypeScript.",
      "Implemented a monitoring solution backed by MongoDB to aggregate and measure average delivery traffic across Anota AI, iFood, and other integrations.",
      "Addressed API security vulnerabilities found during service maintenance and supported containerized deployments on AWS.",
    ],
    unlockedStack: [],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "docker",
      "postgresql",
      "terraform",
      "kubernetes",
      "prometheus",
      "grafana",
    ],
    certsEarned: [],
    certsApplied: ["aws-saa", "terraform-assoc", "aws-dva"],
  },
  // Compass.uol, one card per level (same company color), newest first:
  // the promotions read as leveling up. `level` / `promotedFrom` feed the
  // level badge on the card.
  {
    id: "compass-uol-mid",
    role: "Mid-level Software Engineer",
    level: 3,
    promotedFrom: "Junior",
    company: "Compass.uol",
    badgeNote: "Allocated at Vivo (Telefónica)",
    employmentType: "Full-time",
    period: "Jan 2024 - Oct 2025",
    duration: "1 yr 10 mos",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#f59e0b",
    summary:
      "Led critical architecture migrations with Infrastructure as Code and built Generative AI agents for Vivo.",
    milestones: [
      {
        year: "2025",
        title: "Generative AI with NLP & Computer Vision (Vivo)",
        details:
          "Developed an internal AI agents system featuring document upload with vector similarity search, image generation integrations, and custom autonomous tools to accelerate decision-making.",
        unlocked: [],
        certs: ["aws-saa", "terraform-assoc"],
      },
      {
        year: "2024",
        title: "High-Impact Architecture & IaC Automation",
        details:
          "Automated a massive AEM (CMS/DAM) migration, cutting estimated effort from 6 months to 1 month and executing with 2 engineers instead of 10, with 100% validated data and zero rework. Adopted Terraform for declarative IaC.",
        unlocked: ["terraform", "kubernetes", "prometheus", "grafana"],
        certs: ["aws-dva", "aws-ai"],
      },
    ],
    unlockedStack: ["terraform", "kubernetes", "prometheus", "grafana"],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "terraform",
      "kubernetes",
      "prometheus",
      "grafana",
      "docker",
      "postgresql",
      "python",
    ],
    certsEarned: ["aws-dva", "aws-ai", "aws-saa", "terraform-assoc"],
    certsApplied: ["aws-clf"],
  },
  {
    id: "compass-uol-junior",
    role: "Junior Software Engineer",
    level: 2,
    promotedFrom: "Intern",
    company: "Compass.uol",
    badgeNote: "Allocated at Vivo (Telefónica)",
    employmentType: "Full-time",
    period: "Dec 2021 - Dec 2023",
    duration: "2 yrs 1 mo",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#f59e0b",
    summary:
      "Consolidated as a cloud and backend engineer: REST microservices on AWS and the security-critical APIs of the Vivo app.",
    milestones: [
      {
        year: "2023",
        title: "Critical API Security & Python Adoption",
        details:
          "Engineered Vivo app's password recovery backend using state machines and encryption. Monitored critical APIs with Datadog, Sentry, and Octane, reducing production errors by over 30%. Introduced Python for automation and data pipelines.",
        unlocked: ["python"],
        certs: ["aws-clf"],
      },
      {
        year: "2022",
        title: "Consolidation as Cloud & Backend Engineer",
        details:
          "Built and maintained REST microservices in Node.js, TypeScript, and NestJS integrated with PostgreSQL, MySQL, MongoDB, and Redis, deployed on AWS (Lambda, ECS, SQS, S3, CloudWatch) with Docker.",
        unlocked: ["typescript", "nestjs", "aws", "docker", "postgresql", "mongodb", "redis"],
        certs: [],
      },
    ],
    unlockedStack: ["typescript", "nestjs", "aws", "docker", "postgresql", "mongodb", "redis", "python"],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "docker",
      "postgresql",
      "mongodb",
      "redis",
      "python",
    ],
    certsEarned: ["aws-clf"],
    certsApplied: [],
  },
  {
    id: "compass-uol-intern",
    role: "Software Engineering Intern",
    level: 1,
    company: "Compass.uol",
    employmentType: "Internship",
    period: "Aug 2021 - Nov 2021",
    duration: "4 mos",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#f59e0b",
    summary:
      "Started in microservices development: Node.js API architecture, clean code, remote collaboration and CI/CD.",
    milestones: [
      {
        year: "2021",
        title: "Microservices Development (Aug 2021 - Nov 2021)",
        details:
          "Built a strong foundation in Node.js API architecture, clean coding standards, remote collaboration, and CI/CD pipelines.",
        unlocked: ["nodejs"],
        certs: [],
      },
    ],
    unlockedStack: ["nodejs"],
    activeStack: ["nodejs"],
    certsEarned: [],
    certsApplied: [],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole years since the first job in careerTrajectory ("Aug 2021" → 5 in Nov 2026). */
export function yearsOfExperience(now = new Date()) {
  const starts = careerTrajectory.map((job) => {
    const [month, year] = job.period.split(/\s*-\s*/)[0].split(" ");
    return new Date(Number(year), MONTHS.indexOf(month), 1);
  });
  const first = new Date(Math.min(...starts));
  const months = (now.getFullYear() - first.getFullYear()) * 12 + now.getMonth() - first.getMonth();
  return Math.floor(months / 12);
}
