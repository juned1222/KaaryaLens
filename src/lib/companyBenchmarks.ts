/**
 * KaaryaLens Curated Company Benchmarks & Intelligence Architecture
 * 
 * Benchmark Groups:
 * - Global Product / Big Tech
 * - India Product / SaaS
 * - GCC / Enterprise
 * - IT Services / Consulting
 * - Startup / Growth
 * 
 * Note: Never describe as Tier 1/2/3. Use Benchmark Groups only.
 * Every company benchmark explicitly stores sources and verification status.
 */

export type BenchmarkGroup = 
  | 'Global Product / Big Tech'
  | 'India Product / SaaS'
  | 'GCC / Enterprise'
  | 'IT Services / Consulting'
  | 'Startup / Growth';

export interface CompanyBenchmarkProfile {
  id: string;
  name: string;
  benchmarkGroup: BenchmarkGroup;
  hqLocation: string;
  isVerified: boolean;
  verificationSource: string;
  verificationStatusText: 'Verified official careers process' | 'Curated benchmark profile' | 'Limited general benchmark';
  evaluationStyle: {
    coding: string;
    problemSolving: string;
    systemDesign: string;
    testing: string;
    behavioralAndCulture: string;
    roleSpecificFocus: string;
  };
  stagesSummary: string[];
  sampleRoles: string[];
  keyCompetencies: string[];
  disclaimerNote?: string;
}

