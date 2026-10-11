import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence, MotionConfig, animate, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   YOUR CONTENT — edit text here, the whole page updates.
   Images & resume live in /public (see file names below).
   ═══════════════════════════════════════════════════════════ */
const DATA = {
  name: ["Shreemohan", "Rajbhar"],
  label: "Full Stack Software Engineer · .NET Core · React.js · Mumbai",
  headline: "Full Stack Software Engineer | .NET Core · C# · ASP.NET MVC | React.js · JavaScript",
  intro: "Full-stack engineer with 4+ years building production systems in banking, HR and e-learning — C# and .NET Core on the backend, React.js on the front. Developer in the wealth management domain on a trading platform serving 4,000+ users at HDFC Bank.",
  badges: ["C#", ".NET Core", "ASP.NET MVC", "React.js", "JavaScript", "SQL Server", "Azure DevOps"],
  cv: "/Shreemohan_Rajbhar_Resume.pdf?v=2026-10", // latest resume in /public — change ?v= when you replace the PDF
  cvFileName: "Shreemohan_Rajbhar_Resume.pdf",
  avatar: "/avatar.webp",          // put avatar.webp in /public
  avatarFace: "/avatar-face.webp", // put avatar-face.webp in /public
  email: "m.rajbhar1235@gmail.com",
  mailto: "mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry",
  phone: "+91 72089 55301",
  phoneHref: "tel:+917208955301",
  location: "Mumbai, Maharashtra, India",
  socials: [
    { label: "GitHub", href: "https://github.com/Mrajbhar", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohan-rajbhar/", icon: "linkedin" },
    { label: "LeetCode", href: "https://leetcode.com/u/Mrajbhar/", icon: "leetcode" },
  ],
  heroStats: [
    { value: 4, suffix: "+ Years", label: "Experience" },
    { value: 4000, suffix: "+", label: "Users Served" },
  ],
  stats: [
    { value: 4, suffix: "+", label: "Years Exp." },
    { value: 80, suffix: "%+", label: "Faster Reports" },
    { value: 207, suffix: "", label: "LeetCode Solved" },
  ],
  aboutTitle: "Building software that scales & performs.",
  about: [
    "I'm a full-stack engineer with 4+ years of experience building production systems in banking, HR and e-learning — C# and .NET Core on the backend, React.js on the front, with a track record of modernising legacy applications to component-based UI.",
    "I'm currently a developer in the wealth management domain at HDFC Bank (via Clover Infotech), working on a mutual fund and bond trading platform serving 4,000+ active users — covering portfolio transactions, trade settlement and securities buy/sell workflows end to end.",
    "My biggest strength is performance engineering: I removed a 3–4 minute report timeout by moving report generation onto background threads, cut an HRMS page load from 2–3 minutes to 5–6 seconds, and reduced system errors by 50% by migrating three products from .NET 4 to .NET 4.8. Outside work I've solved 207 problems on LeetCode in Java and C++.",
  ],
  education: ["B.Sc. in Computer Science", "University of Mumbai, Maharashtra · 2017 – 2020"],
  services: [
    { title: "Full Stack Web Apps", icon: "◎", desc: "End-to-end product builds with React.js front ends and .NET Core back ends — secure REST APIs, OAuth sign-in, dynamic forms and data-driven dashboards." },
    { title: "API & Systems Design", icon: "⬡", desc: "Clean REST API design in .NET Core and Web API, service layering, and cross-module data exchange over tuned stored procedures and views." },
    { title: "Performance & Migration", icon: "▲", desc: "Legacy modernisation and tuning — I've cut report times by 80%+, page loads from 2–3 minutes to 5–6 seconds, and migrated server-rendered screens to React." },
    { title: "Database Engineering", icon: "▣", desc: "SQL Server, Oracle SQL, MySQL & MongoDB — schema design, stored procedures and query optimisation for data-heavy workloads." },
  ],
  skills: [
    { name: "C#", years: 4, icon: "◑", desc: "Core language across every role since 2022" },
    { name: ".NET Core", years: 4, icon: "⬡", desc: "Web APIs, REST services & middleware" },
    { name: "ASP.NET MVC", years: 4, icon: "◈", desc: "Web apps in banking, HRMS & e-learning" },
    { name: "SQL Server", years: 4, icon: "▣", desc: "Queries, procedures & performance tuning" },
    { name: "JavaScript", years: 4, icon: "◇", desc: "ES6+, jQuery & AJAX for dynamic forms" },
    { name: "React.js", years: 3, icon: "◎", desc: "Component-based UI & legacy migrations" },
    { name: "Oracle SQL", years: 2, icon: "◆", desc: "Tuned stored procedures & views (HRMS)" },
    { name: "MongoDB", years: 2, icon: "◐", desc: "Indexed schemas for full-stack projects" },
  ],
  skillGroups: [
    { name: "Languages", items: ["C#", "JavaScript (ES6+)", "SQL", "VB.NET", "Java", "C++"] },
    { name: "Frontend", items: ["React.js", "JavaScript (ES6+)", "jQuery", "AJAX", "HTML5", "CSS3", "Bootstrap", "Responsive Design"] },
    { name: "Backend", items: [".NET Core", "ASP.NET MVC", "Web API", "Entity Framework", "LINQ", "Node.js & Express.js (personal projects)"] },
    { name: "Databases", items: ["SQL Server", "Oracle SQL", "MySQL", "MongoDB"] },
    { name: "DevOps & Cloud", items: ["Azure DevOps (CI/CD pipelines)", "GitHub Actions", "Git", "GitHub", "Microsoft Azure", "AWS"] },
    { name: "Practices", items: ["REST API design", "Multithreading", "Performance tuning", "OAuth", "Code review"] },
  ],
  domains: ["Wealth Management", "BFSI (Banking, Financial Services & Insurance)", "Securities Trading", "HRMS", "E-Learning"],
  leetcode: {
    solved: 207, easy: 85, medium: 102, hard: 20, badge: "100 Days Badge 2024",
    focus: ["Arrays", "Strings", "Hashing", "Trees", "Graphs", "Dynamic Programming"], langs: "Java and C++",
    url: "https://leetcode.com/u/Mrajbhar/",
  },
  marquee: ["C#", ".NET Core", "ASP.NET MVC", "Web API", "Entity Framework", "LINQ", "VB.NET", "React.js", "JavaScript (ES6+)", "jQuery", "AJAX", "Node.js", "Express.js", "SQL Server", "Oracle SQL", "MySQL", "MongoDB", "Azure DevOps", "GitHub Actions", "Microsoft Azure", "AWS", "REST APIs", "OAuth", "Multithreading", "SWIFT", "Git"],
  experiences: [
    {
      year: "Jul 2025 – Present", role: "Software Engineer · Developer", company: "HDFC Bank", client: "via Clover Infotech · Wealth Management & Banking · Navi Mumbai",
      points: [
        "Developed core modules of a wealth management mutual fund and bond trading platform serving 4,000+ active users — covering portfolio transactions, trade settlement and securities buy/sell workflows end to end.",
        "Built the ETF, Equity and Structured Notes product modules for WealthFY Offshore and supported the coordinated go-live and historical data migration — one of the platform's most significant rollouts in the past 2–3 years, delivered with Product, IT, BSG and vendor partners.",
        "Designed and built multiple transaction and investment forms end to end — dynamic front-end behaviour and client-side validation in JavaScript and jQuery over ASP.NET MVC views and Web API endpoints.",
        "Cut outbound SWIFT message volume and downstream reconciliation work by redesigning generation to batch multiple transactions into a single consolidated message instead of one per transaction.",
        "Shipped SWIFT payment settlement and a third-party email notification API, automating post-trade confirmation on every purchase.",
        "Delivered features from business requirements through to production, working closely with Business Analysts and Product on scoping, build, release and support.",
      ],
      skills: ["C#", "VB.NET", ".NET Core", "ASP.NET MVC", "Web API", "SQL Server", "Azure DevOps"],
    },
    {
      year: "May 2024 – Jun 2025", role: "Software Engineer", company: "Sodel Software Solutions", client: "E-Learning Domain · Navi Mumbai",
      points: [
        "Reduced report load time by 80%+ and eliminated recurring HTTP 500 failures by moving generation of 1,000–10,000+ record reports onto background threads, replacing a synchronous flow that blocked the UI for 3–4 minutes; diagnosed, fixed and deployed in one week.",
        "Improved execution performance 25% across 15+ pages by restructuring control flow and eliminating redundant loops.",
        "Enabled Google and Microsoft OAuth sign-in by building custom authentication and authorization middleware with key-based encryption.",
        "Built responsive, data-driven assessment pages with real-time question counting and percentage scoring, using JavaScript, AJAX and jQuery for live UI updates without page reloads.",
      ],
      skills: ["C#", "ASP.NET", "Entity Framework", "Multithreading", "JavaScript", "MySQL"],
    },
    {
      year: "Nov 2022 – May 2024", role: "Software Developer", company: "Osource Global", client: "HRMS Applications · Navi Mumbai",
      points: [
        "Reduced HRMS page load from 2–3 minutes to 5–6 seconds, lifting user satisfaction 70% and cutting bounce rate 25%.",
        "Cut system errors 50% and improved stability 20% by migrating three HRMS products from .NET 4 to .NET 4.8.",
        "Enabled cross-module data exchange by designing REST APIs in .NET Core over tuned Oracle stored procedures and views.",
        "Migrated legacy HRMS pages to React.js, rebuilding server-rendered screens as component-based UI consuming the .NET Core REST APIs — improving responsiveness and maintainability across modules.",
      ],
      skills: ["C#", ".NET Core", "ASP.NET", "REST APIs", "React.js", "Oracle SQL"],
    },
    {
      year: "Apr 2022 – Oct 2022", role: "Junior Software Engineer", company: "Greytrix India", client: "CRM Application · Navi Mumbai",
      points: [
        "Migrated a CRM product front end to React.js backed by .NET Core Web APIs, improving scalability and performance, alongside feature work on the existing ASP.NET MVC application.",
      ],
      skills: ["ASP.NET MVC", ".NET Core Web API", "React.js", "Git"],
    },
  ],
  projects: [
    {
      title: "Prycely — Full-Stack E-Commerce Platform", tag: "React.js · .NET Core", period: "2024 – Present", featured: true, cat: ["dotnet"], accent: "#10B981", image: "/Prycely.jpg", link: "https://prycely.vercel.app/",
      desc: "Full-stack e-commerce platform: React front end with hooks-based state and reusable components, a .NET Core REST API, and MongoDB schemas indexed for fast product and order retrieval.",
      skills: ["React.js", ".NET Core", "MongoDB", "REST API", "React Hooks"],
    },
    {
      title: "CodeSage — AI-Powered Code Review", tag: "React.js · .NET Core", period: "Dec 2023 – Mar 2024", featured: true, cat: ["dotnet", "ai"], accent: "#8B5CF6", image: "/CodeSage.jpg", link: "https://codesage-plum.vercel.app/login",
      desc: "React and .NET Core application with secure REST endpoints and a responsive interface; MongoDB-backed data layer for user and content management. Integrates with GitHub repositories to analyse pull requests and generate code review suggestions.",
      skills: ["React.js", ".NET Core", "MongoDB", "REST API", "GitHub API", "OAuth"],
    },
    {
      title: "Triage — Multi-Tenant Support Ticketing Platform", tag: "SaaS Support Platform", cat: ["dotnet"], accent: "#06B6D4", image: "/Triage.jpg", link: "https://triage-web-ashy.vercel.app/login",
      desc: "Developed a full-stack multi-tenant support ticketing platform that enables organizations to manage customer support efficiently. Features include secure JWT authentication, role-based access control, ticket creation and assignment, SLA tracking, real-time status updates, an audit trail, and a responsive dashboard built with React.js and ASP.NET Core.",
      skills: ["React.js", "ASP.NET Core", "MongoDB", "REST API", "JWT", "Tailwind CSS"],
    },
    {
      title: "CareerCraft — Build Resumes and Prepare for Interviews", tag: "MERN Stack", cat: ["mern"], accent: "#EC4899", image: "/CareerCraft.jpg", link: "https://career-craft-pink-eight.vercel.app/",
      desc: "Developed a full-stack resume builder and interview preparation platform using React.js, Node.js, Express.js, and MongoDB. The application allows users to create, edit, manage, and download resumes while practicing interview questions through an intuitive and responsive UI.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    },
    {
      title: "ViewBlog — Blog Platform", tag: "MERN Stack · CMS", cat: ["mern"], accent: "#3B82F6", image: "/viewblog.jpg", link: "https://viewblog.vercel.app/",
      desc: "Modern blogging platform with authentication, article publishing, image uploads, dark/light mode, and a fully responsive design.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    },
    {
      title: "E-Commerce Application", tag: "Retail · Full Stack", cat: ["mern"], accent: "#F59E0B", image: "/Markethub.jpg", link: "https://markethub-app.vercel.app/",
      desc: "Scalable e-commerce platform with product catalog, cart, and secure checkout. Built using MERN stack with JWT authentication and payment gateway integration.",
      skills: ["ReactJS", "NodeJS", "MongoDB", "ExpressJS"],
    },
  ],
  contactTitle: "Let's build something extraordinary together.",
  contactText: "Available for full-time roles and freelance projects. I bring 4+ years of .NET, React, and database expertise to every engagement.",
  contactBadges: [".NET Core APIs", "React.js Development", "Full Stack Development", "Performance Tuning", "Database Engineering"],
};
DATA.experiences.forEach((e) => { e.description = e.points.join(" "); });

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const NAV_IDS = NAV.map((n) => n.id);
const MAX_YEARS = Math.max(...DATA.skills.map((s) => s.years));
const ORBIT = [["C#", 0], [".NET", 72], ["React", 144], ["SQL", 216], ["Azure", 288]];
const FILTERS = [["all", "All"], ["mern", "MERN"], ["dotnet", ".NET"], ["ai", "AI"]];
const EASE = [0.16, 1, 0.3, 1];
const hostOf = (url) => (url ? new URL(url).hostname : "");

/* ═══════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════ */
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  copy: (<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" /></>),
  check: <path d="M20 6L9 17l-5-5" />,
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  grad: (<><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />,
  pin: (<><path d="M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
};
const FILLED = {
  github: <path d="M12 2C6.48 2 2 6.49 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12.02C22 6.49 17.52 2 12 2z" />,
  linkedin: <path d="M4.98 3.5a1.98 2 0 11-3.96 0 1.98 2 0 013.96 0zM1 8h4v13H1zM8 8h3.8v1.8h.05c.53-1 1.82-2.05 3.75-2.05C19.5 7.75 21 10 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H8z" />,
  leetcode: <path d="M14.1 2l-1.4 1.4 6.5 6.6-6.5 6.6 1.4 1.4L22 10zM8.5 7L2 13.5 8.5 20l1.4-1.4-5.1-5.1 5.1-5.1z" />,
};
function Icon({ name, className = "h-4 w-4" }) {
  if (FILLED[name]) return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>{FILLED[name]}</svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>{PATHS[name]}</svg>;
}

/* ═══════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════ */
function useTheme() {
  const reduce = useReducedMotion();
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("pf-theme");
      if (saved) return saved === "dark";
    } catch { /* storage blocked */ }
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    try { localStorage.setItem("pf-theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);
  const toggle = useCallback((e) => {
    const next = !dark;
    const apply = () => { document.documentElement.classList.toggle("dark", next); flushSync(() => setDark(next)); };
    if (reduce || typeof document.startViewTransition !== "function") return apply();
    const x = e?.clientX ?? window.innerWidth / 2, y = e?.clientY ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.startViewTransition(apply).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.16,1,0.3,1)", pseudoElement: "::view-transition-new(root)" },
      )).catch(() => {});
  }, [dark, reduce]);
  return { dark, toggle };
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useScrollState() {
  const [s, setS] = useState({ scrolled: false, hidden: false, y: 0 });
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setS((p) => {
        let hidden = p.hidden;
        if (Math.abs(y - last) > 6) { hidden = y > last && y > 600; last = y; }
        const scrolled = y > 20;
        return scrolled === p.scrolled && hidden === p.hidden && Math.abs(y - p.y) < 300 ? p : { scrolled, hidden, y };
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return s;
}

/* ═══════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════ */
function Reveal({ as = "div", delay = 0, y = 32, className = "", children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }} className={className} {...rest}>
      {children}
    </Comp>
  );
}

function CountUp({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return <span ref={ref} className={className}>{n}{suffix}</span>;
}

function CopyButton({ value, label, onCopied }) {
  const [ok, setOk] = useState(false);
  useEffect(() => { if (!ok) return; const t = setTimeout(() => setOk(false), 1800); return () => clearTimeout(t); }, [ok]);
  return (
    <button type="button" aria-label={ok ? `${label} copied` : `Copy ${label}`}
      onClick={async () => { try { await navigator.clipboard.writeText(value); setOk(true); onCopied?.(value); } catch { /* blocked */ } }}
      className={`ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] border transition-colors ${ok ? "border-mint text-mint" : "border-white/20 text-white/80 hover:border-white"}`}>
      <Icon name={ok ? "check" : "copy"} className="h-[15px] w-[15px]" />
    </button>
  );
}

function Kicker({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[13.5px] font-bold uppercase tracking-[0.08em] text-accent before:h-0.5 before:w-[26px] before:rounded before:bg-current ${className}`}>
      {children}
    </span>
  );
}
const h2 = "mt-3.5 font-display text-[clamp(36px,5vw,62px)] font-extrabold leading-[1.02] tracking-[-0.035em]";

function Tags({ items }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
      {items.map((t) => <span key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">{t}</span>)}
    </div>
  );
}

function Socials({ label, light = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-[13px] text-faint ${className}`}>
      {DATA.socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-[3px] ${
            light ? "border-white/20 text-white hover:bg-white hover:text-navy" : "border-line bg-surface hover:border-ink hover:bg-ink hover:text-bg"}`}>
          <Icon name={s.icon} className="h-[18px] w-[18px]" />
        </a>
      ))}
      {label && <span className="ml-1.5">{label}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const { dark, toggle } = useTheme();
  const active = useActiveSection(NAV_IDS);
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 1900); return () => clearTimeout(t); }, [toast]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-bg font-sans text-[16px] leading-relaxed text-ink antialiased">
        <ScrollProgress />
        <Header active={active} dark={dark} toggle={toggle} />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Skills />
          <Projects />
          <Experience />
          <Contact onCopied={(v) => setToast(`Copied: ${v}`)} />
        </main>
        <footer className="py-8">
          <div className="pf-wrap flex flex-wrap justify-between gap-2.5 text-[13px] text-faint">
            <span>{DATA.name.join(" ")}</span>
            <a href={DATA.cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-muted hover:text-accent">Resume <Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a>
            <span>© {new Date().getFullYear()} · Crafted with care in Mumbai</span>
          </div>
        </footer>
        <BackToTop />
        <div role="status" aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-[14px] bg-ink px-[18px] py-3 text-sm font-semibold text-bg transition-all duration-500 ${toast ? "opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
          {toast}
        </div>
      </div>
    </MotionConfig>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />;
}

/* ── Header ── */
function Header({ active, dark, toggle }) {
  const { scrolled, hidden } = useScrollState();
  const [open, setOpen] = useState(false);
  useEffect(() => { const k = (e) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  const navLink = (on) =>
    `relative px-3 py-2 text-[14.5px] font-semibold transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded after:bg-accent after:transition-transform after:duration-500 ${
      on ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100"}`;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${scrolled ? "bg-bg/80 shadow-[0_1px_0_var(--line)] backdrop-blur-xl backdrop-saturate-150" : ""}`}>
        <div className="pf-wrap flex h-[74px] items-center justify-between gap-3">
          <a href="#home" className="group flex items-center gap-[11px] font-display text-[17px] font-bold tracking-[-0.01em]">
            <span className="relative h-10 w-10 overflow-hidden rounded-full bg-accent shadow-[0_0_0_2px_var(--surface),0_0_0_4px_var(--accent)]">
              <img src={DATA.avatarFace} alt="" className="absolute inset-0 h-full w-full translate-y-[6%] scale-105 object-cover transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-[1.15]" />
            </span>
            {DATA.name.join(" ")}
          </a>
          <nav aria-label="Primary" className="hidden gap-0.5 lg:flex">
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} className={navLink(active === n.id)}>{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line bg-surface transition-all hover:-rotate-12 hover:border-accent">
              <Icon name={dark ? "sun" : "moon"} className="h-[18px] w-[18px]" />
            </button>
            <a href={DATA.cv} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn-outline pf-btn-sm hidden xl:inline-flex">Resume <Icon name="arrowUpRight" /></a>
            <a href={DATA.mailto} className="pf-btn pf-btn-accent pf-btn-sm hidden lg:inline-flex">Hire Me <Icon name="arrow" /></a>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line bg-surface lg:hidden">
              <Icon name={open ? "close" : "menu"} className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-4 top-[82px] z-[49] rounded-[20px] border border-line bg-surface p-2.5 shadow-[var(--shadow)] lg:hidden">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}
                className={`block rounded-xl px-3.5 py-3 font-semibold ${active === n.id ? "bg-soft text-accent" : ""}`}>{n.label}</a>
            ))}
            <a href={DATA.cv} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-3.5 py-3 font-semibold">Resume <Icon name="arrowUpRight" className="h-4 w-4 text-accent" /></a>
            <a href={DATA.mailto} className="pf-btn pf-btn-accent mt-2 w-full justify-center">Hire Me <Icon name="arrow" /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ── */
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);
  const up = (delay) => ({ initial: { opacity: 0, y: 22 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, ease: EASE, delay } });
  const parts = DATA.label.split(" · ");
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28">
      <div aria-hidden className="pointer-events-none absolute -right-64 -top-72 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,var(--soft),transparent_65%)]" />
      <div className="pf-wrap relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span {...up(0)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-[7px] pl-2 pr-3.5 text-[13.5px] font-semibold text-muted shadow-[var(--shadow)]">
            <i className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-mint/20"><i className="pf-ping h-2 w-2 rounded-full bg-mint text-mint" /></i>
            Available · For hire
          </motion.span>
          <h1 className="mt-[22px] font-display text-[clamp(52px,7.4vw,104px)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            <span className="sr-only">{DATA.name.join(" ")}</span>
            {DATA.name.map((w, i) => (
              <span key={w} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: ready ? "0%" : "105%" }} transition={{ duration: 1.1, ease: EASE, delay: i * 0.1 }}>
                  {w}{i === 1 && <em className="not-italic text-accent">.</em>}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div {...up(0.25)} className="mt-[18px] flex flex-wrap items-center gap-2.5 font-display text-[clamp(17px,1.6vw,20px)] font-semibold text-muted">
            {parts.map((p, i) => (
              <span key={p} className="flex items-center gap-2.5">
                {i > 0 && <i className="h-[5px] w-[5px] rounded-full bg-accent" />}
                {i === 0 ? <b className="font-semibold text-ink">{p}</b> : p}
              </span>
            ))}
          </motion.div>
          <motion.p {...up(0.35)} className="mt-[18px] max-w-[540px] text-[17px] text-muted">{DATA.intro}</motion.p>
          <motion.div {...up(0.45)} className="mt-[30px] flex flex-wrap gap-2.5">
            <a href={DATA.mailto} className="pf-btn pf-btn-accent">Get In Touch <Icon name="arrow" /></a>
            <a href={DATA.cv} download={DATA.cvFileName} className="pf-btn pf-btn-outline">Download CV <Icon name="download" /></a>
          </motion.div>
          <motion.a {...up(0.5)} href={DATA.cv} target="_blank" rel="noopener noreferrer" className="group mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent">
            View my latest resume <Icon name="arrowUpRight" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
          <motion.div {...up(0.55)}><Socials label="Find me online" className="mt-[22px]" /></motion.div>
          <motion.div {...up(0.65)} className="mt-[34px] flex flex-wrap gap-x-9 gap-y-3 border-t border-line pt-6">
            {[...DATA.heroStats, DATA.stats[1]].map((s) => (
              <div key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} className="block font-display text-[clamp(28px,3vw,38px)] font-extrabold leading-none tracking-[-0.03em]" />
                <span className="text-[13px] font-semibold text-faint">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <Portrait ready={ready} />
      </div>
    </section>
  );
}

function FloatCard({ ready, delay, className, color = "var(--accent)", children, floatDelay = "0s" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: "spring", stiffness: 160, damping: 14, delay }}
      className={`absolute z-[3] rounded-[18px] border border-line bg-surface/90 p-3 pr-4 shadow-[var(--shadow)] backdrop-blur-md ${className}`}>
      <div className="pf-float flex items-center gap-3" style={{ animationDelay: floatDelay, "--c": color }}>{children}</div>
    </motion.div>
  );
}

function Portrait({ ready }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 70, damping: 18 }), y = useSpring(0, { stiffness: 70, damping: 18 });
  const ix = useSpring(0, { stiffness: 70, damping: 18 }), iy = useSpring(0, { stiffness: 70, damping: 18 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => { const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5; x.set(nx * 32); y.set(ny * 20); ix.set(nx * 20); iy.set(ny * 12); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y, ix, iy]);
  const icon = "flex h-[42px] w-[42px] items-center justify-center rounded-xl text-[18px] not-italic text-white";
  return (
    <motion.div style={{ x, y }} className="pf-portrait order-first justify-self-center lg:order-none">
      <div aria-hidden className={`pf-rings ${ready ? "is-ready" : ""}`}>
        <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="97" strokeDasharray="2 6" /><circle cx="100" cy="100" r="91" strokeDasharray="40 14 4 14" strokeOpacity=".2" /></svg>
      </div>
      <motion.div aria-hidden className="pf-disc" initial={{ scale: 0 }} animate={{ scale: ready ? 1 : 0 }} transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.1 }} />
      <motion.div aria-hidden className="pf-orbit" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
        <div className="pf-orbit-track">{ORBIT.map(([t, a]) => <div key={t} className="pf-orbit-item" style={{ "--a": `${a}deg` }}><span>{t}</span></div>)}</div>
      </motion.div>
      <div className="pf-figure">
        <motion.div className="absolute inset-0" style={{ x: ix, y: iy }}>
          {/* width + h-auto keeps the avatar's real proportions (no stretching) */}
          <motion.img src={DATA.avatar} alt={`Portrait of ${DATA.name.join(" ")}`} width={820} height={1101} fetchPriority="high"
            className="absolute bottom-0 left-[6%] h-auto w-[88%] drop-shadow-[0_18px_24px_rgba(0,0,0,0.18)]"
            initial={{ y: "40%", opacity: 0 }} animate={ready ? { y: "0%", opacity: 1 } : {}} transition={{ duration: 1.4, ease: EASE, delay: 0.45 }} />
        </motion.div>
      </div>
      <FloatCard ready={ready} delay={1} className="left-[-4%] top-[44%] lg:left-[-14%]">
        <i className={`${icon} bg-accent`}>★</i>
        <div><CountUp value={4} suffix="+ Years" className="block font-display text-[22px] font-extrabold leading-[1.05]" /><small className="text-xs font-semibold text-faint">Experience</small></div>
      </FloatCard>
      <FloatCard ready={ready} delay={1.15} floatDelay="-3s" className="bottom-[12%] right-[-4%] lg:right-[-12%]">
        <i className={`${icon} bg-navy`}>◉</i>
        <div><CountUp value={4000} suffix="+" className="block font-display text-[22px] font-extrabold leading-[1.05]" /><small className="text-xs font-semibold text-faint">Users Served</small></div>
      </FloatCard>
      <FloatCard ready={ready} delay={1.3} floatDelay="-1.5s" className="right-0 top-[22%] py-2.5 lg:right-[-6%]">
        <i className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-mint text-sm not-italic text-white">✓</i>
        <b className="text-sm">{DATA.experiences[0].company}</b>
      </FloatCard>
    </motion.div>
  );
}

