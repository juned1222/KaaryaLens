import { AnalysisResult, CandidateProfile, RoleInput, InterviewSession } from '../types';

export const EMPTY_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'empty-candidate',
  name: null,
  email: null,
  currentLocation: null,
  location: null,
  headline: null,
  summary: null,
  yearsOfExperience: null,
  targetRole: null,
  education: [],
  experience: [],
  skills: [],
  claimedSkills: [],
  projects: [],
  links: { github: undefined, portfolio: undefined, linkedin: undefined },
  githubRepos: [],
  updatedAt: '',
};

export const SEED_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'cand-001',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@example.com',
  currentLocation: 'Bengaluru, Karnataka',
  location: 'Bengaluru, Karnataka',
  headline: 'Software Engineer | Node.js, TypeScript, Go & Distributed Microservices',
  summary: 'Full-stack & backend developer with 2.5 years of experience building scalable REST/gRPC APIs, PostgreSQL backends, and responsive React web interfaces. Active open-source contributor.',
  yearsOfExperience: 2.5,
  targetRole: 'Backend Engineer / SDE-2',
  education: [
    { degree: 'B.Tech in Computer Science', institution: 'PES University, Bengaluru', year: '2023' }
  ],
  experience: [
    { company: 'HyperTrack Technologies', role: 'Backend Engineer', period: '2023 - Present', highlights: ['Built real-time telemetry ingestion pipelines in Go and Kafka', 'Optimized PostgreSQL connection pooling and indexing'] }
  ],
  skills: ['Go (Golang)', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker'],
  certifications: ['AWS Certified Solutions Architect - Associate (2024)'],
  achievements: ['Won Bengaluru Hackathon 2024 for high-throughput messaging engine'],
  internships: [
    { company: 'Razorpay Sandbox', role: 'Software Engineering Intern', period: 'Jan 2023 - Jun 2023' }
  ],
  links: {
    github: 'https://github.com/arjunmehta-dev',
    portfolio: 'https://arjunmehta.dev',
    linkedin: 'https://linkedin.com/in/arjunmehta-dev'
  },
  githubUsername: 'arjunmehta-dev',
  claimedSkills: [
    { name: 'TypeScript', claimedLevel: 'Advanced', source: 'resume' },
    { name: 'Node.js', claimedLevel: 'Advanced', source: 'resume' },
    { name: 'Go (Golang)', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'PostgreSQL', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'Redis', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'AWS (ECS, S3, RDS)', claimedLevel: 'Advanced', source: 'resume' },
    { name: 'Docker & Kubernetes', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'React', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'System Design & Concurrency', claimedLevel: 'Intermediate', source: 'resume' },
    { name: 'Apache Kafka', claimedLevel: 'Intermediate', source: 'resume' },
  ],
  projects: [
    {
      title: 'Distributed Event Ledger',
      tech: ['Go', 'Kafka', 'Redis', 'PostgreSQL'],
      description: 'High-throughput transactional ledger handling 4,500 msg/sec with idempotency checks and partitioned Kafka topics.',
      repoUrl: 'https://github.com/arjunmehta-dev/distributed-event-ledger',
      liveUrl: 'https://ledger-demo.arjun.dev',
    },
    {
      title: 'DevPulse — Developer Metrics Platform',
      tech: ['TypeScript', 'Node.js', 'React', 'Docker'],
      description: 'Internal developer velocity dashboard aggregating PR cycle times and deploy frequencies across 14 services.',
      repoUrl: 'https://github.com/arjunmehta-dev/devpulse',
    },
  ],
  githubRepos: [
    {
      name: 'distributed-event-ledger',
      description: 'Fault-tolerant event stream processor written in Golang using Sarama and pgx connection pooling.',
      language: 'Go',
      stars: 42,
      topics: ['golang', 'kafka', 'distributed-systems', 'event-sourcing'],
      updatedAt: '2026-03-15T10:00:00Z',
      htmlUrl: 'https://github.com/arjunmehta-dev/distributed-event-ledger',
    },
    {
      name: 'devpulse',
      description: 'Engineering KPI tracker built with Express, TypeScript, and Tailwind CSS.',
      language: 'TypeScript',
      stars: 18,
      topics: ['typescript', 'nodejs', 'dashboard'],
      updatedAt: '2026-02-28T14:30:00Z',
      htmlUrl: 'https://github.com/arjunmehta-dev/devpulse',
    },
    {
      name: 'mini-redis-clone',
      description: 'In-memory key-value store with RESP protocol implementation in Go.',
      language: 'Go',
      stars: 64,
      topics: ['redis', 'tcp', 'concurrency'],
      updatedAt: '2026-01-20T08:15:00Z',
      htmlUrl: 'https://github.com/arjunmehta-dev/mini-redis-clone',
    },
  ],
  portfolioUrl: 'https://arjunmehta.dev',
  updatedAt: new Date().toISOString(),
};