export const COMPANY_BENCHMARKS: CompanyBenchmarkProfile[] = [
  // 1. Microsoft (Verified)
  {
    id: 'microsoft',
    name: 'Microsoft',
    benchmarkGroup: 'Global Product / Big Tech',
    hqLocation: 'Redmond, WA / Hyderabad & Bengaluru, India',
    isVerified: true,
    verificationSource: 'Official Microsoft Careers guidance (Engineering & Technology hiring framework)',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Data structures & algorithms with strong emphasis on edge-case rigor, memory efficiency, and clean modular code.',
      problemSolving: 'Analytical breakdown of ambiguous scenarios, evaluating trade-offs between speed, space, and extensibility.',
      systemDesign: 'Distributed system design for scale (L100-L400 depth depending on level), caching layers, fault tolerance, and async messaging.',
      testing: 'Candidate writes test cases, boundary conditions, and mock scenarios during live coding rounds.',
      behavioralAndCulture: 'Microsoft Growth Mindset criteria: learning from failure, customer obsession, cross-group collaboration, and inclusive leadership.',
      roleSpecificFocus: 'Cloud services (Azure/cloud concepts), concurrency, low-level multithreading, and production telemetry resilience.',
    },
    stagesSummary: [
      'Online Technical Assessment / Coding Screen (1-2 algorithmic problems)',
      'Technical Screening Call (live coding & architectural discussion)',
      'Virtual Onsite Loop: 4-5 rounds covering Data Structures, Architecture/HLD+LLD, and Behavioral (Growth Mindset)',
      'Director / As-Appropriate (AA) interview evaluating technical trajectory and cultural leadership',
    ],
    sampleRoles: ['Software Engineer (L59-L62)', 'Senior Software Engineer (L63-L64)', 'Principal Software Engineer', 'Cloud Solutions Architect'],
    keyCompetencies: ['Algorithms & Data Structures', 'Distributed Systems', 'Cloud Architecture', 'Clean Code', 'Growth Mindset'],
  },

  // 2. Amazon (Verified)
  {
    id: 'amazon',
    name: 'Amazon',
    benchmarkGroup: 'Global Product / Big Tech',
    hqLocation: 'Seattle, WA / Bengaluru, Hyderabad, Chennai, India',
    isVerified: true,
    verificationSource: 'Official Amazon Jobs & Careers guidance (Leadership Principles & Engineering Loop)',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Algorithmic problem-solving (LeetCode Medium-Hard standard) with heavy emphasis on runnable code and computational complexity analysis.',
      problemSolving: 'Customer-backwards reasoning: deconstructing ambiguous scaling problems into modular microservices.',
      systemDesign: 'Object-Oriented Design (LLD) and High-Level Distributed Architecture (HLD) handling peak event traffic and DynamoDB/S3 patterns.',
      testing: 'Rigorous unit testing expectation, handling transient failures, idempotency, and distributed consistency.',
      behavioralAndCulture: 'Amazon 16 Leadership Principles evaluated in EVERY single round using STAR method (Customer Obsession, Ownership, Dive Deep, Deliver Results).',
      roleSpecificFocus: 'Service-Oriented Architecture (SOA), AWS ecosystem primitives, latency SLAs, and asynchronous queuing.',
    },
    stagesSummary: [
      'Online Assessment (OA1: Debugging & Coding / OA2: Work Style Simulation & Problem Solving)',
      'Technical Phone Screen (Live coding with Amazon engineer)',
      'The "Loop": 4-5 rounds each integrating 2 Leadership Principles + Technical Deep-Dive (Coding, System Design, LLD)',
      'Bar Raiser Round (Independent evaluator enforcing hiring bar above 50% percentile of current team)',
    ],
    sampleRoles: ['Software Development Engineer I (SDE-1)', 'Software Development Engineer II (SDE-2)', 'Senior SDE', 'Systems Development Engineer'],
    keyCompetencies: ['Leadership Principles (STAR)', 'Data Structures & Algorithms', 'High-Level Design (HLD)', 'Low-Level Design (LLD)', 'Distributed Systems'],
  },

  // 3. Razorpay (Verified)
  {
    id: 'razorpay',
    name: 'Razorpay',
    benchmarkGroup: 'India Product / SaaS',
    hqLocation: 'Bengaluru, Karnataka, India',
    isVerified: true,
    verificationSource: 'Official Razorpay Careers & Engineering hiring framework (Role Fit, Synergy, AI Edge)',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Machine coding round (building a working CLI or mini payment microservice in 90-120 mins) followed by code evaluation.',
      problemSolving: 'Fintech transaction reliability: idempotency keys, duplicate charge prevention, and distributed two-phase commit.',
      systemDesign: 'High-throughput payment gateways, low-latency webhook ingestion, multi-tenant database partitioning, and redis locking.',
      testing: 'Functional correctness, edge case handling in monetary arithmetic, unit tests and clean abstractions.',
      behavioralAndCulture: 'Razorpay "Synergy & Role Fit" loop: owner mindset, speed with stability, constructive transparency, and AI-first engineering efficiency.',
      roleSpecificFocus: 'Go/PHP/Node backend services, message brokers (Kafka/RabbitMQ), transactional SQL, and bank integrations.',
    },
    stagesSummary: [
      'Machine Coding / Hackathon Round (2 hours: practical runnable application with clean modular design)',
      'Low-Level Design & Code Review (evaluating abstractions, SOLID principles, and concurrency safety)',
      'High-Level Architecture & Distributed Systems (payment rails, idempotency, scaling under flash sales)',
      'Culture Fit & Synergy Round with Engineering Leadership (AI Edge, ownership, and core values)',
    ],
    sampleRoles: ['Software Development Engineer II (Backend)', 'Senior SDE (Platform / Payments)', 'Full Stack Engineer', 'Engineering Manager'],
    keyCompetencies: ['Machine Coding (Clean Architecture)', 'Low-Level Design (LLD)', 'Payment Reliability & Idempotency', 'High-Level Design (HLD)', 'Fintech Synergy'],
  },

  // 4. TCS (Tata Consultancy Services - Verified)
  {
    id: 'tcs',
    name: 'TCS',
    benchmarkGroup: 'IT Services / Consulting',
    hqLocation: 'Mumbai, Maharashtra, India',
    isVerified: true,
    verificationSource: 'Official TCS Careers & National Qualifier Test (NQT) structured assessment guidelines',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'TCS NQT Hands-on coding assessment (Foundation and Advanced sections) testing fundamental syntax, loops, strings, and arrays.',
      problemSolving: 'Structured numerical ability, cognitive reasoning, and algorithmic logic breakdown.',
      systemDesign: 'Tiered role evaluation: Ninja (basic procedural logic), Digital (MVC frameworks & SQL queries), Prime (advanced architectures & algorithms).',
      testing: 'Passing standard public and hidden test cases on TCS iON evaluation engine.',
      behavioralAndCulture: 'Managerial and HR rounds evaluating business communication, adaptability to global timezones, and client delivery readiness.',
      roleSpecificFocus: 'Java/Spring, Python, C++, full-stack frameworks, cloud migrations, and enterprise SDLC processes.',
    },
    stagesSummary: [
      'TCS NQT Cognitive Assessment (Numerical Ability, Verbal Ability, Reasoning Ability)',
      'TCS NQT Advanced Section (Advanced Quantitative, Advanced Reasoning, 2 Hands-on Coding problems)',
      'Automated Routing into Ninja, Digital, or Prime tracks based on NQT cutoff percentile',
      'Technical Interview (OOPs, DBMS, Operating Systems, Projects, and Live Coding)',
      'Managerial & HR Interview (Communication, flexibility, and client-readiness)',
    ],
    sampleRoles: ['Graduate Trainee (Ninja)', 'Systems Engineer (Digital)', 'Software Engineer (Prime)', 'Enterprise Cloud Consultant'],
    keyCompetencies: ['TCS NQT Assessment', 'Core Java / Python / C++', 'Object-Oriented Programming (OOPs)', 'Relational Databases (DBMS)', 'Client Communication'],
  },

  // 5. Freshworks (Verified)
  {
    id: 'freshworks',
    name: 'Freshworks',
    benchmarkGroup: 'India Product / SaaS',
    hqLocation: 'San Mateo, CA & Chennai, Tamil Nadu, India',
    isVerified: true,
    verificationSource: 'Official Freshworks Careers & Engineering early-career / experienced assessment framework',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Practical software engineering: hands-on problem solving, data transformations, and readable idiomatic code.',
      problemSolving: 'Multi-tenant SaaS operational scenarios, rate limiting, and CRM/Helpdesk customer workflows.',
      systemDesign: 'SaaS multi-tenancy architecture, caching strategies (Redis), asynchronous background queues (Sidekiq/Kafka), and API design.',
      testing: 'Writing test suites (RSpec, Jest, Go test), mocking third-party integrations, and regression testing.',
      behavioralAndCulture: 'The Freshworks "CHAT" values (Craftsmanship, Happy work environment, Agility, and True to oneself).',
      roleSpecificFocus: 'Ruby on Rails, Go, Node.js, AWS cloud services, and React micro-frontends.',
    },
    stagesSummary: [
      'Online Coding Challenge (Algorithmic problem-solving & clean code constructs)',
      'Technical Round 1: Data structures, OOPs, code maintainability, and domain modeling',
      'Technical Round 2: System design, multi-tenant DB design, and debugging production incidents',
      'Culture & Leadership Round: Product mindset, customer empathy, and collaborative ethos',
    ],
    sampleRoles: ['Product Engineer (SDE-1)', 'Senior Product Engineer (SDE-2)', 'Staff Engineer', 'Frontend Engineer'],
    keyCompetencies: ['Multi-Tenant SaaS Architecture', 'RESTful API Design', 'Data Structures & Algorithms', 'Product Empathy', 'Clean Code Craftsmanship'],
  },

  // Curated additional companies with clear benchmarking status
  {
    id: 'google',
    name: 'Google',
    benchmarkGroup: 'Global Product / Big Tech',
    hqLocation: 'Mountain View, CA / Bengaluru, Hyderabad, India',
    isVerified: true,
    verificationSource: 'Official Google Careers Tech Hiring Guide & Engineering rubric',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Algorithmic efficiency, time/space optimality (O-notation), robust boundary logic, and clean Google code style.',
      problemSolving: 'First-principles analytical reasoning, open-ended problem exploration, and question disambiguation.',
      systemDesign: 'Large-scale distributed systems (planet-scale), consensus (Raft/Paxos), sharding, and latency budgets.',
      testing: 'Proactive unit test identification, edge conditions, and invariant verification.',
      behavioralAndCulture: 'Googliness & Leadership: intellectual humility, navigating ambiguity, ethical tech stewardship, and bias for teamwork.',
      roleSpecificFocus: 'Distributed computing, C++/Go/Java/Python high-performance systems, and data pipelines.',
    },
    stagesSummary: [
      'Recruiter Screen & Technical Assessment',
      '1-2 Technical Phone Screens (Google Docs live coding with engineer)',
      'Virtual Onsite Loop: 3-4 Coding/Algo rounds + 1 System Design round + 1 Googliness & Leadership round',
      'Hiring Committee (HC) Review & Team Matching',
    ],
    sampleRoles: ['Software Engineer II (L3)', 'Software Engineer III (L4)', 'Senior Software Engineer (L5)', 'Staff Software Engineer (L6)'],
    keyCompetencies: ['Algorithms & Data Structures', 'Planet-Scale System Design', 'Analytical Rigor', 'Googliness & Leadership'],
  },

  {
    id: 'swiggy',
    name: 'Swiggy',
    benchmarkGroup: 'India Product / SaaS',
    hqLocation: 'Bengaluru, Karnataka, India',
    isVerified: false,
    verificationSource: 'Curated engineering candidate benchmark & published tech blog patterns',
    verificationStatusText: 'Curated benchmark profile',
    evaluationStyle: {
      coding: 'High-speed problem solving and low-level machine coding (implementing food ordering, delivery dispatch, or surge pricing modules).',
      problemSolving: 'Hyperlocal logistics routing, driver-partner assignment algorithms, and real-time state machines.',
      systemDesign: 'High-throughput event-driven microservices, Kafka streaming pipelines, geo-spatial indexing (H3/S2), and high availability.',
      testing: 'Unit test coverage, integration tests for asynchronous event workflows.',
      behavioralAndCulture: 'Customer first, bias for action, continuous improvement, and operating under hyper-growth pressure.',
      roleSpecificFocus: 'Go, Java/Spring Boot, Apache Kafka, Cassandra/DynamoDB, and Redis.',
    },
    stagesSummary: [
      'Machine Coding / LLD Round (2 hours: practical design & working implementation)',
      'High-Level Architecture Round (Geo-spatial indexing, high-concurrency ordering flows)',
      'Data Structures & Algorithmic Problem Solving',
      'Hiring Manager / Leadership discussion on cultural alignment and ownership',
    ],
    sampleRoles: ['SDE-1', 'SDE-2 (Backend)', 'Senior SDE', 'Principal Architect'],
    keyCompetencies: ['Machine Coding', 'Geo-spatial Indexing (H3/S2)', 'Distributed Event Streaming (Kafka)', 'Low-Level Design (LLD)'],
    disclaimerNote: 'Process based on curated engineering hiring patterns; official stages may vary by team and seniority.',
  },

  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase',
    benchmarkGroup: 'GCC / Enterprise',
    hqLocation: 'New York, NY / Bengaluru, Mumbai, Hyderabad, India',
    isVerified: true,
    verificationSource: 'Official JPMorgan Chase Careers & Global Technology Center guidelines',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Data structures, algorithm optimization, and clean Java/Python object-oriented programming.',
      problemSolving: 'Financial transaction workflows, high-frequency trading reconciliation, and audit log tracking.',
      systemDesign: 'Enterprise microservices, event sourcing, regulatory compliance, resiliency, and database ACID guarantees.',
      testing: 'Rigorous test-driven development (TDD), mocking downstream payment clearing rails.',
      behavioralAndCulture: 'Risk management mindset, regulatory adherence, teamwork, and strong client ownership.',
      roleSpecificFocus: 'Core Java, Spring Cloud, AWS/Private Cloud, Apache Kafka, and relational database tuning.',
    },
    stagesSummary: [
      'Online Coding Assessment (HackerRank / HireVue video assessment)',
      'Superday: Multiple 45-minute rounds covering Core Technology, Algorithms, Architecture, and Enterprise SDLC',
      'Behavioral & Fit Round with Executive Director / VP',
    ],
    sampleRoles: ['Software Engineer (Associate)', 'Lead Software Engineer (VP)', 'Cloud Infrastructure Engineer'],
    keyCompetencies: ['Core Java / Spring Boot', 'Enterprise Microservices', 'ACID Transactions & Data Integrity', 'Security & Compliance'],
  },

  {
    id: 'walmart',
    name: 'Walmart Global Tech',
    benchmarkGroup: 'GCC / Enterprise',
    hqLocation: 'Bentonville, AR / Bengaluru & Chennai, India',
    isVerified: true,
    verificationSource: 'Official Walmart Global Tech Careers & Tech Talent guidelines',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Core data structures and algorithms with focus on memory footprint and algorithmic complexity.',
      problemSolving: 'Omnichannel retail scale: supply chain routing, inventory reconciliation, and flash sale surges.',
      systemDesign: 'Global retail systems: catalogue management, caching, event-driven ordering, and distributed DBs.',
      testing: 'Unit testing, chaos engineering principles, and fault isolation.',
      behavioralAndCulture: 'Customer obsession, service to the customer, striving for excellence, and act with integrity.',
      roleSpecificFocus: 'Java, Spring Boot, Node.js, Kafka, Kubernetes, and Cloud Native architecture.',
    },
    stagesSummary: [
      'Online Technical Assessment (Coding + Aptitude)',
      'Technical Round 1: Data Structures, Algorithms, and OOPs concepts',
      'Technical Round 2: Low-Level and High-Level System Architecture',
      'Hiring Manager / Leadership discussion',
    ],
    sampleRoles: ['Software Engineer II', 'Senior Software Engineer', 'Staff Software Engineer'],
    keyCompetencies: ['Distributed Systems', 'Supply Chain Tech', 'Data Structures & Algorithms', 'Retail Microservices'],
  },

  {
    id: 'infosys',
    name: 'Infosys',
    benchmarkGroup: 'IT Services / Consulting',
    hqLocation: 'Bengaluru, Karnataka, India',
    isVerified: true,
    verificationSource: 'Official Infosys Careers & InfyTQ / Springboard assessment framework',
    verificationStatusText: 'Verified official careers process',
    evaluationStyle: {
      coding: 'Fundamental programming constructs in Java/Python, string manipulations, arrays, and basic data structures.',
      problemSolving: 'Logical reasoning, quantitative ability, and business logic execution.',
      systemDesign: 'Tiered assessment: Specialist Programmer (advanced algorithms) vs Digital Specialist Engineer (full stack) vs Systems Engineer.',
      testing: 'Passing standard test suites on automated evaluation environments.',
      behavioralAndCulture: 'Professional communication, client engagement ethics, and cross-functional agility.',
      roleSpecificFocus: 'Enterprise technologies, full stack web development, and cloud modernization.',
    },
    stagesSummary: [
      'Online Aptitude and Coding Test (InfyTQ certification or HackWithInfy hackathon)',
      'Technical Interview (Programming fundamentals, DBMS, SQL, and project evaluation)',
      'HR Interview (Communication, flexibility with relocation, and cultural adaptability)',
    ],
    sampleRoles: ['Systems Engineer', 'Digital Specialist Engineer (DSE)', 'Specialist Programmer (SP)'],
    keyCompetencies: ['Java / Python Fundamentals', 'Relational Databases (SQL)', 'Object Oriented Concepts', 'Client Communication'],
  },

  {
    id: 'flipkart',
    name: 'Flipkart',
    benchmarkGroup: 'India Product / SaaS',
    hqLocation: 'Bengaluru, Karnataka, India',
    isVerified: false,
    verificationSource: 'Curated engineering benchmark & tech hiring public records',
    verificationStatusText: 'Curated benchmark profile',
    evaluationStyle: {
      coding: 'Machine coding round: 90 minutes to design and execute clean, object-oriented code for real-world systems.',
      problemSolving: 'E-commerce logistics, pricing engines, inventory locking, and order fulfillment optimization.',
      systemDesign: 'High-scale e-commerce architecture (Big Billion Days throughput), distributed caches, and database sharding.',
      testing: 'Unit test suite with boundary and concurrency validation.',
      behavioralAndCulture: 'Audacity, bias for action, customer-centricity, and ownership.',
      roleSpecificFocus: 'Java, Dropwizard/Spring Boot, Apache Kafka, HBase, and MySQL/PostgreSQL.',
    },
    stagesSummary: [
      'Machine Coding Round (2 hours: live executable design with SOLID principles)',
      'Problem Solving & Data Structures (Algorithmic problem-solving)',
      'System Design (Large scale distributed systems architecture)',
      'Hiring Manager / Culture Fit round',
    ],
    sampleRoles: ['SDE-1', 'SDE-2 (Backend)', 'Senior SDE', 'Architect'],
    keyCompetencies: ['Machine Coding (SOLID)', 'E-Commerce Architecture', 'High-Level Design (HLD)', 'Concurrency & Caching'],
    disclaimerNote: 'Process based on curated engineering hiring patterns; official stages may vary by team and seniority.',
  },

  {
    id: 'zepto',
    name: 'Zepto',
    benchmarkGroup: 'Startup / Growth',
    hqLocation: 'Mumbai & Bengaluru, India',
    isVerified: false,
    verificationSource: 'Curated startup engineering benchmark & published engineering profiles',
    verificationStatusText: 'Curated benchmark profile',
    evaluationStyle: {
      coding: 'Speed, modularity, and rapid prototyping of backend APIs and microservices.',
      problemSolving: '10-minute delivery routing, dark store inventory allocation, and real-time rider dispatching.',
      systemDesign: 'Event-driven architecture with sub-second latency requirements, Redis cluster caching, and Kafka pipelines.',
      testing: 'Pragmatic test coverage focusing on payment and checkout critical paths.',
      behavioralAndCulture: 'Extreme ownership, high agency, fast execution cadence, and startup grit.',
      roleSpecificFocus: 'Go, Node.js, PostgreSQL, Redis, and Kubernetes.',
    },
    stagesSummary: [
      'Take-Home Assignment or Live Machine Coding (Building microservices with fast turnaround)',
      'Technical Architecture & Concurrency Discussion',
      'Problem Solving & Data Structures',
      'Founder / Engineering VP Fit & Alignment',
    ],
    sampleRoles: ['Software Engineer', 'Senior Software Engineer (Backend)', 'Platform Lead'],
    keyCompetencies: ['Sub-Second Event Processing', 'Dark Store Logistics', 'Go / Node.js Backend', 'Extreme Ownership'],
    disclaimerNote: 'Startup engineering benchmarks evolve rapidly; profile reflects current published practices.',
  },

  {
    id: 'postman',
    name: 'Postman',
    benchmarkGroup: 'India Product / SaaS',
    hqLocation: 'San Francisco, CA & Bengaluru, India',
    isVerified: false,
    verificationSource: 'Curated SaaS engineering benchmark & public engineering engineering interviews',
    verificationStatusText: 'Curated benchmark profile',
    evaluationStyle: {
      coding: 'API design excellence, developer tooling idioms, and asynchronous event architectures.',
      problemSolving: 'Collaborative developer workflows, API schema validation, and runtime execution isolation.',
      systemDesign: 'Global edge routing, cloud sync, micro-services, and enterprise API governance.',
      testing: 'End-to-end API testing, automated contract testing, and regression suites.',
      behavioralAndCulture: 'Developer empathy, simplicity in design, transparency, and collaborative craftsmanship.',
      roleSpecificFocus: 'Node.js, TypeScript, Go, Electron, and Distributed Systems.',
    },
    stagesSummary: [
      'Technical Screening & API Design Discussion',
      'System Architecture & Concurrency Deep Dive',
      'Live Coding & Developer Tooling Simulation',
      'Values & Team Collaboration Round',
    ],
    sampleRoles: ['Software Engineer', 'Senior Backend Engineer', 'Staff Infrastructure Engineer'],
    keyCompetencies: ['API-First Architecture', 'Developer Tooling', 'TypeScript / Go', 'Contract Testing'],
    disclaimerNote: 'Process based on curated engineering hiring patterns.',
  },
];

export const BENCHMARK_GROUPS: BenchmarkGroup[] = [
  'Global Product / Big Tech',
  'India Product / SaaS',
  'GCC / Enterprise',
  'IT Services / Consulting',
  'Startup / Growth',
];

/**
 * Helper to retrieve benchmark by ID or company name
 */
export function getCompanyBenchmark(companyNameOrId: string): CompanyBenchmarkProfile | null {
  const query = companyNameOrId.trim().toLowerCase();
  const match = COMPANY_BENCHMARKS.find(
    (c) => c.id.toLowerCase() === query || c.name.toLowerCase() === query || query.includes(c.name.toLowerCase())
  );
  return match || null;
}

/**
 * Filter benchmarks by benchmark group or search query
 */
export function filterCompanyBenchmarks(group?: BenchmarkGroup | 'All', query?: string): CompanyBenchmarkProfile[] {
  let list = COMPANY_BENCHMARKS;
  if (group && group !== 'All') {
    list = list.filter((c) => c.benchmarkGroup === group);
  }
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (c) => 
        c.name.toLowerCase().includes(q) || 
        c.benchmarkGroup.toLowerCase().includes(q) ||
        c.keyCompetencies.some((k) => k.toLowerCase().includes(q))
    );
  }
  return list;
}
