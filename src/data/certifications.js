import { ASSETS_BASE_URL } from "./config.js";

// Oldest first (issue dates from Credly); names are the official ones.
export const certifications = [
  {
    id: "aws-clf",
    name: "AWS Certified Cloud Practitioner",
    shortName: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    level: "Foundational",
    yearEarned: 2023,
    issuedOn: "Jun 2023",
    difficulty: "easy",
    credlyUrl: "https://www.credly.com/badges/04fe4099-27e4-4f43-854a-f26cca915782",
    img: `${ASSETS_BASE_URL}/cert-aws-cloud-practitioner.png`,
    meaning:
      "Foundational credential proving a holistic and general view of the entire AWS ecosystem and terminology.",
    details:
      "Ideal for solidifying concepts of billing, support, global security, and basic cloud architecture before advancing to highly specialized tracks.",
  },
  {
    id: "aws-dva",
    name: "AWS Certified Developer – Associate",
    shortName: "AWS Developer – Associate",
    issuer: "Amazon Web Services",
    level: "Associate",
    yearEarned: 2024,
    issuedOn: "Feb 2024",
    difficulty: "medium",
    credlyUrl: "https://www.credly.com/badges/e644bbc5-4790-4eb9-a59a-b4063652ecf9",
    img: `${ASSETS_BASE_URL}/cert-aws-associate.png`,
    meaning:
      "Validates the ability to develop, deploy and debug cloud applications on AWS.",
    details:
      "Focuses on building with AWS services day to day: Lambda, API Gateway, DynamoDB, SQS/SNS, CI/CD with the AWS developer tools, IAM-based security and monitoring with CloudWatch and X-Ray.",
  },
  {
    id: "aws-ai",
    name: "AWS Certified AI Practitioner",
    shortName: "AWS AI Practitioner",
    issuer: "Amazon Web Services",
    level: "Foundational",
    yearEarned: 2024,
    issuedOn: "Dec 2024 · Early Adopter",
    difficulty: "easy",
    credlyUrl: "https://www.credly.com/badges/998e76e9-f45c-4306-b06d-9fa19e618b77",
    img: `${ASSETS_BASE_URL}/cert-aws-ai-practitioner.png`,
    meaning:
      "Certifies understanding of Artificial Intelligence, Machine Learning concepts, and native AWS generative AI services.",
    details:
      "Covers practical use of tools like Amazon Bedrock, SageMaker, and language models, preparing professionals to align AI capabilities with business demands. Earned in the exam's beta period (Early Adopter badge).",
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    shortName: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    level: "Associate",
    yearEarned: 2025,
    issuedOn: "Jan 2025",
    difficulty: "medium",
    credlyUrl: "https://www.credly.com/badges/66a3bad7-7931-49a2-ac63-9be060a678bc",
    img: `${ASSETS_BASE_URL}/cert-aws-solutions-architect.png`,
    meaning:
      "Validates the ability to design secure, resilient, high-performing and cost-optimized architectures on AWS, following the Well-Architected Framework.",
    details:
      "Covers choosing the right compute, storage, database and networking services for a workload, designing for high availability and fault tolerance across Availability Zones, securing access with IAM and VPC design, and keeping costs under control.",
  },
  {
    id: "terraform-assoc",
    name: "HashiCorp Certified: Terraform Associate (003)",
    shortName: "Terraform Associate",
    issuer: "HashiCorp",
    level: "Associate",
    yearEarned: 2025,
    issuedOn: "Jun 2025",
    difficulty: "medium",
    credlyUrl: "https://www.credly.com/badges/cd8dab93-a9b7-49cc-a7bc-d28949559a72",
    img: `${ASSETS_BASE_URL}/cert-terraform-associate.png`,
    meaning:
      "Official HashiCorp certification validating mastery of open-source Infrastructure as Code (IaC) concepts.",
    details:
      "Ensures the professional understands HCL file structure, state management (state files), creation of reusable modules, and secure execution of workflows via the Terraform CLI.",
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
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      level: "Professional",
      icon: "fa-sitemap",
    },
    {
      id: "aws-dop",
      name: "AWS Certified DevOps Engineer – Professional",
      issuer: "Amazon Web Services",
      level: "Professional",
      icon: "fa-infinity",
    },
    {
      id: "aws-soa",
      name: "AWS Certified SysOps Administrator – Associate",
      issuer: "Amazon Web Services",
      level: "Associate",
      icon: "fa-server",
    },
    {
      id: "aws-scs",
      name: "AWS Certified Security – Specialty",
      issuer: "Amazon Web Services",
      level: "Specialty",
      icon: "fa-shield-halved",
    },
  ],
};

export const getCertById = (id) =>
  certifications.find((cert) => cert.id === id);