/* ── Marquee ── */
function Marquee() {
  const pill = "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted before:h-[7px] before:w-[7px] before:rounded-full before:bg-accent";
  const a = [...DATA.marquee, ...DATA.marquee], rev = [...DATA.marquee].reverse();
  return (
    <div aria-hidden className="pf-marquee grid gap-2.5 overflow-hidden border-y border-line bg-surface py-[18px]">
      <div>{a.map((t, i) => <span key={i} className={pill}>{t}</span>)}</div>
      <div className="pf-rev">{[...rev, ...rev].map((t, i) => <span key={i} className={pill}>{t}</span>)}</div>
    </div>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="py-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap grid items-start gap-[clamp(32px,6vw,80px)] lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="group max-w-[420px] overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)] lg:sticky lg:top-[104px] lg:max-w-none">
          <div className="relative aspect-square overflow-hidden bg-[linear-gradient(160deg,var(--accent),color-mix(in_srgb,var(--accent)_55%,#000_45%))]">
            <div aria-hidden className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_120%,rgba(255,255,255,.07)_0_2px,transparent_2px_18px)]" />
            <img src={DATA.avatar} alt="" loading="lazy" width={820} height={1101} className="absolute bottom-0 left-[11%] h-auto w-[78%] transition-transform duration-1000 group-hover:scale-[1.04]" />
          </div>
          <div className="px-6 pb-6 pt-[22px]">
            <h3 className="m-0 font-display text-2xl font-extrabold tracking-[-0.02em]">{DATA.name.join(" ")}</h3>
            <div className="mt-0.5 text-sm text-muted">{DATA.label}</div>
            <div className="mt-4 flex items-center gap-3 rounded-[14px] bg-surface-2 p-3">
              <i className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-soft text-accent"><Icon name="grad" className="h-5 w-5" /></i>
              <div><b className="block text-sm">{DATA.education[0]}</b><span className="text-[12.5px] text-faint">{DATA.education[1]}</span></div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><Kicker>About Me</Kicker></Reveal>
          <Reveal as="h2" className="mt-3.5 font-display text-[clamp(32px,4.2vw,54px)] font-extrabold leading-[1.02] tracking-[-0.035em]">Building software that <em className="not-italic text-accent">scales &amp; performs.</em></Reveal>
          {DATA.about.map((p, i) => (
            <Reveal as="p" key={i} className={`mt-5 ${i === 0 ? "text-[clamp(19px,1.8vw,22px)] leading-[1.55] text-ink" : "text-[17px] text-muted"}`}>{p}</Reveal>
          ))}
          <div className="mt-9 grid grid-cols-3 gap-3.5">
            {DATA.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="rounded-[20px] border border-line bg-surface p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent">
                <CountUp value={s.value} suffix={s.suffix} className="block font-display text-[clamp(30px,3.4vw,42px)] font-extrabold leading-none tracking-[-0.03em] text-accent" />
                <span className="text-[13px] font-semibold text-faint">{s.label}</span>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a href={`mailto:${DATA.email}`} className="group mt-[30px] inline-flex items-center gap-2 bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-[3px] font-bold transition-[background-size] duration-500 hover:bg-[length:0_2px]">
              Let's work together <Icon name="arrow" className="h-4 w-4 text-accent" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, accent, sub, children }) {
  return (
    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className={h2}>{title} {accent && <em className="not-italic text-accent">{accent}</em>}</h2>
      </div>
      {sub && <p className="m-0 max-w-[440px] text-muted">{sub}</p>}
      {children}
    </Reveal>
  );
}

