// Tailwind CSS v4
// npm install tailwindcss @tailwindcss/vite framer-motion
// index.html <head>:
//   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet">
// src/index.css must contain the theme tokens (see index.css).

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
  animate,
} from "framer-motion";

const profileImage = "/profile.png";

/* ─────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.486 17.523 2 12 2z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M4.98 3.5C4.98 4.604 4.104 5.5 3 5.5S1.02 4.604 1.02 3.5 1.896 1.5 3 1.5s1.98.896 1.98 2zM1 8h4v13H1zM8 8h3.8v1.8h.05c.53-1 1.82-2.05 3.75-2.05C19.5 7.75 21 10 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H8z" />
  </svg>
);
const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M14.1 2l-1.4 1.4 6.5 6.6-6.5 6.6 1.4 1.4L22 10zM8.5 7L2 13.5 8.5 20l1.4-1.4-5.1-5.1 5.1-5.1z" />
  </svg>
);
const ArrowRight = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const ArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   TEXTURES & ATMOSPHERE
   ───────────────────────────────────────────── */
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

const Orb = ({ className, animated = false }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute rounded-full blur-[120px] ${animated ? "animate-mesh" : ""} ${className}`}
  />
);

/* Mouse-following spotlight glow layer for cards */
function useSpotlight() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return { ref, onMouseMove };
}

/* ─────────────────────────────────────────────
   PRIMITIVES
   ───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-bd bg-surface px-4 py-1.5 backdrop-blur-sm">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
    </span>
    <span className="font-['DM_Sans'] text-xs font-medium uppercase tracking-[0.25em] text-cyan">
      {children}
    </span>
  </div>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-bd bg-surface px-3 py-1.5 font-['DM_Sans'] text-xs font-medium text-ink-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan">
    {children}
  </span>
);

/* Magnetic button — subtly pulls toward the cursor (disabled w/ reduced motion) */
function Magnetic({ children, strength = 0.35, className = "", ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Count-up number that fires when scrolled into view */
function CountUp({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const reduce = useReducedMotion();
  const fired = useRef(false);

  useEffect(() => {
    const num = parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
    if (reduce) {
      setDisplay(String(num));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const controls = animate(0, num, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) =>
              setDisplay(Number.isInteger(num) ? Math.round(v).toString() : v.toFixed(0)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   THEME
   ───────────────────────────────────────────── */
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("pf-theme");
    setDark(saved ? saved === "dark" : true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("pf-theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

const ThemeToggle = ({ dark, toggle }) => (
  <button
    onClick={toggle}
    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-bd bg-surface text-ink-soft transition-all hover:border-cyan/40 hover:text-cyan"
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
        transition={{ duration: 0.25 }}
      >
        {dark ? <MoonIcon /> : <SunIcon />}
      </motion.span>
    </AnimatePresence>
  </button>
);

/* ══════════════════════════════════════════════════════════ */
export default function Portfolio2026() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { dark, toggle } = useTheme();
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 800);
      const sections = navItems.map((n) => document.getElementById(n.id));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top <= 140);
      if (current) setActiveSection(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  const skills = [
    { name: ".NET Core", level: 95, icon: "⬡", desc: "Enterprise APIs & microservices" },
    { name: "ASP.NET MVC", level: 92, icon: "◈", desc: "Web apps & REST endpoints" },
    { name: "React.js", level: 88, icon: "◎", desc: "Dynamic frontends & SPAs" },
    { name: "Node.js", level: 82, icon: "◉", desc: "Server-side JS & tooling" },
    { name: "SQL Server", level: 90, icon: "▣", desc: "Relational DBs & procedures" },
    { name: "Oracle DB", level: 85, icon: "◆", desc: "Enterprise database systems" },
    { name: "MongoDB", level: 80, icon: "◐", desc: "NoSQL & document stores" },
    { name: "C#", level: 95, icon: "◑", desc: "Core language & patterns" },
  ];

  const services = [
    {
      title: "Full Stack Web Apps",
      icon: "◎",
      desc: "End-to-end product builds with React frontends and .NET / Node back ends — auth, payments, and real-time features included.",
    },
    {
      title: "API & Systems Design",
      icon: "⬡",
      desc: "Clean, versioned REST APIs, service layering, and database modelling built to scale from prototype to production.",
    },
    {
      title: "Performance & Migration",
      icon: "▲",
      desc: "Legacy modernisation and tuning — I've cut report times by 80% and page loads from minutes to seconds.",
    },
    {
      title: "Database Engineering",
      icon: "▣",
      desc: "SQL Server, Oracle & MongoDB schema design, stored procedures, and query optimisation for data-heavy workloads.",
    },
  ];

  const marquee = [
    "C#", ".NET Core", "ASP.NET MVC", "React.js", "Node.js", "Express.js",
    "SQL Server", "Oracle", "MongoDB", "Entity Framework", "REST APIs",
    "Tailwind CSS", "Git", "SWIFT Integration", "Multithreading",
  ];

  const experiences = [
    {
      year: "2025 – Present",
      role: "Software Engineer",
      company: "Clover Infotech",
      client: "Client: HDFC Bank",
      description:
        "Leading development of an in-house Mutual Fund & Bond Trading platform serving 4000+ active users. Implemented SWIFT payment integration, combined SWIFT generation, and third-party Email APIs for automated notifications.",
      gradient: "from-cyan to-violet",
      align: "right",
      skills: ["C#", ".NET Core", "ASP.NET MVC", "SQL Server", "Windows Forms", "React", "SWIFT"],
    },
    {
      year: "2024 – 2025",
      role: "Software Engineer",
      company: "Sodel Software Solutions",
      client: "E-Learning Domain",
      description:
        "Built a dynamic assessment platform with real-time tracking, Google/Microsoft OAuth, and multithreaded report generation for 10,000+ records — cutting report time by 80% and optimising 15+ pages by 25%.",
      gradient: "from-violet to-pink",
      align: "left",
      skills: ["ASP.NET", "C#", "Entity Framework", "MySQL", "AJAX", "jQuery", "Multithreading"],
    },
    {
      year: "2022 – 2024",
      role: "Software Developer",
      company: "Osource Global",
      client: "HRMS Applications",
      description:
        "Migrated 3 HRMS projects from .NET 4.0 → 4.8, reducing errors by 50%. Optimised page load from 3 min → 5 sec. Built RESTful APIs and Oracle stored procedures for scalable HRMS architecture.",
      gradient: "from-cyan to-green",
      align: "right",
      skills: [".NET Framework", ".NET Core", "Oracle SQL", "REST API", "C#", "Performance"],
    },
    {
      year: "2022",
      role: "Junior Software Engineer",
      company: "Greytrix India",
      client: "CRM Application",
      description:
        "Contributed to CRM development with ASP.NET MVC. Participated in migration to Node.js + React.js stack. Used Git/GitLab for version control and collaborated on feature delivery and bug fixes.",
      gradient: "from-pink to-violet",
      align: "left",
      skills: ["ASP.NET MVC", "React.js", "Node.js", "Git", "GitLab", "JavaScript"],
    },
  ];

  const projects = [
    {
      title: "E-Commerce Application",
      tag: "Retail · Full Stack",
      desc: "Scalable e-commerce platform with product catalog, cart, and secure checkout. Built using MERN stack with JWT authentication and payment gateway integration.",
      gradient: "from-[#F59E0B]/20 to-[#10B981]/10",
      accentFrom: "#F59E0B",
      skills: ["ReactJS", "NodeJS", "MongoDB", "ExpressJS"],
      image: "/E-commerce.png",
      link: "https://markethub-app.vercel.app/",
    },
    {
      title: "ViewBlog — Blog Platform",
      tag: "MERN Stack · CMS",
      desc: "Modern blogging platform with authentication, article publishing, image uploads, dark/light mode, and a fully responsive design.",
      gradient: "from-[#3B82F6]/20 to-[#06B6D4]/10",
      accentFrom: "#3B82F6",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
      image: "/Blog.png",
      link: "https://blog-applications.onrender.com",
    },
    {
      title: "HRMS Migration & Optimisation",
      tag: "Enterprise · HRMS",
      desc: "Migrated 3 HRMS apps from .NET 4.0 → 4.8. Page load cut from 3 minutes to 5 seconds with optimised Oracle procedures.",
      gradient: "from-green/20 to-cyan/10",
      accentFrom: "#34D399",
      skills: [".NET Core", "Oracle SQL", "REST API"],
      image: "/images/hrms.png",
      link: "https://example.com/hrms",
    },
  ];

  const socials = [
    { Icon: GithubIcon, href: "https://github.com/Mrajbhar", label: "GitHub" },
    { Icon: LinkedinIcon, href: "https://www.linkedin.com/in/mohan-rajbhar/", label: "LinkedIn" },
    { Icon: LeetcodeIcon, href: "https://leetcode.com/u/Mrajbhar/", label: "LeetCode" },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-bg font-['DM_Sans'] text-ink"
      style={{ backgroundImage: noiseBg }}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan via-violet to-pink"
      />

      {/* Ambient mesh orbs */}
      <Orb animated className="left-[-20%] top-[-10%] h-[700px] w-[700px] bg-cyan/[0.07]" />
      <Orb animated className="right-[-15%] top-[30%] h-[600px] w-[600px] bg-violet/[0.09]" />
      <Orb animated className="bottom-[10%] left-[10%] h-[500px] w-[500px] bg-pink/[0.06]" />

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-500 ${
            scrolled
              ? "mx-4 rounded-2xl border border-bd bg-bg/70 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:mx-6 lg:mx-8"
              : ""
          }`}
        >
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet shadow-[0_0_20px_var(--glow-cyan)]">
              <span className="font-['Syne'] text-sm font-black text-on-accent">MR</span>
            </div>
            <span className="hidden font-['Syne'] text-sm font-bold tracking-wider text-ink-soft transition-colors group-hover:text-ink sm:block">
              Shreemohan Rajbhar
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`relative rounded-lg px-4 py-2 font-['DM_Sans'] text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id ? "text-ink" : "text-ink-faint hover:text-ink"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-surface-2"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle dark={dark} toggle={toggle} />
            <Magnetic className="hidden sm:block">
              <a
                href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-5 py-2.5 font-['DM_Sans'] text-sm font-semibold text-on-accent shadow-[0_0_20px_var(--glow-cyan)] transition-all duration-300 hover:shadow-[0_0_30px_var(--glow-cyan-strong)]"
              >
                Hire Me <ArrowRight />
              </a>
            </Magnetic>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-bd bg-surface text-ink transition-all hover:bg-surface-2 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenu}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span animate={{ rotate: mobileMenu ? 45 : 0, y: mobileMenu ? 7 : 0 }} className="block h-[1.5px] w-5 origin-center bg-ink" />
                <motion.span animate={{ opacity: mobileMenu ? 0 : 1, scaleX: mobileMenu ? 0 : 1 }} className="block h-[1.5px] w-5 bg-ink" />
                <motion.span animate={{ rotate: mobileMenu ? -45 : 0, y: mobileMenu ? -7 : 0 }} className="block h-[1.5px] w-5 origin-center bg-ink" />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-bd bg-bg-soft/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-['DM_Sans'] text-sm font-medium transition-all ${
                    activeSection === item.id ? "bg-surface-2 text-ink" : "text-ink-faint hover:bg-surface hover:text-ink"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
                </motion.a>
              ))}
              <div className="mt-3 border-t border-bd pt-3">
                <a
                  href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet py-3 font-['DM_Sans'] text-sm font-semibold text-on-accent"
                >
                  Hire Me <ArrowRight />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 lg:flex-row lg:gap-20 lg:pt-0"
        >
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 inline-flex">
              <SectionLabel>Full Stack .NET Developer · Mumbai</SectionLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-['Syne'] text-5xl font-black leading-[1.0] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[82px]"
            >
              Shreemohan
              <br />
              <span className="text-grad-brand">Rajbhar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink-soft lg:mx-0 lg:text-lg"
            >
              4+ years crafting scalable web & desktop applications — from sleek React frontends to robust .NET backends. I turn complex problems into elegant, high-performance software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {[".NET Core", "React.js", "Node.js", "SQL Server", "Oracle", "MongoDB"].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Magnetic>
                <a
                  href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                  className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet px-7 py-4 font-['DM_Sans'] text-sm font-semibold text-on-accent shadow-[0_0_30px_var(--glow-cyan)] transition-all duration-300 hover:shadow-[0_0_50px_var(--glow-cyan-strong)]"
                >
                  Get In Touch
                  <motion.span animate={reduce ? {} : { x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight />
                  </motion.span>
                </a>
              </Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-bd-strong bg-surface px-7 py-4 font-['DM_Sans'] text-sm font-semibold text-ink-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-2 hover:text-ink"
              >
                Download CV <ExternalLink />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
            >
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-bd bg-surface text-ink-faint backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon />
                </a>
              ))}
              <div className="h-[1px] w-8 bg-bd-strong" />
              <span className="font-['DM_Sans'] text-xs text-ink-ghost">Find me online</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mt-14 flex-shrink-0 lg:mt-0"
          >
            <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] rounded-full border border-dashed border-cyan/15" />
            <motion.div animate={reduce ? {} : { rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] rounded-full border border-violet/10">
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_20px_var(--glow-cyan-strong)]" />
            </motion.div>

            <motion.div animate={reduce ? {} : { y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative">
              <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-cyan/20 via-violet/15 to-pink/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-bd bg-gradient-to-b from-surface-2 to-surface p-1 shadow-[var(--shadow-float)]">
                <img
                  src={profileImage}
                  alt="Shreemohan Rajbhar"
                  loading="eager"
                  className="h-[400px] w-[300px] rounded-[28px] object-cover object-top sm:h-[480px] sm:w-[360px] lg:h-[540px] lg:w-[400px]"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-bd bg-bg/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-['Syne'] text-xs font-bold uppercase tracking-widest text-ink-faint">Experience</p>
                      <p className="font-['Syne'] text-2xl font-black text-ink"><CountUp value="4" suffix="+ Years" /></p>
                    </div>
                    <div className="h-8 w-[1px] bg-bd" />
                    <div>
                      <p className="font-['Syne'] text-xs font-bold uppercase tracking-widest text-ink-faint">Projects</p>
                      <p className="font-['Syne'] text-2xl font-black text-ink"><CountUp value="20" suffix="+" /></p>
                    </div>
                    <div className="h-8 w-[1px] bg-bd" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_8px_#34D399]" />
                        <p className="font-['Syne'] text-xs font-bold text-green">Available</p>
                      </div>
                      <p className="mt-0.5 font-['DM_Sans'] text-xs text-ink-faint">For hire</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-label="Scroll to about"
        >
          <span className="font-['DM_Sans'] text-[10px] uppercase tracking-[0.3em] text-ink-ghost">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-bd-strong to-transparent" />
        </motion.a>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative border-y border-bd bg-surface/40 py-5 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max animate-marquee gap-10">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-['Syne'] text-lg font-bold text-ink-ghost">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-cyan/50" />
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel>About Me</SectionLabel>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
              <h2 className="font-['Syne'] text-4xl font-black leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                Building software that <span className="text-grad-brand">scales & performs.</span>
              </h2>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: "4", suffix: "+", label: "Years Exp." },
                  { value: "20", suffix: "+", label: "Projects" },
                  { value: "50", suffix: "%", label: "Error Reduction" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-bd bg-surface p-5 backdrop-blur-sm">
                    <p className="font-['Syne'] text-3xl font-black text-ink"><CountUp value={s.value} suffix={s.suffix} /></p>
                    <p className="mt-1 font-['DM_Sans'] text-xs text-ink-faint">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5 text-base leading-relaxed text-ink-soft lg:text-lg"
            >
              <p>I'm a passionate Full Stack Developer with 4+ years of experience designing and developing scalable web and desktop applications. I specialise in modern .NET ecosystems paired with contemporary JavaScript frontends.</p>
              <p>My work spans financial trading platforms at HDFC Bank, e-learning assessment engines, enterprise HRMS systems, and CRM applications — always with a focus on clean architecture, performance, and exceptional user experience.</p>
              <p>I thrive on turning complex requirements into elegant solutions, whether that means cutting report generation time by 80%, migrating legacy codebases, or building seamless SWIFT payment integrations.</p>
              <div className="pt-2">
                <a href="mailto:m.rajbhar1235@gmail.com" className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-medium text-cyan transition-all hover:gap-3">
                  Let's work together <ArrowRight />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
            <SectionLabel>What I Do</SectionLabel>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 font-['Syne'] text-4xl font-black text-ink sm:text-5xl lg:text-6xl">
            Services & Strengths
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <SpotlightCard key={s.title} delay={i * 0.08}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-bd bg-gradient-to-br from-cyan/15 to-violet/15 text-xl text-cyan">
                  {s.icon}
                </div>
                <h3 className="font-['Syne'] text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 font-['DM_Sans'] text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
            <SectionLabel>Skills & Expertise</SectionLabel>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 font-['Syne'] text-4xl font-black text-ink sm:text-5xl lg:text-6xl">
            Tech Arsenal
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, i) => (
              <SpotlightCard key={skill.name} delay={i * 0.06} hoverLift>
                <div className="absolute -right-4 -top-4 text-[80px] font-black text-ink/[0.03] transition-all duration-500 group-hover:text-ink/[0.06]">
                  {skill.icon}
                </div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-bd bg-gradient-to-br from-cyan/15 to-violet/15 text-xl text-cyan">
                    {skill.icon}
                  </div>
                  <h3 className="font-['Syne'] text-lg font-bold text-ink">{skill.name}</h3>
                  <p className="mt-1.5 font-['DM_Sans'] text-xs text-ink-faint">{skill.desc}</p>
                </div>
                <div className="relative z-10 mt-5">
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                    />
                  </div>
                  <p className="mt-2 text-right font-['DM_Sans'] text-[10px] text-ink-ghost">{skill.level}%</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
            <SectionLabel>Featured Work</SectionLabel>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 font-['Syne'] text-4xl font-black text-ink sm:text-5xl lg:text-6xl">
            Projects
          </motion.h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative px-4 py-24 sm:px-6 lg:py-36">
        <div className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-bd to-transparent md:block" />
        <div className="absolute left-[19px] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-bd to-transparent md:hidden" />
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 md:text-center">
            <SectionLabel>Experience Timeline</SectionLabel>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 font-['Syne'] text-4xl font-black text-ink sm:text-5xl lg:text-6xl xl:text-7xl md:text-center">
            My Professional Journey
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 max-w-2xl font-['DM_Sans'] text-base text-ink-faint lg:text-lg md:mx-auto md:text-center">
            Each role shaped a different dimension of my engineering craft.
          </motion.p>

          <div className="relative mt-20 space-y-10 md:space-y-16 lg:space-y-24">
            {experiences.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex pl-12 md:pl-0 ${item.align === "left" ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* node — centered on desktop, left rail on mobile */}
                <div className="absolute left-[14px] top-9 md:left-1/2 md:top-10 md:-translate-x-1/2">
                  <span className="relative flex h-3 w-3">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r ${item.gradient} opacity-40`} />
                    <span className={`relative inline-flex h-3 w-3 rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_12px_var(--glow-cyan)]`} />
                  </span>
                </div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative w-full overflow-hidden rounded-2xl border border-bd bg-surface p-6 backdrop-blur-sm transition-all duration-300 hover:border-bd-strong hover:bg-surface-2 hover:shadow-[var(--shadow-card-hover)] sm:p-8 md:w-[46%]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                  <div className="relative z-10">
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${item.gradient} px-4 py-1.5 font-['DM_Sans'] text-xs font-bold tracking-wider text-on-accent`}>
                      {item.year}
                    </div>
                    <div className="mt-5">
                      <h3 className="font-['Syne'] text-2xl font-black text-ink sm:text-3xl">{item.role}</h3>
                      <p className={`mt-1.5 bg-gradient-to-r font-['Syne'] text-base font-semibold ${item.gradient} bg-clip-text text-transparent sm:text-lg`}>{item.company}</p>
                      <p className="mt-0.5 font-['DM_Sans'] text-sm text-ink-faint">{item.client}</p>
                    </div>
                    <p className="mt-5 font-['DM_Sans'] text-sm leading-relaxed text-ink-soft sm:text-base">{item.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (<Badge key={skill}>{skill}</Badge>))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
            <SectionLabel>Get In Touch</SectionLabel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-3xl border border-bd bg-surface p-8 backdrop-blur-sm sm:p-12 lg:p-16"
          >
            <div className="relative">
              <Orb animated className="right-0 top-0 h-[300px] w-[300px] bg-cyan/[0.08]" />
              <Orb animated className="bottom-0 left-0 h-[200px] w-[200px] bg-violet/[0.08]" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <h2 className="font-['Syne'] text-4xl font-black leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                    Let's build something <span className="text-grad-brand">extraordinary</span> together.
                  </h2>
                  <p className="mt-6 max-w-lg font-['DM_Sans'] text-base leading-relaxed text-ink-soft lg:text-lg">
                    Available for full-time roles and freelance projects. I bring 4+ years of .NET, React, and database expertise to every engagement.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["React.js Development", ".NET Core APIs", "Full Stack Development", "Database Management"].map((s) => (<Badge key={s}>{s}</Badge>))}
                  </div>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Magnetic>
                      <a
                        href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                        className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet px-8 py-4 font-['DM_Sans'] text-sm font-semibold text-on-accent shadow-[0_0_30px_var(--glow-cyan)] transition-all duration-300 hover:shadow-[0_0_50px_var(--glow-cyan-strong)]"
                      >
                        Send a Message
                        <motion.span animate={reduce ? {} : { x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight /></motion.span>
                      </a>
                    </Magnetic>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-bd-strong bg-surface px-8 py-4 font-['DM_Sans'] text-sm font-semibold text-ink-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
                    >
                      Download CV <ExternalLink />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  {[
                    { label: "Email", value: "m.rajbhar1235@gmail.com", href: "mailto:m.rajbhar1235@gmail.com", isLink: true },
                    { label: "Phone", value: "+91 7208955201", href: "tel:+917208955201", isLink: true },
                    { label: "Location", value: "Mumbai, India", isLink: false },
                  ].map((detail) => (
                    <div key={detail.label} className="rounded-2xl border border-bd bg-surface p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-bd-strong">
                      <p className="font-['DM_Sans'] text-xs uppercase tracking-[0.2em] text-ink-faint">{detail.label}</p>
                      {detail.isLink ? (
                        <a href={detail.href} className="mt-2 block font-['Syne'] text-base font-semibold text-ink transition-colors hover:text-cyan sm:text-lg">{detail.value}</a>
                      ) : (
                        <p className="mt-2 font-['Syne'] text-base font-semibold text-ink sm:text-lg">{detail.value}</p>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center gap-3 rounded-2xl border border-green/20 bg-green/5 p-5">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green" />
                    </span>
                    <div>
                      <p className="font-['Syne'] text-sm font-bold text-green">Open to Opportunities</p>
                      <p className="font-['DM_Sans'] text-xs text-ink-faint">Freelance & full-time</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {socials.map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group flex h-12 w-12 items-center justify-center rounded-xl border border-bd bg-surface text-ink-faint transition-all hover:-translate-y-1 hover:border-cyan/30 hover:text-cyan">
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-bd px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet">
              <span className="font-['Syne'] text-xs font-black text-on-accent">MR</span>
            </div>
            <span className="font-['DM_Sans'] text-sm text-ink-faint">Shreemohan Rajbhar</span>
          </div>
          <p className="font-['DM_Sans'] text-xs text-ink-ghost">© 2026 · Crafted with care in Mumbai</p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-bd bg-bg/80 text-ink shadow-[var(--shadow-card)] backdrop-blur-xl transition-all hover:border-cyan/40 hover:text-cyan"
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Project card (own component so the spotlight hook is valid)
   ───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const sp = useSpotlight();
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={sp.ref}
      onMouseMove={sp.onMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl border border-bd bg-surface backdrop-blur-sm transition-all duration-300 hover:border-bd-strong hover:shadow-[var(--shadow-card-hover)] ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--mx) var(--my), rgba(125,249,255,0.10), transparent 60%)" }}
      />
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute right-4 top-4">
          <span
            className="rounded-full border px-3 py-1 font-['DM_Sans'] text-[10px] font-semibold uppercase tracking-wider text-white/90"
            style={{ borderColor: `${project.accentFrom}40`, background: `${project.accentFrom}25` }}
          >
            {project.tag}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-bg/80 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ExternalLink />
        </div>
      </div>
      <div className="relative z-10 p-6">
        <h3 className="font-['Syne'] text-xl font-bold text-ink transition-colors group-hover:text-cyan">{project.title}</h3>
        <p className="mt-3 font-['DM_Sans'] text-sm leading-relaxed text-ink-soft">{project.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.skills.map((s) => (
            <span key={s} className="rounded-full border border-bd bg-surface px-3 py-1 font-['DM_Sans'] text-[11px] text-ink-soft">{s}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Reusable spotlight card
   ───────────────────────────────────────────── */
function SpotlightCard({ children, delay = 0, hoverLift = false }) {
  const sp = useSpotlight();
  return (
    <motion.div
      ref={sp.ref}
      onMouseMove={sp.onMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={hoverLift ? { y: -6, scale: 1.02 } : { y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-bd bg-surface p-6 backdrop-blur-sm transition-all duration-300 hover:border-bd-strong hover:bg-surface-2 hover:shadow-[var(--shadow-card-hover)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(280px circle at var(--mx) var(--my), rgba(124,92,240,0.12), transparent 60%)" }}
      />
      {children}
    </motion.div>
  );
}