export const SEED_ROLES: RoleInput[] = [
  {
    title: 'SDE-2 Backend Engineer',
    employer: 'Swiggy',
    location: 'Bengaluru, India (Hybrid)',
    experienceLevel: 'Mid-Level (3-5 yrs)',
    jdRaw: `About Swiggy:
Swiggy is India's leading on-demand convenience platform. We are seeking a high-caliber SDE-2 Backend Engineer for our Core Logistics & Order Dispatch Platform.

Key Responsibilities:
- Design, build, and maintain low-latency, mission-critical distributed services handling peak traffic (100k+ orders/min).
- Own end-to-end architecture across microservices built in Go and Java/Kotlin with PostgreSQL and Redis.
- Scale real-time order dispatch pipelines using Apache Kafka and distributed locking mechanisms.
- Deploy and monitor production workloads on AWS (EKS, Aurora, CloudWatch).
- Collaborate with product and data science teams to optimize dynamic delivery partner dispatch.

Requirements:
- 2 to 4 years of hands-on experience in backend engineering.
- Proficient in Golang, Java, or Node.js with strong mastery of data structures and concurrency.
- Deep hands-on experience with relational databases (PostgreSQL/MySQL) query tuning and indexing.
- Solid understanding of distributed systems patterns, cache invalidation, and asynchronous messaging (Kafka/RabbitMQ).
- Familiarity with cloud platforms (AWS preferred) and containerized deployments (Docker/Kubernetes).
- Bachelor's degree in Computer Science or equivalent practical experience.`,
  },
  {
    title: 'Full Stack Engineer',
    employer: 'Razorpay',
    location: 'Bengaluru, India',
    experienceLevel: 'Junior (1-3 yrs)',
    jdRaw: `Razorpay is India's premier payments and financial services platform. We empower millions of businesses to accept, process, and disburse payments effortlessly.

What You Will Do:
- Build merchant checkout experiences and developer dashboard interfaces using React, TypeScript, and modern state management.
- Develop robust, PCI-DSS compliant microservices in Node.js and Go.
- Optimize web performance, achieving sub-second first-contentful paint across diverse Indian network conditions.
- Work with MySQL/PostgreSQL, Redis caches, and webhook ingestion engines.

Must Have:
- 1.5 to 3 years building consumer-facing web apps and APIs.
- Strong proficiency in modern JavaScript/TypeScript and React.
- Solid understanding of backend REST/GraphQL architecture and relational databases.
- Keen eye for detail, clean architecture, and automated testing (Jest, Cypress).`,
  },
  {
    title: 'Junior Backend Developer',
    employer: 'Zepto',
    location: 'Mumbai / Remote India',
    experienceLevel: 'Fresher (0-1 yr)',
    jdRaw: `Zepto is revolutionizing 10-minute quick commerce across India. We are looking for energetic Junior Backend Developers to join our Dark Store Fulfillment engineering team.

Responsibilities:
- Write clean, maintainable TypeScript / Python / Go code for inventory allocation and picker optimization.
- Write unit and integration tests; participate in peer code reviews.
- Maintain PostgreSQL database migrations and Redis operational keys.
- Debug production alerts and implement telemetry with Datadog/Prometheus.

Qualifications:
- 0 to 1 year of software engineering experience or relevant internships.
- Strong foundational grasp of CS fundamentals: OOP, DBMS, OS, and Data Structures.
- Hands-on personal projects or contributions on GitHub.
- Eagerness to learn in an intense, high-velocity Indian startup environment.`,
  },
];

