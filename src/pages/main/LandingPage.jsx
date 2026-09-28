import { useEffect, useState } from "react";

// ==========================================
// DATA & ASSETS CONFIG
// ==========================================
const ASSETS_BASE_URL =
  "https://dy9pxtyo5i8g0.cloudfront.net/itenorio/images/assets";

const PROFILE_IMAGE_URL = `${ASSETS_BASE_URL}/profile-paulo-tenorio.png`;

const techStack = [
  {
    id: "nodejs",
    name: "Node.js",
    years: 5,
    startedYear: 2021,
    icon: `${ASSETS_BASE_URL}/tech-nodejs.svg`,
    description:
      "Used as the main engine for developing robust backend ecosystems, focusing on high scalability, event-driven architectures, and efficient asynchronous I/O manipulation.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    years: 5,
    startedYear: 2021,
    icon: `${ASSETS_BASE_URL}/tech-typescript.svg`,
    description:
      "Implemented to ensure safe static typing, modularity, and maintainability in large-scale applications, drastically reducing runtime bugs.",
  },
  {
    id: "nestjs",
    name: "NestJS",
    years: 5,
    startedYear: 2021,
    icon: `${ASSETS_BASE_URL}/tech-nestjs.svg`,
    description:
      "Preferred framework for building structured corporate APIs and microservices, fully leveraging dependency injection and Clean Architecture patterns.",
  },
  {
    id: "aws",
    name: "AWS",
    years: 4,
    startedYear: 2022,
    icon: `${ASSETS_BASE_URL}/tech-aws.svg`,
    description:
      "Solid experience designing and deploying serverless and traditional infrastructures, integrating essential services like Lambda, SQS, DynamoDB, Cognito, CloudFront, and API Gateway.",
  },
  {
    id: "docker",
    name: "Docker",
    years: 4,
    startedYear: 2022,
    icon: `${ASSETS_BASE_URL}/tech-docker.svg`,
    description:
      "Continuous use for containerizing development and production environments, ensuring absolute parity across environments and optimizing CI/CD pipelines.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    years: 4,
    startedYear: 2022,
    icon: `${ASSETS_BASE_URL}/tech-postgresql.svg`,
    description:
      "Modeling complex relational databases, query optimization, strategic index creation, and ensuring ACID transactional integrity.",
  },
  {
    id: "python",
    name: "Python",
    years: 3,
    startedYear: 2023,
    icon: `${ASSETS_BASE_URL}/tech-python.svg`,
    description:
      "Applied in developing automation scripts, secondary data processing pipelines, and agile integrations with artificial intelligence tools.",
  },
  {
    id: "terraform",
    name: "Terraform",
    years: 2,
    startedYear: 2024,
    icon: `${ASSETS_BASE_URL}/tech-terraform.svg`,
    description:
      "Automated Infrastructure as Code (IaC) provisioning on AWS, maintaining replicable, modular, and secure states declaratively.",
  },
];

const certifications = [
  {
    id: "aws-saa",
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    yearEarned: 2025,
    difficulty: "hard",
    img: `${ASSETS_BASE_URL}/cert-aws-solutions-architect.png`,
    meaning:
      "Validates advanced technical competency in designing robust, resilient, and economically optimized distributed systems within the AWS platform.",
    details:
      "One of the most respected cloud certifications, requiring deep knowledge in complex migration scenarios, multi-account security, hybrid networks, and global fault tolerance strategies.",
  },
  {
    id: "terraform-assoc",
    name: "Terraform Associate",
    issuer: "HashiCorp",
    yearEarned: 2025,
    difficulty: "medium",
    img: `${ASSETS_BASE_URL}/cert-terraform-associate.png`,
    meaning:
      "Official HashiCorp certification validating mastery of open-source Infrastructure as Code (IaC) concepts.",
    details:
      "Ensures the professional understands HCL file structure, state management (state files), creation of reusable modules, and secure execution of workflows via the Terraform CLI.",
  },
  {
    id: "aws-ai",
    name: "AWS AI Practitioner",
    issuer: "Amazon Web Services",
    yearEarned: 2025,
    difficulty: "easy",
    img: `${ASSETS_BASE_URL}/cert-aws-ai-practitioner.png`,
    meaning:
      "Certifies understanding of Artificial Intelligence, Machine Learning concepts, and native AWS generative AI services.",
    details:
      "Covers practical use of tools like Amazon Bedrock, SageMaker, and language models, preparing professionals to align AI capabilities with business demands.",
  },
  {
    id: "aws-assoc",
    name: "AWS Associate",
    issuer: "Amazon Web Services",
    yearEarned: 2023,
    difficulty: "medium",
    img: `${ASSETS_BASE_URL}/cert-aws-associate.png`,
    meaning:
      "Certifies practical ability to implement, manage, and operate AWS cloud applications autonomously.",
    details:
      "Focuses heavily on fundamental compute, storage, database, and security concepts for day-to-day backend engineering tasks.",
  },
  {
    id: "aws-clf",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    yearEarned: 2022,
    difficulty: "easy",
    img: `${ASSETS_BASE_URL}/cert-aws-cloud-practitioner.png`,
    meaning:
      "Foundational credential proving a holistic and general view of the entire AWS ecosystem and terminology.",
    details:
      "Ideal for solidifying concepts of billing, support, global security, and basic cloud architecture before advancing to highly specialized tracks.",
  },
];

