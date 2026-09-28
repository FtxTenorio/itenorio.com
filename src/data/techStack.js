import { ASSETS_BASE_URL } from "./config";

export const techStack = [
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

export const getTechById = (id) => techStack.find((tech) => tech.id === id);