export const SEED_ANALYSIS_RESULT: AnalysisResult = {
  id: 'analysis-swiggy-sde2',
  roleId: 'role-swiggy-01',
  roleTitle: 'SDE-2 Backend Engineer',
  employer: 'Swiggy',
  location: 'Bengaluru, India (Hybrid)',
  experienceLevel: 'Mid-Level (3-5 yrs)',
  candidateProfile: SEED_CANDIDATE_PROFILE,
  readinessScore: 78,
  skillFitScore: 82,
  evidenceScore: 74,
  projectFitScore: 80,
  interviewReadinessScore: 75,
  consistencyScore: 82,
  scoreBreakdown: {
    skillFitScore: 82,
    skillFitWeight: 0.40,
    evidenceScore: 74,
    evidenceWeight: 0.25,
    projectFitScore: 80,
    projectFitWeight: 0.15,
    interviewReadinessScore: 75,
    interviewReadinessWeight: 0.15,
    consistencyScore: 82,
    consistencyWeight: 0.05,
    finalReadinessScore: 78,
    formulaDescription: 'Deterministic calculation: (82 × 40%) + (74 × 25%) + (80 × 15%) + (75 × 15%) + (82 × 5%) = 78',
  },
  matchedSkills: [
    {
      skill: 'Go (Golang)',
      requiredImportance: 'Must-Have',
      status: 'Matched',
      claimedLevel: 'Intermediate',
      evidenceFound: '2 verified GitHub repositories: distributed-event-ledger (42 stars, Go 1.22) and mini-redis-clone (64 stars, RESP protocol).',
      evidenceStrength: 'Strong',
      evidencePercentage: 92,
      verificationStatus: 'Evidence strong',
      notes: 'Direct code evidence demonstrates goroutines, channels, and connection pooling in production patterns.',
    },
    {
      skill: 'Apache Kafka',
      requiredImportance: 'Must-Have',
      status: 'Matched',
      claimedLevel: 'Intermediate',
      evidenceFound: 'Implemented partitioned consumer groups and idempotency handling in distributed-event-ledger.',
      evidenceStrength: 'Strong',
      evidencePercentage: 88,
      verificationStatus: 'Evidence strong',
      notes: 'Matches Swiggy dispatch streaming requirement closely.',
    },
    {
      skill: 'PostgreSQL & Query Optimization',
      requiredImportance: 'Must-Have',
      status: 'Matched',
      claimedLevel: 'Intermediate',
      evidenceFound: 'Applied schema migrations and indexes in distributed-event-ledger with pgx driver.',
      evidenceStrength: 'Moderate',
      evidencePercentage: 75,
      verificationStatus: 'Evidence moderate',
      notes: 'Has solid relational schema experience; recommend deepening knowledge of EXPLAIN ANALYZE for heavy read/write partitions.',
    },
    {
      skill: 'Redis In-Memory Caching',
      requiredImportance: 'Must-Have',
      status: 'Matched',
      claimedLevel: 'Intermediate',
      evidenceFound: 'Built a standalone mini-redis-clone implementing TCP networking and in-memory key-value eviction.',
      evidenceStrength: 'Strong',
      evidencePercentage: 90,
      verificationStatus: 'Evidence strong',
      notes: 'High-signal proof of internal data structures (SkipList, Hash maps).',
    },
  ],
  partialSkills: [
    {
      skill: 'Docker & Kubernetes',
      requiredImportance: 'Good-to-Have',
      status: 'Partial',
      claimedLevel: 'Intermediate',
      evidenceFound: 'Dockerfile present in devpulse repo; no Kubernetes manifest or Helm charts found in public evidence.',
      evidenceStrength: 'Moderate',
      evidencePercentage: 55,
      verificationStatus: 'Evidence moderate',
      notes: 'Containerization basics demonstrated. Container orchestration (K8s pods, ingress, HPA) requires verification.',
    },
    {
      skill: 'High-Throughput Concurrency & Sharding',
      requiredImportance: 'Must-Have',
      status: 'Partial',
      claimedLevel: 'Intermediate',
      evidenceFound: 'Demonstrated in personal Go projects; limited commercial evidence at Swiggy scale (100k+ req/sec).',
      evidenceStrength: 'Moderate',
      evidencePercentage: 62,
      verificationStatus: 'Verification recommended',
      notes: 'Expected interview focus: distributed locking (Redlock), consensus, and backpressure.',
    },
  ],
  missingSkills: [
    {
      skill: 'AWS Production Infrastructure (EKS / Aurora)',
      requiredImportance: 'Must-Have',
      status: 'Missing',
      claimedLevel: 'Advanced (Claimed on resume)',
      evidenceFound: 'No Terraform/CloudFormation, AWS config, or deployed cloud architecture artifacts found in public code.',
      evidenceStrength: 'Limited',
      evidencePercentage: 35,
      verificationStatus: 'Claim not sufficiently supported',
      notes: 'Resume claims "Advanced AWS", but evidence only shows local container workflows. High risk of interviewer scrutiny.',
    },
    {
      skill: 'Distributed Observability & Telemetry (OpenTelemetry, Prometheus)',
      requiredImportance: 'Good-to-Have',
      status: 'Missing',
      claimedLevel: undefined,
      evidenceFound: 'No metrics instrumentation or tracing pipelines detected in sample repositories.',
      evidenceStrength: 'None',
      evidencePercentage: 15,
      verificationStatus: 'Unclaimed requirement',
      notes: 'Critical for SDE-2 operational on-call readiness at tier-1 Indian unicorns.',
    },
  ],
  claimEvidenceConflicts: [
    {
      skill: 'AWS Cloud Architecture',
      claimed: 'Advanced (ECS, S3, RDS)',
      evidence: 'No AWS Infrastructure-as-Code or deployed public cloud workloads found.',
      evidenceStrength: 'Limited',
      evidencePercentage: 35,
      recommendation: 'Verification recommended. Prepare to walk through specific AWS production incidents, VPC setup, or deploy a live Terraform-backed demo project.',
    },
    {
      skill: 'System Design at Scale',
      claimed: 'Intermediate (100k+ RPM)',
      evidence: 'Personal benchmark test recorded at 4,500 msg/sec on single instance.',
      evidenceStrength: 'Moderate',
      evidencePercentage: 58,
      recommendation: 'Evidence moderate. Candidate should articulate horizontal scaling, rate limiters (Token Bucket), and database read replica synchronization.',
    },
  ],
  indiaMarketLens: {
    locationContext: 'Bengaluru (Koramangala/Bellandur Tech Corridor)',
    tierClassification: 'Tier-1 Consumer Unicorn (High bar on Low-Level Design & Concurrency)',
    hiringBarExplanation: 'Swiggy SDE-2 loops focus intensely on Machine Coding (2 hrs live coding) and High-Level System Design (HLD) with live trade-off defense.',
    fresherRealities: 'For 2-3 years experience, Indian product hiring panels evaluate practical trade-offs (Kafka lag, DB deadlocks) over purely theoretical LeetCode puzzles.',
    roleSignalDisclaimer: 'Role-specific signal based on the supplied job description and verified public candidate artifacts.',
    estimatedCtcRange: '₹24L – ₹35L Base + ESOPs (Standard Bengaluru SDE-2 band)',
    topCompetencyPriorities: [
      'Machine Coding in Golang within 90 minutes',
      'Kafka partition rebalancing & poison pill prevention',
      'PostgreSQL query indexing & connection exhaustion',
      'Zero-downtime database migrations',
    ],
  },
  interviewFocusAreas: [
    'Concurrency & Race Condition Handling in Go Channels',
    'Kafka Event Delivery Semantics (At-least-once vs Exactly-once)',
    'Database Connection Pooling & Deadlock Recovery in PostgreSQL',
    'Defense of AWS Cloud Experience vs Actual Implementation Depth',
    'Design a Distributed Delivery Partner Matching Engine',
  ],
  careerPaths: [
    {
      id: 'path-1',
      title: 'Distributed Systems & Core Platform Engineer',
      fitPercentage: 86,
      gapCount: 2,
      requiredSkillGaps: ['Kubernetes Operators & Helm', 'Distributed Tracing (OpenTelemetry)'],
      milestones: {
        q1: 'Deploy a multi-node Go gRPC cluster on managed Kubernetes with Prometheus metrics.',
        q2: 'Implement consensus or Raft-based distributed lock manager with full test suite.',
      },
      suggestedProjects: [
        {
          name: 'Distributed Rate Limiter Service',
          description: 'Sliding-window counter implementation backed by Redis cluster and local in-memory Bloom filters.',
          techStack: ['Go', 'Redis Cluster', 'gRPC', 'Docker'],
        },
      ],
      thirtyDayPlan: [
        'Days 1-7: Refactor Go event ledger to emit OpenTelemetry spans and trace context.',
        'Days 8-15: Write Kubernetes manifests with horizontal pod autoscaler (HPA) triggers.',
        'Days 16-23: Implement idempotency deduplication table pattern in PostgreSQL.',
        'Days 24-30: Complete 3 timed Machine Coding problem sets simulating Swiggy/Razorpay rounds.',
      ],
    },
    {
      id: 'path-2',
      title: 'Full Stack Fintech Engineer',
      fitPercentage: 78,
      gapCount: 3,
      requiredSkillGaps: ['Payment Gateway Webhook Idempotency', 'React State Orchestration', 'PCI-DSS Compliance'],
      milestones: {
        q1: 'Build an end-to-end checkout flow integrating Razorpay sandbox with reconciliation worker.',
        q2: 'Ship a high-performance analytics dashboard for merchant transaction health.',
      },
      suggestedProjects: [
        {
          name: 'Idempotent Payment Ingestion Gateway',
          description: 'Resilient webhook listener handling out-of-order events with exponential backoff queues.',
          techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'BullMQ'],
        },
      ],
      thirtyDayPlan: [
        'Days 1-10: Connect React frontend with typed backend APIs and optimistic UI updates.',
        'Days 11-20: Study double-entry ledger architecture and database transaction isolation levels.',
        'Days 21-30: Build automated test suite covering race conditions during concurrent checkout.',
      ],
    },
    {
      id: 'path-3',
      title: 'AI & Data Application Engineer',
      fitPercentage: 72,
      gapCount: 4,
      requiredSkillGaps: ['Vector Databases (Qdrant/pgvector)', 'Model Routing & Tool Calling', 'Semantic Caching'],
      milestones: {
        q1: 'Integrate pgvector into existing PostgreSQL database for hybrid keyword-semantic search.',
        q2: 'Build a production GenAI agent with deterministic schema verification and guardrails.',
      },
      suggestedProjects: [
        {
          name: 'Codebase Knowledge Graph Engine',
          description: 'Parses AST of Go repositories into vector embeddings for architecture querying.',
          techStack: ['Go', 'PostgreSQL pgvector', 'Gemini API', 'TypeScript'],
        },
      ],
      thirtyDayPlan: [
        'Days 1-10: Master structured JSON schema outputs and function calling with @google/genai.',
        'Days 11-20: Set up pgvector extension and benchmark HNSW index vs IVFFlat.',
        'Days 21-30: Implement deterministic scoring layers on top of LLM interpretations.',
      ],
    },
  ],
  actionPlan: {
    week1: [
      'Evidence Reconciliation: Deploy your Go event ledger to AWS Free Tier (ECS Fargate) to solidify the AWS claim.',
      'Document the architectural design in a clean README with benchmarks (4,500 msg/sec proof).',
    ],
    week2: [
      'Master Go concurrency: Review channel synchronization, sync.Pool, atomic operations, and context cancellation.',
      'Solve 2 Machine Coding problems: In-Memory Key-Value Store and Order Matching Engine.',
    ],
    week3: [
      'Deepen Kafka knowledge: Understand partition assignment strategies, consumer lag monitoring, and rebalance storms.',
      'Practice explaining transaction isolation levels (Read Committed vs Repeatable Read in PostgreSQL).',
    ],
    week4: [
      'Conduct 2 full mock interview rounds on KaaryaLens focusing on Low-Level Design and System Design.',
      'Review Swiggy and Bengaluru unicorn specific behavioral questions on production outages and incident root-cause analysis.',
    ],
  },
  isDemoMode: true,
  createdAt: new Date().toISOString(),
};