const careerTrajectory = [
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
    ],
    certsEarned: [],
    certsApplied: ["aws-saa", "terraform-assoc", "aws-assoc"],
  },
  {
    id: "ifood",
    role: "Software Engineer",
    company: "iFood",
    badgeNote: "Acquired Anota AI",
    employmentType: "Full-time",
    period: "Apr 2026 - Sep 2026",
    duration: "6 mos",
    location: "Brazil · Remote",
    isCurrent: false,
    accentColor: "#ef4444",
    summary:
      "Focused on day-to-day API integrations, endpoint security risk mitigation, and cross-platform delivery monitoring following iFood's acquisition of Anota AI.",
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
    ],
    certsEarned: ["aws-saa"],
    certsApplied: ["terraform-assoc", "aws-assoc"],
  },
  {
    id: "anota-ai",
    role: "Software Engineer",
    company: "Anota AI",
    employmentType: "Full-time",
    period: "Nov 2025 - Apr 2026",
    duration: "6 mos",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#3b82f6",
    summary:
      "Worked on core backend maintenance, external delivery API integrations, and observability for automated restaurant order flows.",
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
    ],
    certsEarned: ["terraform-assoc"],
    certsApplied: ["aws-assoc", "aws-ai"],
  },
  {
    id: "compass-uol",
    role: "Software Engineer",
    company: "Compass.uol",
    badgeNote: "Allocated at Vivo (Telefónica)",
    employmentType: "Full-time",
    period: "Aug 2021 - Oct 2025",
    duration: "4 yrs 2 mos",
    location: "Fortaleza, Brazil · Remote",
    isCurrent: false,
    accentColor: "#f59e0b",
    summary:
      "Progressed from backend foundations to leading critical architecture migrations, state-machine security systems, and Generative AI agents.",
    milestones: [
      {
        year: "2025",
        title: "Generative AI with NLP & Computer Vision (Vivo)",
        details:
          "Developed an internal AI agents system featuring document upload with vector similarity search, image generation integrations, and custom autonomous tools to accelerate decision-making.",
        unlocked: [],
        certs: ["aws-ai"],
      },
      {
        year: "2024",
        title: "High-Impact Architecture & IaC Automation",
        details:
          "Automated a massive AEM (CMS/DAM) migration, cutting estimated effort from 6 months to 1 month and executing with 2 engineers instead of 10—with 100% validated data and zero rework. Adopted Terraform for declarative IaC.",
        unlocked: ["terraform"],
        certs: [],
      },
      {
        year: "2023",
        title: "Critical API Security & Python Adoption",
        details:
          "Engineered Vivo app's password recovery backend using state machines and encryption. Monitored critical APIs with Datadog, Sentry, and Octane, reducing production errors by over 30%. Introduced Python for automation and data pipelines.",
        unlocked: ["python"],
        certs: ["aws-assoc"],
      },
      {
        year: "2022",
        title: "Consolidation as Cloud & Backend Engineer",
        details:
          "Built and maintained REST microservices in Node.js, TypeScript, and NestJS integrated with PostgreSQL, MySQL, MongoDB, and Redis, deployed on AWS (Lambda, ECS, SQS, S3, CloudWatch) with Docker.",
        unlocked: ["typescript", "nestjs", "aws", "docker", "postgresql"],
        certs: ["aws-clf"],
      },
      {
        year: "2021",
        title: "Microservices Development (Aug 2021 - Nov 2021)",
        details:
          "Built a strong foundation in Node.js API architecture, clean coding standards, remote collaboration, and CI/CD pipelines.",
        unlocked: ["nodejs"],
        certs: [],
      },
    ],
    unlockedStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "docker",
      "postgresql",
      "python",
      "terraform",
    ],
    activeStack: [
      "nodejs",
      "typescript",
      "nestjs",
      "aws",
      "docker",
      "postgresql",
      "python",
      "terraform",
    ],
    certsEarned: ["aws-clf", "aws-assoc", "aws-ai"],
    certsApplied: [],
  },
];

