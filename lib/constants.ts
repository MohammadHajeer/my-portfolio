export const NAV_LINKS = ["About", "Stack", "Projects", "Workflow", "Contact"];

export const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "REST APIs",
  "GraphQL",
  "Tailwind CSS",
  "Linux",
  "CI/CD",
  "System Design",
];

export const TECH_STACK = [
  { name: "React", icon: "⚛️", cat: "Frontend" },
  { name: "Next.js", icon: "▲", cat: "Frontend" },
  { name: "TypeScript", icon: "TS", cat: "Language" },
  { name: "Tailwind", icon: "🎨", cat: "Frontend" },
  { name: "Node.js", icon: "⬡", cat: "Backend" },
  { name: "Express", icon: "Ex", cat: "Backend" },
  { name: "PostgreSQL", icon: "🐘", cat: "Database" },
  { name: "MongoDB", icon: "🍃", cat: "Database" },
  { name: "Docker", icon: "🐳", cat: "DevOps" },
  { name: "Git", icon: "⑂", cat: "DevOps" },
  { name: "GraphQL", icon: "◈", cat: "API" },
  { name: "Linux", icon: "🐧", cat: "DevOps" },
];

export const PROJECTS = [
  {
    title: "FullStack SaaS Platform",
    desc: "Multi-tenant SaaS application with auth, billing, and real-time collaboration. Built for scale with row-level security and background jobs.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Docker"],
    status: "Live",
  },
  {
    title: "API Gateway Service",
    desc: "High-performance API gateway handling rate limiting, request routing, and JWT validation. Processes 10k+ req/sec.",
    tags: ["Node.js", "Redis", "Express", "JWT"],
    status: "Open Source",
  },
  {
    title: "Real-Time Chat App",
    desc: "End-to-end encrypted messaging platform with WebSocket rooms, file sharing, and presence indicators.",
    tags: ["React", "Socket.io", "MongoDB", "TypeScript"],
    status: "Live",
  },
  {
    title: "Dev Portfolio CMS",
    desc: "Headless CMS for developer portfolios with Markdown support, custom themes, and GitHub integration.",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Vercel"],
    status: "Live",
  },
];

export const WORKFLOW = [
  {
    step: "01",
    label: "Idea",
    icon: "💡",
    desc: "Client vision & goal discovery",
  },
  {
    step: "02",
    label: "Planning",
    icon: "📋",
    desc: "Scope, timeline & architecture",
  },
  {
    step: "03",
    label: "Design",
    icon: "✏️",
    desc: "Wireframes & UI prototyping",
  },
  {
    step: "04",
    label: "Build",
    icon: "⚡",
    desc: "Frontend & backend development",
  },
  {
    step: "05",
    label: "Testing",
    icon: "🧪",
    desc: "QA, unit & integration tests",
  },
  { step: "06", label: "Deploy", icon: "🚀", desc: "CI/CD pipeline & release" },
  {
    step: "07",
    label: "Host",
    icon: "☁️",
    desc: "Cloud infrastructure & scaling",
  },
  {
    step: "08",
    label: "Maintain",
    icon: "🔧",
    desc: "Monitoring, updates & support",
  },
];

export const FOCUS_AREAS = [
  {
    icon: "⚡",
    title: "Frontend",
    desc: "Pixel-perfect, fast, accessible UIs",
  },
  { icon: "⚙️", title: "Backend", desc: "Robust APIs & service architecture" },
  { icon: "📐", title: "Systems", desc: "Scalable design & infrastructure" },
];
