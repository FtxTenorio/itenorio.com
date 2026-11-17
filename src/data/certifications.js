import { ASSETS_BASE_URL } from "./config";

export const certifications = [
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

// Next certifications, being studied for now (target year). Shown as the
// next column of the career certifications timeline, apart from the earned
// ones above, so they never count as credentials.
export const studyingFor = {
  year: 2027,
  certs: [
    {
      id: "aws-sap",
      name: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services",
      level: "Professional",
      icon: "fa-sitemap",
    },
    {
      id: "aws-dop",
      name: "AWS DevOps Engineer Professional",
      issuer: "Amazon Web Services",
      level: "Professional",
      icon: "fa-infinity",
    },
    {
      id: "aws-soa",
      name: "AWS SysOps Administrator",
      issuer: "Amazon Web Services",
      level: "Associate",
      icon: "fa-server",
    },
    {
      id: "aws-scs",
      name: "AWS Security Specialty",
      issuer: "Amazon Web Services",
      level: "Specialty",
      icon: "fa-shield-halved",
    },
  ],
};

export const getCertById = (id) =>
  certifications.find((cert) => cert.id === id);