/* ── Services ── */
function Services() {
  return (
    <section id="services" className="pb-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap">
        <SectionHead kicker="What I Do" title="Services &" accent="Strengths" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} tabIndex={0}
              className="pf-svc group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent hover:text-white">
              <span className="absolute right-[22px] top-5 font-display text-[15px] font-extrabold text-faint transition-colors duration-500 group-hover:text-white/70">0{i + 1}</span>
              <div aria-hidden className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-[26px] text-accent transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white">{s.icon}</div>
              <h3 className="mb-2.5 mt-[22px] font-display text-xl font-bold tracking-[-0.01em]">{s.title}</h3>
              <p className="m-0 text-[14.5px] text-muted transition-colors duration-500 group-hover:text-white/90">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
function Skills() {
  const L = DATA.leetcode;
  const chip = "rounded-full bg-surface-2 px-[11px] py-[5px] text-[13px] font-semibold text-muted transition-colors hover:bg-soft hover:text-accent";
  const card = "rounded-[22px] border border-line bg-surface";
  return (
    <section id="skills" className="pb-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap">
        <SectionHead kicker="Skills & Expertise" title="Tech" accent="Arsenal" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.skills.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.07} className={`${card} flex flex-col gap-3.5 p-[22px] transition-all duration-500 hover:-translate-y-1 hover:border-accent`}>
              <div className="flex items-center gap-3.5">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full -rotate-90">
                    <circle cx="32" cy="32" r="27" fill="none" strokeWidth="6" className="stroke-surface-2" />
                    <motion.circle cx="32" cy="32" r="27" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-accent"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: s.years / MAX_YEARS }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.5, ease: EASE, delay: 0.2 }} />
                  </svg>
                  <b className="absolute inset-0 flex items-center justify-center font-display text-lg font-extrabold">{s.years}</b>
                </div>
                <div>
                  <h3 className="m-0 font-display text-lg font-bold">{s.name}</h3>
                  <small className="block text-xs font-semibold text-faint">{s.years} yrs in production</small>
                </div>
              </div>
              <p className="m-0 text-sm text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.skillGroups.map((g, i) => (
            <Reveal key={g.name} delay={(i % 3) * 0.07} className={`${card} p-[22px]`}>
              <h3 className="mb-3 mt-0 flex items-center gap-2.5 font-display text-base font-bold before:h-2 before:w-2 before:rotate-45 before:rounded-[2px] before:bg-accent">{g.name}</h3>
              <div className="flex flex-wrap gap-1.5">{g.items.map((t) => <span key={t} className={chip}>{t}</span>)}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className={`${card} rounded-3xl p-[26px]`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="m-0 flex items-center gap-2.5 font-display text-lg font-bold">
                <i className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FFA116] text-[#1a1a1a]"><Icon name="leetcode" className="h-[18px] w-[18px]" /></i>
                Coding Profile
              </h3>
              <a href={L.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-accent">View Profile <Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a>
            </div>
            <div className="mt-[18px] flex items-baseline gap-2.5">
              <CountUp value={L.solved} className="font-display text-[56px] font-extrabold leading-none tracking-[-0.04em]" />
              <span className="font-semibold text-muted">problems solved on LeetCode</span>
            </div>
            <div role="img" aria-label={`${L.easy} easy, ${L.medium} medium, ${L.hard} hard`} className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface-2">
              {[[L.easy, "#00B8A3"], [L.medium, "#FFC01E"], [L.hard, "#FF375F"]].map(([v, c], i) => (
                <motion.i key={c} className="block h-full" style={{ background: c }} initial={{ width: 0 }} whileInView={{ width: `${(v / L.solved) * 100}%` }}
                  viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.3, ease: EASE, delay: i * 0.15 }} />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-semibold text-muted">
              {[[L.easy, "Easy", "#00B8A3"], [L.medium, "Medium", "#FFC01E"], [L.hard, "Hard", "#FF375F"]].map(([v, t, c]) => (
                <span key={t} className="flex items-center gap-[7px]"><i className="h-[9px] w-[9px] rounded-full" style={{ background: c }} /><b className="text-ink">{v}</b> {t}</span>
              ))}
            </div>
            <span className="mt-[18px] inline-flex items-center gap-2 rounded-full bg-[#FFA116]/15 px-3.5 py-[7px] text-[13px] font-bold text-[#C77A00] dark:text-[#FFB84D]">🏅 {L.badge}</span>
            <div className="mt-4">
              <small className="mb-2 block text-[12.5px] font-semibold text-faint">Focus areas · solved in {L.langs}</small>
              <div className="flex flex-wrap gap-1.5">{L.focus.map((t) => <span key={t} className={chip}>{t}</span>)}</div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className={`${card} rounded-3xl p-[26px]`}>
            <h3 className="mb-1.5 mt-0 font-display text-lg font-bold">Domain</h3>
            <p className="mb-4 mt-0 text-sm text-muted">Industries I've built production systems for.</p>
            <div className="grid gap-2">
              {DATA.domains.map((d, i) => (
                <span key={d} className="flex items-center gap-3 rounded-[14px] bg-surface-2 px-3.5 py-[11px] text-[14.5px] font-semibold transition-all duration-300 hover:translate-x-1.5 hover:bg-soft">
                  <i aria-hidden className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[9px] bg-soft text-sm not-italic text-accent">{["◆", "▣", "▲", "◎", "◉"][i % 5]}</i>{d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function ProjectImage({ p }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden" style={{ background: `linear-gradient(140deg, ${p.accent}80, ${p.accent}14)` }}>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-[100px] font-extrabold opacity-40" style={{ color: p.accent }}>{p.title[0]}</span>
      {!failed && <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105" />}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute left-3.5 top-3.5 z-[1] rounded-full bg-surface/95 px-[11px] py-[5px] text-xs font-bold">{p.tag}</span>
      {p.featured && <span className="absolute right-3.5 top-3.5 z-[1] rounded-full bg-accent px-2.5 py-[5px] text-[11.5px] font-bold text-white">★ Featured</span>}
      {p.link && (
        <span className="absolute bottom-3.5 right-3.5 z-[1] flex h-11 w-11 translate-y-3 scale-75 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <Icon name="arrowUpRight" className="h-[18px] w-[18px]" />
        </span>
      )}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? DATA.projects : DATA.projects.filter((p) => p.cat.includes(filter));
  return (
    <section id="projects" className="pb-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap">
        <SectionHead kicker="Featured Work" title="" accent="Projects">
          <div role="group" aria-label="Filter projects" className="inline-flex gap-1 rounded-full border border-line bg-surface p-1">
            {FILTERS.map(([k, label]) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}
                className={`relative rounded-full px-[18px] py-[9px] text-sm font-bold transition-colors ${filter === k ? "text-white" : "text-muted hover:text-ink"}`}>
                {filter === k && <motion.span layoutId="pf-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", bounce: 0.2, duration: 0.45 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </SectionHead>
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => {
              const Card = p.link ? motion.a : motion.div;
              const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <Card key={p.title} {...linkProps} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow)]"
                  style={{ "--pc": p.accent }}>
                  <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-[9px]">
                    <i className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]" /><i className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" /><i className="h-[9px] w-[9px] rounded-full bg-[#28C840]" />
                    <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-surface px-2.5 py-[3px] text-center text-[11.5px] font-semibold text-faint">{p.link ? hostOf(p.link) : p.title.split(" — ")[0]}</span>
                  </div>
                  <ProjectImage p={p} />
                  <div className="flex flex-1 flex-col px-[22px] pb-[22px] pt-5">
                    <h3 className="m-0 font-display text-[19px] font-bold leading-[1.3] tracking-[-0.01em]">{p.title}</h3>
                    <p className="mb-0 mt-2.5 line-clamp-4 text-[14.5px] text-muted">{p.desc}</p>
                    <Tags items={p.skills} />
                    <span className="mt-3 flex justify-between gap-2.5 text-[12.5px] text-faint">
                      <span>{p.link ? "Live demo ↗" : "Personal project"}</span>{p.period && <b className="font-bold text-muted">{p.period}</b>}
                    </span>
                  </div>
                </Card>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Experience ── */
function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <section id="experience" className="pb-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap">
        <SectionHead kicker="Experience Timeline" title="My Professional" accent="Journey" sub="Each role shaped a different dimension of my engineering craft." />
        <div ref={ref} className="relative">
          <span aria-hidden className="absolute bottom-0 left-3 top-0 w-0.5 -translate-x-1/2 bg-line md:left-1/2" />
          <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-0 left-3 top-0 w-0.5 origin-top -translate-x-1/2 bg-accent md:left-1/2" />
          {DATA.experiences.map((e, i) => <TimelineItem key={e.year} e={e} left={i % 2 === 0} current={i === 0} />)}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ e, left, current }) {
  const dot = useRef(null);
  const [lit, setLit] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: dot, offset: ["start 60%", "start 59%"] });
  useEffect(() => scrollYProgress.on("change", (v) => setLit(v > 0)), [scrollYProgress]);
  const shown = open ? e.points : e.points.slice(0, 3);
  return (
    <div className={`relative mb-10 flex justify-end ${left ? "md:justify-start" : "md:justify-end"}`}>
      <span ref={dot} aria-hidden className={`absolute left-3 top-[30px] z-[1] h-5 w-5 -translate-x-1/2 rounded-full border-[3px] transition-all duration-500 md:left-1/2 ${lit ? "scale-110 border-accent bg-accent shadow-[0_0_0_6px_var(--soft)]" : "border-line bg-bg"}`} />
      <Reveal y={0} className="w-[calc(100%-40px)] rounded-3xl border border-line bg-surface p-7 transition-shadow duration-500 hover:shadow-[var(--shadow)] md:w-[calc(50%-46px)]">
        <motion.div initial={{ x: left ? -40 : 40 }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-[5px] text-[13px] font-bold text-accent">
            {e.year}{current && <span className="rounded-full bg-mint px-[9px] py-0.5 text-[11px] text-white">Now</span>}
          </span>
          <h3 className="mb-0.5 mt-3.5 font-display text-[clamp(20px,2.2vw,24px)] font-bold tracking-[-0.01em]">{e.role}</h3>
          <div className="font-bold">{e.company}</div>
          <div className="text-[13.5px] text-faint">{e.client}</div>
          <ul className="mb-0 mt-3.5 grid list-none gap-[9px] p-0">
            <AnimatePresence initial={false}>
              {shown.map((p, k) => (
                <motion.li key={k} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
                  className="relative pl-5 text-[14.5px] leading-relaxed text-muted before:absolute before:left-[3px] before:top-[0.6em] before:h-[7px] before:w-[7px] before:rotate-45 before:rounded-[2px] before:bg-accent">
                  {p}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {e.points.length > 3 && (
            <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-[7px] text-[13px] font-bold text-accent transition-colors hover:border-accent hover:bg-soft">
              {open ? "Show less" : `Show all ${e.points.length} highlights`}
              <Icon name="arrow" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`} />
            </button>
          )}
          <Tags items={e.skills} />
        </motion.div>
      </Reveal>
    </div>
  );
}

/* ── Contact ── */
function Contact({ onCopied }) {
  const row = "flex items-center gap-3.5 rounded-[18px] border border-white/10 bg-white/[0.06] px-4 py-3.5 transition-all duration-500 hover:translate-x-1.5 hover:bg-white/10";
  const ico = "flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[13px] bg-[#FF4D5E]/20 text-[#FF8A97]";
  return (
    <section id="contact" className="pb-[clamp(84px,11vw,140px)]">
      <div className="pf-wrap">
        <Reveal className="pf-on-navy relative overflow-hidden rounded-[36px] bg-navy p-[clamp(32px,6vw,72px)] text-[#F3F1F6]">
          <div aria-hidden className="pf-drift pointer-events-none absolute -right-40 -top-52 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,77,94,.55),transparent_70%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-3.5">
                <span className="relative h-16 w-16 overflow-hidden rounded-full bg-[#FF4D5E] shadow-[0_0_0_3px_rgba(255,255,255,.2)]"><img src={DATA.avatarFace} alt="" className="absolute inset-0 h-full w-full object-cover" /></span>
                <div><b className="block font-display text-lg">{DATA.name.join(" ")}</b><small className="text-white/60">{DATA.label}</small></div>
              </div>
              <Kicker className="text-[#FF8A97]!">Get In Touch</Kicker>
              <h2 className="mt-4 font-display text-[clamp(34px,4.8vw,60px)] font-extrabold leading-[1.03] tracking-[-0.035em]">
                Let's build something <em className="not-italic text-[#FF6B7A]">extraordinary</em> together.
              </h2>
              <p className="mt-[18px] max-w-[520px] text-white/70">{DATA.contactText}</p>
              <div className="mt-[22px] flex flex-wrap gap-1.5">
                {DATA.contactBadges.map((b) => <span key={b} className="rounded-full border border-white/20 px-3 py-1.5 text-[12.5px] font-semibold text-white/85">{b}</span>)}
              </div>
              <div className="mt-[30px] flex flex-wrap gap-2.5">
                <a href={DATA.mailto} className="pf-btn pf-btn-accent">Send a Message <Icon name="arrow" /></a>
                <a href={DATA.cv} download={DATA.cvFileName} className="pf-btn pf-btn-ghost">Download CV <Icon name="download" /></a>
              </div>
            </div>
            <div className="grid gap-2.5">
              <div className={row}><span className={ico}><Icon name="mail" className="h-[18px] w-[18px]" /></span><div className="min-w-0"><small className="block text-xs text-white/55">Email</small><a href={`mailto:${DATA.email}`} className="break-all font-bold">{DATA.email}</a></div><CopyButton value={DATA.email} label="email" onCopied={onCopied} /></div>
              <div className={row}><span className={ico}><Icon name="phone" className="h-[18px] w-[18px]" /></span><div><small className="block text-xs text-white/55">Phone</small><a href={DATA.phoneHref} className="font-bold">{DATA.phone}</a></div><CopyButton value={DATA.phone} label="phone" onCopied={onCopied} /></div>
              <div className={row}><span className={ico}><Icon name="pin" className="h-[18px] w-[18px]" /></span><div><small className="block text-xs text-white/55">Location</small><b>{DATA.location}</b></div></div>
              <div className={row}><span className={`${ico} bg-[#3DD9A7]/15!`}><i className="pf-ping h-2.5 w-2.5 rounded-full bg-[#3DD9A7] text-[#3DD9A7]" /></span><div><b>Open to Opportunities</b><small className="block text-xs text-white/55">Freelance &amp; full-time</small></div></div>
              <Socials light className="mt-1.5" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Back to top (ring shows page progress) ── */
function BackToTop() {
  const { y } = useScrollState();
  const { scrollYProgress } = useScroll();
  return (
    <a href="#home" aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-line bg-surface shadow-[var(--shadow)] transition-all duration-500 ${y > 900 ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <svg viewBox="0 0 52 52" aria-hidden className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] -rotate-90">
        <motion.circle cx="26" cy="26" r="24" fill="none" strokeWidth="2.5" className="stroke-accent" style={{ pathLength: scrollYProgress }} />
      </svg>
      <Icon name="arrowUp" className="h-[18px] w-[18px]" />
    </a>
  );
}