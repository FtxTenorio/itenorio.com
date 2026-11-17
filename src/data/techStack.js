import { ASSETS_BASE_URL } from "./config";

// Icons that aren't in our asset bucket come from Devicon (pinned version).
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

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
  {
    id: "mongodb",
    name: "MongoDB",
    years: 4,
    startedYear: 2022,
    icon: `${DEVICON}/mongodb/mongodb-original.svg`,
    description:
      "Document modeling and aggregation pipelines for high-volume data, including the delivery metrics monitoring evolved at iFood.",
  },
  {
    id: "redis",
    name: "Redis",
    years: 4,
    startedYear: 2022,
    icon: `${DEVICON}/redis/redis-original.svg`,
    description:
      "In-memory caching, rate limiting and short-lived state for microservices, cutting database load and response times.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    years: 2,
    startedYear: 2024,
    icon: `${DEVICON}/kubernetes/kubernetes-original.svg`,
    description:
      "Deploying and operating containerized services: deployments, services, ingress, config and secrets, autoscaling and rolling updates.",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    years: 2,
    startedYear: 2024,
    icon: `${DEVICON}/prometheus/prometheus-original.svg`,
    description:
      "Metrics collection and alerting for services in production: instrumenting APIs, writing PromQL queries and alert rules.",
  },
  {
    id: "grafana",
    name: "Grafana",
    years: 2,
    startedYear: 2024,
    icon: `${DEVICON}/grafana/grafana-original.svg`,
    description:
      "Observability dashboards on top of Prometheus and other sources, giving teams a live view of latency, errors and throughput.",
  },
];

export const getTechById = (id) => techStack.find((tech) => tech.id === id);
