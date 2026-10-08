/**
 * Skill Normalization & Synonym Canonicalization Engine
 * Maps technology variants and acronyms to canonical industry standards.
 * Prevents blind exact-string mismatching.
 */

export const SKILL_SYNONYM_MAP: Record<string, string> = {
  // JavaScript / TypeScript ecosystem
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ecmascript': 'JavaScript',
  'next': 'Next.js',
  'nextjs': 'Next.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',

  // Go
  'go': 'Go (Golang)',
  'golang': 'Go (Golang)',
  'go language': 'Go (Golang)',

  // Python
  'python': 'Python',
  'py': 'Python',
  'fastapi': 'FastAPI',
  'django': 'Django',
  'flask': 'Flask',

  // Cloud & Infrastructure
  'aws': 'AWS',
  'aws cloud': 'AWS',
  'amazon web services': 'AWS',
  'ecs': 'AWS (ECS)',
  'eks': 'AWS (EKS)',
  's3': 'AWS (S3)',
  'rds': 'AWS (RDS)',
  'gcp': 'Google Cloud Platform (GCP)',
  'google cloud': 'Google Cloud Platform (GCP)',
  'google cloud platform': 'Google Cloud Platform (GCP)',
  'azure': 'Microsoft Azure',
  'docker': 'Docker',
  'containerization': 'Docker',
  'k8s': 'Kubernetes',
  'kubernetes': 'Kubernetes',
  'helm': 'Helm',
  'terraform': 'Terraform',
  'iac': 'Infrastructure as Code (Terraform)',

  // Databases & Storage
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'psql': 'PostgreSQL',
  'mysql': 'MySQL',
  'redis': 'Redis',
  'redis cache': 'Redis',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'cassandra': 'Apache Cassandra',
  'dynamodb': 'DynamoDB',

  // Messaging & Streams
  'kafka': 'Apache Kafka',
  'apache kafka': 'Apache Kafka',
  'rabbitmq': 'RabbitMQ',
  'sqs': 'AWS SQS',
  'pubsub': 'Google Cloud Pub/Sub',

  // Architecture & Protocols
  'grpc': 'gRPC',
  'rest': 'REST APIs',
  'restful': 'REST APIs',
  'graphql': 'GraphQL',
  'microservices': 'Microservices Architecture',
  'distributed systems': 'Distributed Systems & Concurrency',
  'concurrency': 'Concurrency & Multithreading',
  'system design': 'System Design & High-Level Architecture',
  'hld': 'High-Level Design (HLD)',
  'lld': 'Low-Level Design (LLD)',
  'machine coding': 'Machine Coding',

  // Observability & CI/CD
  'opentelemetry': 'OpenTelemetry Tracing',
  'otel': 'OpenTelemetry Tracing',
  'prometheus': 'Prometheus & Metrics',
  'grafana': 'Grafana',
  'datadog': 'Datadog',
  'ci/cd': 'CI/CD Pipelines',
  'github actions': 'GitHub Actions CI/CD',
};

/**
 * Normalizes an arbitrary skill name to its canonical standard.
 */
export function normalizeSkillName(rawSkill: string): string {
  if (!rawSkill) return '';
  const trimmed = rawSkill.trim();
  const lower = trimmed.toLowerCase().replace(/[-_]/g, ' ');

  // Direct lookup
  if (SKILL_SYNONYM_MAP[lower]) {
    return SKILL_SYNONYM_MAP[lower];
  }

  // Substring / word boundary matches
  for (const [alias, canonical] of Object.entries(SKILL_SYNONYM_MAP)) {
    if (lower === alias || lower.startsWith(alias + ' ') || lower.endsWith(' ' + alias)) {
      return canonical;
    }
  }

  return trimmed;
}

/**
 * Checks whether two skill descriptors represent the same underlying technology.
 */
export function areSkillsEquivalent(skillA: string, skillB: string): boolean {
  if (!skillA || !skillB) return false;
  const canonicalA = normalizeSkillName(skillA).toLowerCase();
  const canonicalB = normalizeSkillName(skillB).toLowerCase();

  if (canonicalA === canonicalB) return true;

  // Substring checks for compound skills e.g. "AWS (ECS)" matches "AWS"
  if (canonicalA.includes(canonicalB) || canonicalB.includes(canonicalA)) {
    return true;
  }

  return false;
}