export const SEED_INTERVIEW_SESSION: InterviewSession = {
  id: 'session-swiggy-01',
  roleId: 'role-swiggy-01',
  roleTitle: 'SDE-2 Backend Engineer',
  employer: 'Swiggy',
  currentQuestionIndex: 0,
  status: 'in-progress',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  questions: [
    {
      id: 'q-1',
      questionNumber: 1,
      targetSkill: 'Go (Golang) & Concurrency',
      category: 'Concurrency & Core Runtime',
      difficulty: 'Mid',
      question: 'In your distributed ledger project, how did you handle concurrent writes to the same account balance without causing race conditions or database deadlocks? Walk me through both your in-memory and database strategies.',
      rationale: 'Validates candidate claimed Go skills against Swiggy high-concurrency order dispatch requirements.',
      idealKeyPoints: [
        'Go channel or sync.Mutex with fine-grained account-level locking (avoid global mutex)',
        'PostgreSQL SELECT FOR UPDATE or Optimistic Concurrency Control (OCC) with version column',
        'Idempotency key check at gateway entry',
        'Deadlock prevention by strictly ordering resource acquisition',
      ],
      userResponse: 'We used an idempotency key passed in the request header. In Go, we had a worker pool consuming from Kafka. For PostgreSQL, we used SELECT FOR UPDATE on the account record, but to prevent lock contention under high load, we partitioned requests by account_id so a single worker handled sequential updates for that account.',
      evaluation: {
        technicalAccuracy: 88,
        depth: 84,
        clarity: 90,
        roleRelevance: 92,
        overallScore: 88,
        conciseImprovement: 'Great mention of Kafka partition-by-key! To elevate this to a top-tier SDE-2 answer, explicitly mention how you handle worker crashes mid-transaction and lock acquisition timeout (NOWAIT or SKIP LOCKED).',
        benchmarkModelAnswer: 'A robust SDE-2 response combines application-level partitioning with database resilience: 1) Partition Kafka traffic by account_id so sequential writes route to dedicated consumers; 2) In PostgreSQL, apply SELECT ... FOR UPDATE with a statement timeout or Optimistic Locking (versioning) to fail fast on contention; 3) Store idempotent hash in Redis with 24hr TTL; 4) Implement Dead Letter Queues (DLQ) if transaction retries exhaust backoff limits.',
        evaluatedAt: new Date().toISOString(),
      },
    },
    {
      id: 'q-2',
      questionNumber: 2,
      targetSkill: 'Apache Kafka & Stream Processing',
      category: 'Distributed Messaging & Resilience',
      difficulty: 'Mid',
      question: 'Swiggy peak traffic spikes 10x during lunch and rain events. Suppose your Kafka consumer group experiences a severe rebalance storm, and processing lag starts spiking. How would you diagnose the root cause and mitigate it in production?',
      rationale: 'Addresses mission-critical logistics requirement where consumer lag delays food delivery dispatch.',
      idealKeyPoints: [
        'Diagnosis via max.poll.interval.ms vs processing time per batch',
        'Heartbeat thread starvation vs cooperative sticky assignor',
        'Decoupling message polling from asynchronous worker execution',
        'Scaling partitions and temporary backpressure shedding',
      ],
    },
    {
      id: 'q-3',
      questionNumber: 3,
      targetSkill: 'AWS Cloud Architecture Claim Verification',
      category: 'Claim vs Evidence Verification',
      difficulty: 'Mid',
      question: 'Your resume states Advanced AWS expertise (ECS, RDS, S3), yet your public repositories primarily use local Docker Compose. Can you describe a specific production deployment pipeline you managed on AWS, including your VPC networking, secrets management, and disaster recovery plan?',
      rationale: 'Targeted probe into the identified claim-evidence gap in AWS infrastructure.',
      idealKeyPoints: [
        'VPC layout: public subnets for ALB, private subnets for ECS tasks & RDS with NAT Gateway',
        'AWS Secrets Manager / SSM Parameter Store integration into task definitions',
        'RDS Multi-AZ failover and automated read replica scaling',
        'CI/CD deployment strategy (Rolling update vs Blue/Green via AWS CodeDeploy)',
      ],
    },
    {
      id: 'q-4',
      questionNumber: 4,
      targetSkill: 'PostgreSQL Query Optimization',
      category: 'Database Internals & Performance',
      difficulty: 'Mid',
      question: 'You have an orders table with 80 million rows. A query searching for orders by delivery_partner_id and status within the last 2 hours is timing out during peak traffic. How would you analyze and optimize this query?',
      rationale: 'Validates realistic DBA and query tuning capabilities essential for Indian hyper-growth logistics platforms.',
      idealKeyPoints: [
        'Use EXPLAIN (ANALYZE, BUFFERS) to verify index scans vs sequential scans',
        'Composite index on (delivery_partner_id, created_at, status)',
        'Partial index for active statuses (e.g., status IN ("assigned", "picked_up"))',
        'Table partitioning by date/month (range partitioning)',
      ],
    },
    {
      id: 'q-5',
      questionNumber: 5,
      targetSkill: 'System Design & Distributed State',
      category: 'High-Level Architecture',
      difficulty: 'Senior',
      question: 'Design a real-time order dispatch engine that assigns a delivery partner to an order within 500ms while ensuring no partner is assigned twice concurrently. How do you prevent double-allocation across distributed nodes?',
      rationale: 'Tests candidate readiness for the core Swiggy delivery allocation problem.',
      idealKeyPoints: [
        'Geohashing (H3 / S2 geometry) to filter available partners within radius',
        'Distributed lock (Redis SET NX with lease timeout or Redlock) on partner ID',
        'State machine with transactional CAS (Compare-And-Swap) in database',
        'Fallback retry mechanism if chosen partner rejects offer',
      ],
    },
  ],
};
