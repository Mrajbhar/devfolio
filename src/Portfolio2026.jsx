// Tailwind CSS v4 Ready
// npm install tailwindcss @tailwindcss/vite framer-motion
// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
// src/index.css => @import "tailwindcss";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const profileImage = '/profile.png';

/* ─── Icons ─── */
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
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

/* ─── Noise texture SVG as data URI ─── */
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

/* ─── Floating orb component ─── */
const Orb = ({ className }) => (
  <div className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`} />
);

/* ─── Section label ─── */
const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-[#7DF9FF]" />
    <span className="font-['DM_Sans'] text-xs font-medium uppercase tracking-[0.25em] text-[#7DF9FF]">
      {children}
    </span>
  </div>
);

/* ─── Skill badge ─── */
const Badge = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-['DM_Sans'] text-xs font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#7DF9FF]/30 hover:bg-[#7DF9FF]/5 hover:text-[#7DF9FF]">
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Portfolio2026() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map((n) => document.getElementById(n.id));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top <= 120);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const skills = [
    { name: '.NET Core', level: 95, color: '#7DF9FF' },
    { name: 'ASP.NET MVC', level: 92, color: '#A78BFA' },
    { name: 'React.js', level: 88, color: '#7DF9FF' },
    { name: 'Node.js', level: 82, color: '#A78BFA' },
    { name: 'SQL Server', level: 90, color: '#7DF9FF' },
    { name: 'Oracle DB', level: 85, color: '#A78BFA' },
    { name: 'MongoDB', level: 80, color: '#7DF9FF' },
    { name: 'C#', level: 95, color: '#A78BFA' },
  ];

  
  const experiences = [
    {
      year: '2025 – Present',
      role: 'Software Engineer',
      company: 'Clover Infotech',
      client: 'Client: HDFC Bank',
      description:
        'Leading development of an in-house Mutual Fund & Bond Trading platform serving 4000+ active users. Implemented SWIFT payment integration, combined SWIFT generation, and third-party Email APIs for automated notifications.',
      gradient: 'from-[#7DF9FF] to-[#A78BFA]',
      align: 'right',
      skills: ['C#', '.NET Core', 'ASP.NET MVC', 'SQL Server', 'Windows Forms', 'React', 'SWIFT'],
    },
    {
      year: '2024 – 2025',
      role: 'Software Engineer',
      company: 'Sodel Software Solutions',
      client: 'E-Learning Domain',
      description:
        'Built a dynamic assessment platform with real-time tracking, Google/Microsoft OAuth, and multithreaded report generation for 10,000+ records — cutting report time by 80% and optimising 15+ pages by 25%.',
      gradient: 'from-[#A78BFA] to-[#F472B6]',
      align: 'left',
      skills: ['ASP.NET', 'C#', 'Entity Framework', 'MySQL', 'AJAX', 'jQuery', 'Multithreading'],
    },
    {
      year: '2022 – 2024',
      role: 'Software Developer',
      company: 'Osource Global',
      client: 'HRMS Applications',
      description:
        'Migrated 3 HRMS projects from .NET 4.0 → 4.8, reducing errors by 50%. Optimised page load from 3 min → 5 sec. Built RESTful APIs and Oracle stored procedures for scalable HRMS architecture.',
      gradient: 'from-[#7DF9FF] to-[#34D399]',
      align: 'right',
      skills: ['.NET Framework', '.NET Core', 'Oracle SQL', 'REST API', 'C#', 'Performance'],
    },
    {
      year: '2022',
      role: 'Junior Software Engineer',
      company: 'Greytrix India',
      client: 'CRM Application',
      description:
        'Contributed to CRM development with ASP.NET MVC. Participated in migration to Node.js + React.js stack. Used Git/GitLab for version control and collaborated on feature delivery and bug fixes.',
      gradient: 'from-[#F472B6] to-[#A78BFA]',
      align: 'left',
      skills: ['ASP.NET MVC', 'React.js', 'Node.js', 'Git', 'GitLab', 'JavaScript'],
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#080810] font-['DM_Sans'] text-white"
      style={{ backgroundImage: noiseBg }}
    >
      {/* ── Global ambient orbs ── */}
      <Orb className="left-[-20%] top-[-10%] h-[700px] w-[700px] bg-[#7DF9FF]/6" />
      <Orb className="right-[-15%] top-[30%] h-[600px] w-[600px] bg-[#A78BFA]/8" />
      <Orb className="bottom-[10%] left-[10%] h-[500px] w-[500px] bg-[#F472B6]/5" />

      {/* ════════════════════════════════
          NAVBAR
      ════════════════════════════════ */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-all duration-500 ${
            scrolled
              ? 'rounded-2xl border border-white/8 bg-[#080810]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl mx-4 sm:mx-6 lg:mx-8'
              : ''
          }`}
          style={scrolled ? { padding: '12px 20px' } : {}}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7DF9FF] to-[#A78BFA] shadow-[0_0_20px_rgba(125,249,255,0.4)]">
              <span className="font-['Syne'] text-sm font-black text-[#080810]">MR</span>
            </div>
            <span className="hidden font-['Syne'] text-sm font-bold tracking-wider text-white/70 transition-colors group-hover:text-white sm:block">
              Shreemohan Rajbhar
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-lg px-4 py-2 font-['DM_Sans'] text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/8"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] px-5 py-2.5 font-['DM_Sans'] text-sm font-semibold text-[#080810] shadow-[0_0_20px_rgba(125,249,255,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(125,249,255,0.45)] hover:scale-105 sm:flex"
            >
              Hire Me <ArrowRight />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{ rotate: mobileMenu ? 45 : 0, y: mobileMenu ? 7 : 0 }}
                  className="block h-[1.5px] w-5 bg-white origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileMenu ? 0 : 1, scaleX: mobileMenu ? 0 : 1 }}
                  className="block h-[1.5px] w-5 bg-white"
                />
                <motion.span
                  animate={{ rotate: mobileMenu ? -45 : 0, y: mobileMenu ? -7 : 0 }}
                  className="block h-[1.5px] w-5 bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-['DM_Sans'] text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-white/8 text-white'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7DF9FF]" />
                  )}
                </motion.a>
              ))}
              <div className="mt-3 border-t border-white/8 pt-3">
                <a
                  href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] py-3 font-['DM_Sans'] text-sm font-semibold text-[#080810]"
                >
                  Hire Me <ArrowRight />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 lg:flex-row lg:gap-20 lg:pt-0"
        >
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex"
            >
              <SectionLabel>Full Stack .NET Developer · Mumbai</SectionLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-['Syne'] text-5xl font-black leading-[1.0] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[82px]"
            >
              Shreemohan
              <br />
              <span
                className="bg-gradient-to-r from-[#7DF9FF] via-[#A78BFA] to-[#F472B6] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                Rajbhar
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/50 lg:mx-0 lg:text-lg"
            >
              4+ years crafting scalable web & desktop applications — from sleek React frontends
              to robust .NET backends. I turn complex problems into elegant, high-performance
              software.
            </motion.p>

            {/* Tech stack row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {['.NET Core', 'React.js', 'Node.js', 'SQL Server', 'Oracle', 'MongoDB'].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] px-7 py-4 font-['DM_Sans'] text-sm font-semibold text-[#080810] shadow-[0_0_30px_rgba(125,249,255,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(125,249,255,0.5)] hover:scale-105"
              >
                Get In Touch
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight />
                </motion.span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-7 py-4 font-['DM_Sans'] text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Download CV <ExternalLink />
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
            >
              {[
                { Icon: GithubIcon, href: 'https://github.com/Mrajbhar', label: 'GitHub' },
                { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mohan-rajbhar/', label: 'LinkedIn' },
                { Icon: LeetcodeIcon, href: 'https://leetcode.com/u/Mrajbhar/', label: 'LeetCode' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-[#7DF9FF]/40 hover:bg-[#7DF9FF]/10 hover:text-[#7DF9FF] hover:-translate-y-1"
                >
                  <Icon />
                </a>
              ))}
              <div className="h-[1px] w-8 bg-white/15" />
              <span className="font-['DM_Sans'] text-xs text-white/30">Find me online</span>
            </motion.div>
          </div>

          {/* Right — Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mt-14 flex-shrink-0 lg:mt-0"
          >
            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-40px] rounded-full border border-dashed border-[#7DF9FF]/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-20px] rounded-full border border-[#A78BFA]/10"
            >
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7DF9FF] shadow-[0_0_20px_rgba(125,249,255,1)]" />
            </motion.div>

            {/* Card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-br from-[#7DF9FF]/20 via-[#A78BFA]/15 to-[#F472B6]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-1 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <img
                  src={profileImage}
                  alt="Shreemohan Rajbhar"
                  className="h-[400px] w-[300px] rounded-[28px] object-cover object-top sm:h-[480px] sm:w-[360px] lg:h-[540px] lg:w-[400px]"
                />
                {/* Overlay stats card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#080810]/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-['Syne'] text-xs font-bold text-white/40 uppercase tracking-widest">Experience</p>
                      <p className="font-['Syne'] text-2xl font-black text-white">4+ Years</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div>
                      <p className="font-['Syne'] text-xs font-bold text-white/40 uppercase tracking-widest">Projects</p>
                      <p className="font-['Syne'] text-2xl font-black text-white">20+</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
                        <p className="font-['Syne'] text-xs font-bold text-[#34D399]">Available</p>
                      </div>
                      <p className="font-['DM_Sans'] text-xs text-white/40 mt-0.5">For hire</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-['DM_Sans'] text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section id="about" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>About Me</SectionLabel>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            {/* Left — big headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="font-['Syne'] text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                Building software that{' '}
                <span className="bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] bg-clip-text text-transparent">
                  scales & performs.
                </span>
              </h2>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: '4+', label: 'Years Exp.' },
                  { value: '20+', label: 'Projects' },
                  { value: '50%', label: 'Error Reduction' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm"
                  >
                    <p className="font-['Syne'] text-3xl font-black text-white">{s.value}</p>
                    <p className="mt-1 font-['DM_Sans'] text-xs text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5 text-base leading-relaxed text-white/50 lg:text-lg"
            >
              <p>
                I'm a passionate Full Stack Developer with 4+ years of experience designing and
                developing scalable web and desktop applications. I specialise in modern .NET
                ecosystems paired with contemporary JavaScript frontends.
              </p>
              <p>
                My work spans financial trading platforms at HDFC Bank, e-learning assessment
                engines, enterprise HRMS systems, and CRM applications — always with a focus on
                clean architecture, performance, and exceptional user experience.
              </p>
              <p>
                I thrive on turning complex requirements into elegant solutions, whether that
                means cutting report generation time by 80%, migrating legacy codebases, or
                building seamless SWIFT payment integrations.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:m.rajbhar1235@gmail.com"
                  className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-medium text-[#7DF9FF] transition-all hover:gap-3"
                >
                  Let's work together <ArrowRight />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SKILLS
      ════════════════════════════════ */}
      <section id="skills" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionLabel>Skills & Expertise</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-['Syne'] text-4xl font-black text-white sm:text-5xl lg:text-6xl"
          >
            Tech Arsenal
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: '.NET Core', icon: '⬡', desc: 'Enterprise APIs & microservices' },
              { name: 'ASP.NET MVC', icon: '◈', desc: 'Web apps & REST endpoints' },
              { name: 'React.js', icon: '◎', desc: 'Dynamic frontends & SPAs' },
              { name: 'Node.js', icon: '◉', desc: 'Server-side JS & tooling' },
              { name: 'SQL Server', icon: '▣', desc: 'Relational DBs & procedures' },
              { name: 'Oracle DB', icon: '◆', desc: 'Enterprise database systems' },
              { name: 'MongoDB', icon: '◐', desc: 'NoSQL & document stores' },
              { name: 'C#', icon: '◑', desc: 'Core language & patterns' },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/6"
              >
                <div className="absolute -right-4 -top-4 text-[80px] font-black text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06]">
                  {skill.icon}
                </div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7DF9FF]/15 to-[#A78BFA]/15 text-[#7DF9FF] text-xl border border-white/8">
                    {skill.icon}
                  </div>
                  <h3 className="font-['Syne'] text-lg font-bold text-white">{skill.name}</h3>
                  <p className="mt-1.5 font-['DM_Sans'] text-xs text-white/40">{skill.desc}</p>
                </div>

                {/* Skill bar */}
                <div className="relative z-10 mt-5">
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skills.find((s) => s.name === skill.name)?.level ?? 85}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA]"
                    />
                  </div>
                  <p className="mt-2 text-right font-['DM_Sans'] text-[10px] text-white/30">
                    {skills.find((s) => s.name === skill.name)?.level ?? 85}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <section id="projects" className="px-4 py-24 sm:px-6 lg:py-36">
  <div className="mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <SectionLabel>Featured Work</SectionLabel>
    </motion.div>
    <div className="mt-6 flex items-end justify-between">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-['Syne'] text-4xl font-black text-white sm:text-5xl lg:text-6xl"
      >
        Projects
      </motion.h2>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
      {
  title: 'E-Commerce Application',
  tag: 'Retail · Full Stack',
  desc: 'Scalable e-commerce platform with product catalog, cart, and secure checkout. Built using MERN stack with JWT authentication and payment gateway integration.',
  gradient: 'from-[#F59E0B]/20 to-[#10B981]/10',
  accentFrom: '#F59E0B',
  accentTo: '#10B981',
  skills: ['ReactJS', 'NodeJS', 'MongoDB', 'ExpressJS'],
  size: 'lg',
  image: '/E-commerce.png',
  link: 'https://markethub-app.vercel.app/'
},
    {
  title: 'ViewBlog - Full Stack Blog Platform',
  tag: 'MERN Stack · Content Management',
  desc: 'Modern blogging platform built with React.js, Node.js, Express.js, and MongoDB featuring authentication, article publishing, image uploads, dark/light mode, and responsive design.',
  gradient: 'from-[#3B82F6]/20 to-[#06B6D4]/10',
  accentFrom: '#3B82F6',
  accentTo: '#06B6D4',
  skills: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Tailwind CSS',
    'JWT'
  ],
  size: 'md',
  image: '/Blog.png',
  link: 'https://blog-applications.onrender.com'
},
        {
          title: 'HRMS Migration & Optimisation',
          tag: 'Enterprise · HRMS',
          desc: 'Migrated 3 HRMS apps from .NET 4.0→4.8. Page load cut from 3 min to 5 seconds.',
          gradient: 'from-[#34D399]/20 to-[#7DF9FF]/10',
          accentFrom: '#34D399',
          accentTo: '#7DF9FF',
          skills: ['.NET Core', 'Oracle SQL', 'REST API'],
          size: 'md',
          image: '/images/hrms.png',
          link: 'https://example.com/hrms'
        },
      ].map((project, i) => (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          key={project.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-white/15 ${
            i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
          }`}
        >
          {/* Gradient preview area with image */}
          <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute right-4 top-4">
              <span
                className="rounded-full px-3 py-1 font-['DM_Sans'] text-[10px] font-semibold uppercase tracking-wider text-white/80 border"
                style={{ borderColor: `${project.accentFrom}40`, background: `${project.accentFrom}15` }}
              >
                {project.tag}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-['Syne'] text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-3 font-['DM_Sans'] text-sm leading-relaxed text-white/50">{project.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/8 bg-white/4 px-3 py-1 font-['DM_Sans'] text-[11px] text-white/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  </div>
</section>


      {/* ════════════════════════════════
          EXPERIENCE
      ════════════════════════════════ */}
      <section id="experience" className="relative px-4 py-24 sm:px-6 lg:py-36">
        {/* Centre line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-center"
          >
            <SectionLabel>Experience Timeline</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-center font-['Syne'] text-4xl font-black text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            My Professional Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-center font-['DM_Sans'] text-base text-white/40 lg:text-lg"
          >
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
                className={`relative flex ${
                  item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-10 hidden -translate-x-1/2 md:block">
                  <div
                    className={`h-3 w-3 rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_12px_rgba(125,249,255,0.6)]`}
                  />
                </div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative w-full overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/5 sm:p-8 md:w-[46%]"
                >
                  {/* Hover gradient glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                  />

                  <div className="relative z-10">
                    {/* Year badge */}
                    <div
                      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${item.gradient} px-4 py-1.5 font-['DM_Sans'] text-xs font-bold tracking-wider text-[#080810]`}
                    >
                      {item.year}
                    </div>

                    {/* Company */}
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-['Syne'] text-2xl font-black text-white sm:text-3xl">
                          {item.role}
                        </h3>
                        <p
                          className={`mt-1.5 font-['Syne'] text-base font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent sm:text-lg`}
                        >
                          {item.company}
                        </p>
                        <p className="mt-0.5 font-['DM_Sans'] text-sm text-white/30">{item.client}</p>
                      </div>
                    </div>

                    <p className="mt-5 font-['DM_Sans'] text-sm leading-relaxed text-white/50 sm:text-base">
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT
      ════════════════════════════════ */}
      <section id="contact" className="px-4 py-24 sm:px-6 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <SectionLabel>Get In Touch</SectionLabel>
          </motion.div>

          {/* Big CTA headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-8 backdrop-blur-sm sm:p-12 lg:p-16"
          >
            <div className="relative">
              <Orb className="right-0 top-0 h-[300px] w-[300px] bg-[#7DF9FF]/8" />
              <Orb className="bottom-0 left-0 h-[200px] w-[200px] bg-[#A78BFA]/8" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <h2 className="font-['Syne'] text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                    Let's build something{' '}
                    <span className="bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] bg-clip-text text-transparent">
                      extraordinary
                    </span>{' '}
                    together.
                  </h2>
                  <p className="mt-6 max-w-lg font-['DM_Sans'] text-base leading-relaxed text-white/50 lg:text-lg">
                    Available for full-time roles and freelance projects. I bring 4+ years of
                    .NET, React, and database expertise to every engagement.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {['React.js Development', '.NET Core APIs', 'Full Stack Development', 'Database Management'].map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href="mailto:m.rajbhar1235@gmail.com?subject=Hiring%20Inquiry"
                      className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7DF9FF] to-[#A78BFA] px-8 py-4 font-['DM_Sans'] text-sm font-semibold text-[#080810] shadow-[0_0_30px_rgba(125,249,255,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(125,249,255,0.4)] hover:scale-105"
                    >
                      Send a Message
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <ArrowRight />
                      </motion.span>
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-8 py-4 font-['DM_Sans'] text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:text-white"
                    >
                      Download CV <ExternalLink />
                    </a>
                  </div>
                </div>

                {/* Contact details */}
                <div className="flex flex-col justify-center space-y-6">
                  {[
                    { label: 'Email', value: 'm.rajbhar1235@gmail.com', href: 'mailto:m.rajbhar1235@gmail.com', isLink: true },
                    { label: 'Phone', value: '+91 7208955201', href: 'tel:+917208955201', isLink: true },
                    { label: 'Location', value: 'Mumbai, India', isLink: false },
                  ].map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm transition-all hover:border-white/15"
                    >
                      <p className="font-['DM_Sans'] text-xs uppercase tracking-[0.2em] text-white/30">
                        {detail.label}
                      </p>
                      {detail.isLink ? (
                        <a
                          href={detail.href}
                          className="mt-2 block font-['Syne'] text-base font-semibold text-white transition-colors hover:text-[#7DF9FF] sm:text-lg"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-2 font-['Syne'] text-base font-semibold text-white sm:text-lg">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Availability badge */}
                  <div className="flex items-center gap-3 rounded-2xl border border-[#34D399]/20 bg-[#34D399]/5 p-5">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-50" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#34D399]" />
                    </span>
                    <div>
                      <p className="font-['Syne'] text-sm font-bold text-[#34D399]">Open to Opportunities</p>
                      <p className="font-['DM_Sans'] text-xs text-white/40">Freelance & full-time</p>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="flex gap-3">
                    {[
                      { Icon: GithubIcon, href: 'https://github.com/Mrajbhar', label: 'GitHub' },
                      { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mohan-rajbhar/', label: 'LinkedIn' },
                      { Icon: LeetcodeIcon, href: 'https://leetcode.com/u/Mrajbhar/', label: 'LeetCode' },
                    ].map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-white/40 transition-all hover:border-[#7DF9FF]/30 hover:bg-[#7DF9FF]/8 hover:text-[#7DF9FF]"
                      >
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

      {/* Footer */}
      <footer className="border-t border-white/6 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7DF9FF] to-[#A78BFA]">
              <span className="font-['Syne'] text-xs font-black text-[#080810]">MR</span>
            </div>
            <span className="font-['DM_Sans'] text-sm text-white/30">Shreemohan Rajbhar</span>
          </div>
          <p className="font-['DM_Sans'] text-xs text-white/20">
            © 2026 · Crafted with care in Mumbai
          </p>
        </div>
      </footer>
    </div>
  );
}