const educationList = [
  {
    id: "mba-cybersecurity",
    degree: "Postgraduate Degree (MBA), Cybersecurity & Information Assurance",
    levelBadge: "Postgraduate · MBA",
    institution: "Uniamérica",
    period: "Apr 2026 – Aug 2026",
    duration: "5 mos",
    icon: "fa-shield-alt",
    accentColor: "#a855f7",
    summary:
      "Specialized postgraduate program focused on securing modern cloud architectures, mitigating application risks, and establishing governance standards.",
    focusTopics: [
      "Network Defense",
      "Cloud Security",
      "Risk Management",
      "Incident Response",
      "Data Protection",
    ],
  },
  {
    id: "bsc-info-systems",
    degree: "Bachelor's Degree, Information Systems",
    levelBadge: "Bachelor's · BSc",
    institution: "Uniamérica",
    period: "Jan 2022 – Dec 2025",
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

// ==========================================
// HELPER COMPONENTS
// ==========================================
const SignalStrength = ({ difficulty }) => {
  const getBars = () => {
    switch (difficulty) {
      case "easy":
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Easy">
            <div className="w-1.5 h-2 rounded-sm bg-green-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-white/10"></div>
            <div className="w-1.5 h-4 rounded-sm bg-white/10"></div>
          </div>
        );
      case "medium":
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Medium">
            <div className="w-1.5 h-2 rounded-sm bg-yellow-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-yellow-500"></div>
            <div className="w-1.5 h-4 rounded-sm bg-white/10"></div>
          </div>
        );
      case "hard":
        return (
          <div className="flex items-end gap-0.5" title="Difficulty: Hard">
            <div className="w-1.5 h-2 rounded-sm bg-red-500"></div>
            <div className="w-1.5 h-3 rounded-sm bg-red-500"></div>
            <div className="w-1.5 h-4 rounded-sm bg-red-500"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getDifficultyLabel = () => {
    if (difficulty === "easy")
      return (
        <span className="text-green-400 text-xs font-semibold uppercase">
          Easy
        </span>
      );
    if (difficulty === "medium")
      return (
        <span className="text-yellow-400 text-xs font-semibold uppercase">
          Medium
        </span>
      );
    return (
      <span className="text-red-400 text-xs font-semibold uppercase">Hard</span>
    );
  };

  return (
    <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-md border border-white/5">
      {getBars()}
      {getDifficultyLabel()}
    </div>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================
const PortfolioPage = () => {
  const [activeStack, setActiveStack] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [expandedCompass, setExpandedCompass] = useState(true);

  // Helper lookup functions
  const getTechById = (id) => techStack.find((t) => t.id === id);
  const getCertById = (id) => certifications.find((c) => c.id === id);

  // Close modals with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveStack(null);
        setActiveCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen font-sans mt-20">
      <main className="px-4 pt-12 pb-24 relative z-20 flex flex-col items-center">
        {/* === HERO SECTION === */}
        <div className="text-center mb-12 flex flex-col items-center max-w-3xl">
          <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105 z-20 bg-white/5">
            <img
              src={PROFILE_IMAGE_URL}
              alt="Paulo Tenório"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-md"
              >
                <path
                  d="M 0 50 A 50 50 0 0 0 100 50 L 86 50 A 36 36 0 0 1 14 50 Z"
                  fill="#008139"
                  opacity="0.95"
                />
                <path
                  id="text-path"
                  d="M 7 50 A 43 43 0 0 0 93 50"
                  fill="none"
                />
                <text
                  fontSize="8.5"
                  fontWeight="bold"
                  fill="white"
                  letterSpacing="0.8"
                >
                  <textPath
                    href="#text-path"
                    startOffset="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    #OPENTOWORK
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 glowing-text tracking-tight">
            Paulo Tenório
          </h1>
          <h2 className="text-lg md:text-xl text-gray-400 font-semibold mb-6">
            Senior Backend Engineer & Cloud Architect
          </h2>
          <p className="text-gray-300 text-base md:text-lg mx-auto leading-relaxed mb-8">
            I'm building a space to share my journey, my projects, and the
            things that make me, me. Delivering scalable software solutions and
            robust backend ecosystems for modern businesses.
          </p>

          {/* === QUICK BADGES === */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-gray-200 flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Open to Work (Remote / Europe / UK)
            </div>

            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-blue-400 flex items-center gap-2 shadow-lg">
              <i className="fas fa-laptop-code"></i>
              5+ Years of Experience
            </div>

            <div className="bg-[#121826] border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-yellow-500 flex items-center gap-2 shadow-lg">
              <i className="fas fa-user-shield"></i>
              BSc Info Systems & MBA Cybersecurity
            </div>
          </div>

          {/* === SOCIAL LINKS === */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://github.com/FtxTenorio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <i className="fab fa-github text-lg text-gray-300 hover:text-white"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ftxtenorio/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <i className="fab fa-linkedin text-lg text-gray-300 hover:text-white"></i>
            </a>
            <a
              href="https://www.instagram.com/ftxtenorio/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 hover:bg-pink-700 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <i className="fab fa-instagram text-lg text-gray-300 hover:text-white"></i>
            </a>
          </div>
        </div>

        {/* === SECTION 1: CAREER & EVOLUTION TRAJECTORY === */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-20">
          <div className="flex flex-col items-center justify-center mb-10 border-b border-white/10 pb-4 w-full text-center">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-sm"></span>
              Career, Arsenal & Certification Trajectory
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              How my technical stack and cloud certifications evolved across
              every company I worked with (click any badge for details)
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative w-full pl-6 md:pl-8 border-l-2 border-white/10 space-y-12">
            {careerTrajectory.map((job) => (
              <div key={job.id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0b0f19] transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: job.accentColor }}
                ></div>

                {/* Experience Card */}
                <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 md:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {job.role}
                        </h3>
                        {job.isCurrent && (
                          <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-300 font-medium">
                        <span
                          style={{ color: job.accentColor }}
                          className="font-bold"
                        >
                          {job.company}
                        </span>
                        {job.badgeNote && (
                          <span className="bg-white/5 border border-white/10 text-gray-300 text-[11px] px-2 py-0.5 rounded-md">
                            {job.badgeNote}
                          </span>
                        )}
                        <span className="text-gray-500">•</span>
                        <span className="text-xs text-gray-400">
                          {job.employmentType}
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0">
                      <div className="text-xs md:text-sm font-semibold text-gray-200">
                        {job.period}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {job.duration} · {job.location}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-300 text-xs md:text-sm mt-4 leading-relaxed">
                    {job.summary}
                  </p>

                  {/* Bullet Highlights */}
                  {job.highlights && (
                    <ul className="mt-4 space-y-2">
                      {job.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs md:text-sm text-gray-400 flex items-start gap-2.5 leading-relaxed"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: job.accentColor }}
                          ></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Multi-year Internal Progression (Compass.uol) */}
                  {job.milestones && (
                    <div className="mt-5">
                      <button
                        onClick={() => setExpandedCompass(!expandedCompass)}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-2 mb-3"
                      >
                        <i
                          className={`fas fa-chevron-${expandedCompass ? "down" : "right"} text-[10px]`}
                        ></i>
                        <span>
                          {expandedCompass
                            ? "Hide Yearly Evolution (2021 - 2025)"
                            : "Show Yearly Evolution (2021 - 2025)"}
                        </span>
                      </button>

                      {expandedCompass && (
                        <div className="space-y-4 pl-3 md:pl-4 border-l border-amber-500/30 mt-2">
                          {job.milestones.map((ms, idx) => (
                            <div
                              key={idx}
                              className="bg-black/25 border border-white/5 rounded-xl p-4"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                                  {ms.year}
                                </span>
                                <h4 className="text-xs md:text-sm font-bold text-white flex-1">
                                  {ms.title}
                                </h4>
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                {ms.details}
                              </p>

                              {/* Unlocked Tech or Certs in this specific year */}
                              <div className="flex flex-wrap items-center gap-2">
                                {ms.unlocked.map((techId) => {
                                  const tech = getTechById(techId);
                                  if (!tech) return null;
                                  return (
                                    <button
                                      key={tech.id}
                                      onClick={() => setActiveStack(tech)}
                                      className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-md text-[11px] text-blue-300 transition-colors"
                                      title="Unlocked in this year — click for details"
                                    >
                                      <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className="w-3.5 h-3.5"
                                      />
                                      <span>+ {tech.name}</span>
                                    </button>
                                  );
                                })}

                                {ms.certs.map((certId) => {
                                  const cert = getCertById(certId);
                                  if (!cert) return null;
                                  return (
                                    <button
                                      key={cert.id}
                                      onClick={() => setActiveCert(cert)}
                                      className="flex items-center gap-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 px-2.5 py-1 rounded-md text-[11px] text-yellow-300 transition-colors"
                                      title="Certification earned in this year — click for details"
                                    >
                                      <img
                                        src={cert.img}
                                        alt={cert.name}
                                        className="w-4 h-4 object-contain"
                                      />
                                      <span>Earned: {cert.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer: Company Arsenal & Certifications */}
                  <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Arsenal */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Company Tech Arsenal
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {job.activeStack.map((techId) => {
                          const tech = getTechById(techId);
                          if (!tech) return null;
                          const isUnlockedHere =
                            job.unlockedStack.includes(techId);
                          return (
                            <button
                              key={tech.id}
                              onClick={() => setActiveStack(tech)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 hover:scale-105 ${
                                isUnlockedHere
                                  ? "bg-[#0078d7]/15 border-[#0078d7]/50 text-white"
                                  : "bg-black/30 border-white/10 text-gray-300 hover:border-white/30"
                              }`}
                            >
                              <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-4 h-4"
                              />
                              <span>{tech.name}</span>
                              {isUnlockedHere && (
                                <span className="text-[9px] text-blue-400 font-mono">
                                  ({tech.startedYear})
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Certifications Earned or Leveraged */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Certifications Earned & Applied
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {job.certsEarned.map((certId) => {
                          const cert = getCertById(certId);
                          if (!cert) return null;
                          return (
                            <button
                              key={cert.id}
                              onClick={() => setActiveCert(cert)}
                              className="flex items-center gap-1.5 bg-[#ffc000]/15 border border-[#ffc000]/50 text-yellow-200 px-2.5 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-transform"
                            >
                              <img
                                src={cert.img}
                                alt={cert.name}
                                className="w-4 h-4 object-contain"
                              />
                              <span>{cert.name}</span>
                              <span className="text-[9px] bg-[#ffc000]/20 text-yellow-300 px-1 rounded uppercase font-bold">
                                Earned
                              </span>
                            </button>
                          );
                        })}

                        {job.certsApplied.map((certId) => {
                          const cert = getCertById(certId);
                          if (!cert) return null;
                          return (
                            <button
                              key={cert.id}
                              onClick={() => setActiveCert(cert)}
                              className="flex items-center gap-1.5 bg-black/30 border border-white/10 hover:border-[#ffc000]/40 text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-all"
                            >
                              <img
                                src={cert.img}
                                alt={cert.name}
                                className="w-4 h-4 object-contain"
                              />
                              <span>{cert.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === SECTION 2: ACADEMIC BACKGROUND === */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-20">
          <div className="flex flex-col items-center justify-center mb-10 border-b border-white/10 pb-4 w-full text-center">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-5 bg-purple-500 rounded-sm"></span>
              Academic Background
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Formal education combining Information Systems foundation with
              Cybersecurity specialization
            </p>
          </div>

          <div className="relative w-full pl-6 md:pl-8 border-l-2 border-white/10 space-y-8">
            {educationList.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0b0f19] transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: edu.accentColor }}
                ></div>

                {/* Education Card */}
                <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 md:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <i
                          className={`fas ${edu.icon} text-purple-400 text-base`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                          {edu.degree}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-medium">
                          <span
                            style={{ color: edu.accentColor }}
                            className="font-bold"
                          >
                            {edu.institution}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-md">
                            {edu.levelBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0 pl-13 md:pl-0">
                      <div className="text-xs md:text-sm font-semibold text-gray-200">
                        {edu.period}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {edu.duration} · Completed
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-300 text-xs md:text-sm mt-4 leading-relaxed">
                    {edu.summary}
                  </p>

                  {/* Core Focus Pills */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                      Core Curriculum & Focus Areas
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {edu.focusTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="bg-black/30 border border-white/10 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: edu.accentColor }}
                          ></span>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === SECTION 3: SIDE-BY-SIDE ARSENAL & CERTIFICATIONS SUMMARY === */}
        <div className="w-full max-w-4xl flex flex-col items-center mb-12">
          <div className="flex flex-col items-center justify-center mb-10 border-b border-white/10 pb-4 w-full text-center">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#0078d7] rounded-sm"></span>
              Consolidated Arsenal & Credentials
              <span className="w-1.5 h-5 bg-[#ffc000] rounded-sm"></span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Quick overview of all technologies and official certifications
              accumulated along the journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* LEFT COLUMN: TECH ARSENAL SUMMARY CARD */}
            <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0078d7]"></span>
                      Tech Arsenal
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Click any stack item to inspect technical scope
                    </p>
                  </div>
                  <span className="bg-[#0078d7]/15 border border-[#0078d7]/40 text-blue-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {techStack.length} Technologies
                  </span>
                </div>

                {/* Compact Stack Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {techStack.map((stack) => (
                    <button
                      key={stack.id}
                      onClick={() => setActiveStack(stack)}
                      className="bg-black/30 hover:bg-[#1a2235] border border-white/10 hover:border-[#0078d7]/50 rounded-xl p-3 flex items-center justify-between transition-all duration-200 group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={stack.icon}
                          alt={stack.name}
                          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <div className="text-xs font-bold text-gray-200 group-hover:text-white">
                            {stack.name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            Since {stack.startedYear}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold bg-[#0078d7]/15 text-blue-300 border border-[#0078d7]/30 px-2 py-0.5 rounded-md">
                        {stack.years} {stack.years === 1 ? "yr" : "yrs"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                <span>Primary Focus: Backend & Cloud IaC</span>
                <span className="text-blue-400 font-mono">2021 — Present</span>
              </div>
            </div>

            {/* RIGHT COLUMN: CERTIFICATIONS SUMMARY CARD */}
            <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffc000]"></span>
                      Certifications
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Click any credential to inspect validation details
                    </p>
                  </div>
                  <span className="bg-[#ffc000]/15 border border-[#ffc000]/40 text-yellow-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {certifications.length} Verified
                  </span>
                </div>

                {/* Compact Certifications List */}
                <div className="space-y-2.5">
                  {certifications.map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setActiveCert(cert)}
                      className="w-full bg-black/30 hover:bg-[#1a2235] border border-white/10 hover:border-[#ffc000]/50 rounded-xl p-2.5 px-3 flex items-center justify-between transition-all duration-200 group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cert.img}
                          alt={cert.name}
                          className="w-9 h-9 object-contain shrink-0 group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <div className="text-xs font-bold text-gray-200 group-hover:text-white leading-tight">
                            {cert.name}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            {cert.issuer}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-yellow-400/90 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                          {cert.yearEarned}
                        </span>
                        <i className="fas fa-chevron-right text-[10px] text-gray-500 group-hover:text-[#ffc000] transition-colors"></i>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Credly Link Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 flex justify-end">
                <a
                  href="https://link.itenorio.com/CREDLY"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#ffc000] text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 text-xs group"
                >
                  <span>Verify All Badges on Credly</span>
                  <i className="fas fa-external-link-alt text-[#ffc000] group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          GLOBAL MODALS
          ========================================== */}

      {/* TECH STACK MODAL */}
      {activeStack && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveStack(null)}
        >
          <div
            className="bg-[#121826] border border-white/10 max-w-sm w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStack(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <div className="flex items-center gap-4 mb-5 pr-6">
              <img
                src={activeStack.icon}
                alt={activeStack.name}
                className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {activeStack.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="inline-block bg-[#0078d7]/20 border border-[#0078d7]/30 text-[#0078d7] text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                    {activeStack.years}{" "}
                    {activeStack.years === 1 ? "Year" : "Years"} Exp.
                  </span>
                  <span className="inline-block bg-white/5 border border-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-md font-mono">
                    Started in {activeStack.startedYear}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-4">
              <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-2 text-left">
                Technical Scope
              </h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-left">
                {activeStack.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATION MODAL */}
      {activeCert && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="bg-[#121826] border border-white/10 max-w-md w-full rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left border-b border-white/5 pb-5 pt-2 sm:pt-0">
              <img
                src={activeCert.img}
                alt={activeCert.name}
                className="h-16 w-16 md:h-20 md:w-20 object-contain shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded">
                  Issued in {activeCert.yearEarned} · {activeCert.issuer}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-2">
                  {activeCert.name}
                </h3>
                <div className="flex justify-center sm:justify-start">
                  <SignalStrength difficulty={activeCert.difficulty} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase text-[#ffc000] tracking-wider mb-1 text-left">
                  What it means
                </h4>
                <p className="text-gray-200 text-xs md:text-sm leading-relaxed text-left">
                  {activeCert.meaning}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1 text-left">
                  Requirements
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-left">
                  {activeCert.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap");

        .glowing-text {
          text-shadow:
            0 0 15px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        :global(.animate-fade-in) {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
