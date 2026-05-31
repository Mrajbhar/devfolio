// Tailwind CSS v4 Ready
// npm install tailwindcss @tailwindcss/vite framer-motion
// src/index.css => @import "tailwindcss";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const profileImage = '/profile.png';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.486 17.523 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M4.98 3.5C4.98 4.604 4.104 5.5 3 5.5S1.02 4.604 1.02 3.5 1.896 1.5 3 1.5s1.98.896 1.98 2zM1 8h4v13H1zM8 8h3.8v1.8h.05c.53-1 1.82-2.05 3.75-2.05C19.5 7.75 21 10 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H8z" />
  </svg>
);

const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M14.1 2l-1.4 1.4 6.5 6.6-6.5 6.6 1.4 1.4L22 10zM8.5 7L2 13.5 8.5 20l1.4-1.4-5.1-5.1 5.1-5.1z" />
  </svg>
);

export default function Portfolio2026() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`${
        darkMode
          ? 'bg-[#050816] text-white'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900'
      } min-h-screen overflow-x-hidden transition-all duration-500`}
    >
      {/* Cursor glow — hidden on touch devices */}
      <motion.div
        animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl md:block"
      />
      <motion.div
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        transition={{ duration: 0.05 }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.9)] md:block"
      />

      {/* ─── HEADER ─── */}
      <header
        className={`${
          darkMode
            ? 'border-white/10 bg-black/30'
            : 'border-slate-200 bg-white/70 shadow-lg shadow-slate-200/50'
        } fixed top-0 z-50 w-full border-b backdrop-blur-2xl`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-2xl font-black text-transparent sm:text-3xl lg:text-4xl">
            MR
          </div>

          {/* Desktop Nav */}
          <nav
            className={`${
              darkMode
                ? 'border border-white/10 bg-white/5'
                : 'border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/40'
            } hidden items-center gap-1 rounded-full p-2 backdrop-blur-2xl lg:flex`}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${
                  darkMode ? 'text-gray-300' : 'text-slate-700'
                } rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${
                darkMode
                  ? 'border-white/10 bg-white/5 text-white'
                  : 'border-slate-200 bg-white text-slate-900'
              } rounded-full border px-3 py-1.5 text-sm sm:px-4 sm:py-2`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className={`${
                darkMode ? 'text-white' : 'text-slate-900'
              } text-2xl lg:hidden`}
              aria-label="Toggle menu"
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div
            className={`${
              darkMode
                ? 'border-white/10 bg-[#050816]/95'
                : 'border-slate-200 bg-white/95'
            } border-t backdrop-blur-2xl lg:hidden`}
          >
            <div className="flex flex-col px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenu(false)}
                  className={`${
                    darkMode ? 'text-gray-300' : 'text-slate-700'
                  } rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="home" className="min-h-screen px-4 pt-24 pb-16 sm:px-6 sm:pt-32 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300 sm:mb-6 sm:text-sm">
              Welcome to My Portfolio
            </p>

            <h1
              className={`text-4xl font-black leading-[0.95] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Shreemohan Rajbhar
              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                Full Stack .NET Developer
              </span>
            </h1>

            <p
              className={`${
                darkMode ? 'text-gray-400' : 'text-slate-600'
              } mt-6 max-w-2xl text-base leading-relaxed sm:mt-8 sm:text-lg lg:text-xl`}
            >
              Full Stack Developer with 4+ years of experience in building scalable web and
              desktop applications using .NET Core, ASP.NET MVC, React.js, Node.js, SQL Server,
              Oracle, MongoDB, and modern frontend technologies.
            </p>

            {/* Skill Chips */}
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {['.NET Core', 'ASP.NET MVC', 'React.js', 'Node.js', 'SQL Server', 'Oracle', 'MongoDB', 'Full Stack'].map(
                (role) => (
                  <motion.div
                    key={role}
                    whileHover={{ y: -4 }}
                    className={`${
                      darkMode
                        ? 'border border-white/10 bg-white/5 text-white'
                        : 'border border-slate-200 bg-white text-slate-800 shadow-md shadow-slate-200/40'
                    } rounded-xl px-4 py-2 text-sm font-medium backdrop-blur-xl sm:rounded-2xl sm:px-5 sm:py-2.5`}
                  >
                    {role}
                  </motion.div>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <a
                href="mailto:yourmail@gmail.com?subject=Hiring%20Inquiry"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-cyan-400 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg"
              >
                Hire Me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? 'border border-white/10 bg-white/5 text-white'
                    : 'border border-slate-200 bg-white text-slate-800 shadow-lg shadow-slate-200/40'
                } inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg`}
              >
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-4">
              {[
                { Icon: GithubIcon, link: 'https://github.com/Mrajbhar' },
                { Icon: LinkedinIcon, link: 'https://www.linkedin.com/in/mohan-rajbhar/' },
                { Icon: LeetcodeIcon, link: 'https://leetcode.com/u/Mrajbhar/' },
              ].map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    darkMode
                      ? 'border border-white/10 bg-white/5 text-white'
                      : 'border border-slate-200 bg-white text-slate-800 shadow-lg shadow-slate-200/40'
                  } flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 hover:-translate-y-2 hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            {/* Orbit rings — scaled down on mobile */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/10 sm:h-[420px] sm:w-[420px] lg:h-[620px] lg:w-[620px] xl:h-[720px] xl:w-[720px]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute h-[260px] w-[260px] rounded-full border border-purple-500/10 sm:h-[360px] sm:w-[360px] lg:h-[520px] lg:w-[520px] xl:h-[620px] xl:w-[620px]"
              >
                <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.9)] sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-2xl sm:rounded-[36px] lg:rounded-[42px] lg:blur-3xl" />
                <div className="overflow-hidden rounded-[26px] border border-purple-500/40 bg-[#070816] p-[2px] shadow-[0_0_60px_rgba(139,92,246,0.4)] sm:rounded-[34px] lg:rounded-[40px] lg:shadow-[0_0_120px_rgba(139,92,246,0.45)]">
                  <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[38px]">
                    <img
                      src={profileImage}
                      alt="Shreemohan Rajbhar"
                      className="h-[320px] w-[240px] object-cover object-top sm:h-[440px] sm:w-[330px] lg:h-[580px] lg:w-[430px] xl:h-[680px] xl:w-[500px]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div
          className={`mx-auto max-w-7xl rounded-[24px] p-6 backdrop-blur-3xl sm:rounded-[32px] sm:p-10 lg:rounded-[40px] lg:p-12 ${
            darkMode
              ? 'border border-white/10 bg-white/5'
              : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">About Me</p>

          <h2
            className={`mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-5xl xl:text-6xl ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Experienced Full Stack .NET Developer
          </h2>

          <p
            className={`mt-6 text-base leading-relaxed sm:mt-8 sm:text-lg lg:text-xl ${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            }`}
          >
            I am a passionate Full Stack Developer with 4+ years of experience in designing and
            developing scalable web and desktop applications. I specialize in building modern
            applications using .NET Core, ASP.NET MVC, ASP.NET Web Applications, React.js,
            Node.js, and MongoDB.
            <br /><br />
            I have strong experience working with SQL Server, MySQL, Oracle Database, and Windows
            Forms applications. I focus on creating clean architecture, responsive user interfaces,
            secure backend APIs, and high-performance applications that deliver seamless user
            experiences.
            <br /><br />
            I enjoy solving complex problems, learning new technologies, and building
            premium-quality software solutions for businesses and users.
          </p>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-14 lg:mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-purple-300 sm:text-sm">
              Skills & Expertise
            </p>
            <h2
              className={`mt-4 text-4xl font-black sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Tech Arsenal
            </h2>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[
              'React.js',
              '.NET Core',
              'Node.js',
              'MongoDB',
              'SQL Server',
              'MySQL',
              'Oracle Database',
              'ASP.NET MVC',
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ y: -8 }}
                className={`${
                  darkMode
                    ? 'border border-white/10 bg-white/5'
                    : 'border border-slate-200 bg-white shadow-xl shadow-slate-200/40'
                } rounded-[20px] p-5 backdrop-blur-2xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 text-2xl text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] sm:mb-5 sm:h-16 sm:w-16 sm:text-3xl lg:h-20 lg:w-20 lg:text-4xl">
                  ✦
                </div>
                <h3
                  className={`text-lg font-black sm:text-xl lg:text-2xl xl:text-3xl ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {skill}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-16 lg:mb-20">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">Projects</p>
            <h2
              className={`mt-4 text-4xl font-black sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Featured Work
            </h2>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                whileHover={{ y: -8 }}
                className={`${
                  darkMode
                    ? 'border border-white/10 bg-white/5'
                    : 'border border-slate-200 bg-white shadow-xl shadow-slate-200/40'
                } overflow-hidden rounded-[24px] backdrop-blur-2xl sm:rounded-[30px] lg:rounded-[36px]`}
              >
                <div className="h-44 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 sm:h-52 lg:h-56" />
                <div className="p-6 sm:p-8">
                  <h3
                    className={`text-xl font-black sm:text-2xl lg:text-3xl ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Modern Web Application
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base lg:mt-5 ${
                      darkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}
                  >
                    Scalable premium application with futuristic UI and smooth animations.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-36">
        {/* Centre timeline line — desktop only */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-500 to-blue-500 opacity-40 md:block" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center sm:mb-20 lg:mb-28">
            <p className="text-xs uppercase tracking-[0.45em] text-cyan-300 sm:text-sm">
              Experience Timeline
            </p>
            <h2
              className={`mt-4 text-4xl font-black leading-[0.9] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              My Professional Journey
            </h2>
            <p
              className={`mx-auto mt-5 max-w-3xl text-base leading-relaxed sm:mt-8 sm:text-lg lg:text-xl ${
                darkMode ? 'text-gray-400' : 'text-slate-600'
              }`}
            >
              Each stage represents a different milestone in my development career and technical growth.
            </p>
          </div>

          <div className="relative space-y-10 sm:space-y-16 lg:space-y-28">
            {[
              {
                year: '2025 - Present',
                role: 'Software Engineer',
                company: 'Clover Infotech Pvt. Ltd. — Client: HDFC Bank',
                description:
                  'Leading the development of an in-house Mutual Fund and Bond Trading platform used by 4000+ active users. Developed and maintained modules for Mutual Fund and Bond buy/sell transactions, including multiple investment and transaction forms. Implemented SWIFT payment integration for seamless transaction amount transfers after Mutual Fund and Bond purchases. Enhanced the platform by introducing combined SWIFT generation, enabling multiple transactions to generate a single SWIFT message instead of separate messages. Collaborated closely with Business Analysts and Product teams to gather requirements and deliver new features. Managed bug fixes, production support, and feature enhancements based on business needs. Integrated third-party Email APIs for automated transaction notifications. Worked extensively on both Windows and Web Applications using C#, .NET Core, ASP.NET MVC, Windows Forms, and SQL Server while ensuring high performance, scalability, and smooth transaction processing.',
                align: 'right',
                gradient: 'from-purple-500 to-blue-500',
                skills: ['C#', '.NET Core', 'ASP.NET MVC', 'SQL Server', 'Windows Forms', 'React', 'REST API', 'SWIFT Integration'],
              },
              {
                year: '2024 - 2025',
                role: 'Software Engineer',
                company: 'Sodel Software Solutions Private Limited',
                description:
                  'Developed a dynamic assessment platform in the E-Learning domain using ASP.NET Web Forms, Entity Framework, JavaScript, AJAX, jQuery, and MySQL. Built responsive and data-driven modules for assessment management, improving user experience and system efficiency. Implemented real-time question counting and percentage tracking for accurate assessment results. Designed and integrated custom authentication and authorization middleware supporting Google and Microsoft login using secure key and private key encryption. Configured Google Console and Microsoft Console for seamless API integrations and authentication workflows. Implemented multithreading in C# and ASP.NET for large-scale report generation, enabling asynchronous processing of 1,000–10,000+ records without blocking the UI or causing HTTP 500 errors. Reduced report generation time by over 80% and improved system stability. Optimized more than 15 application pages by improving code flow, eliminating unnecessary loops, and enhancing execution performance by 25%.',
                align: 'left',
                gradient: 'from-blue-500 to-cyan-500',
                skills: ['ASP.NET', 'C#', 'Entity Framework', 'JavaScript', 'AJAX', 'jQuery', 'MySQL', 'Multithreading', 'Authentication', 'REST API'],
              },
              {
                year: '2022 - 2024',
                role: 'Software Developer',
                company: 'Osource Global Pvt Ltd',
                description:
                  'Worked on multiple HRMS applications using .NET Framework, .NET Core, ASP.NET, and Oracle SQL. Successfully migrated three HRMS projects from .NET Framework 4.0 to 4.8, improving system compatibility, optimization, and application stability while reducing system errors by 50%. Enhanced application performance by optimizing page loading time from 2–3 minutes to 5–6 seconds, resulting in improved user experience, increased engagement, and reduced bounce rates. Developed and integrated multiple RESTful APIs using .NET Core to enable seamless communication and data exchange between various HRMS modules. Worked extensively with Oracle SQL, including optimized stored procedures and database views to improve system efficiency, scalability, and data integrity. Contributed to building a modern, scalable, and maintainable HRMS architecture.',
                align: 'right',
                gradient: 'from-purple-500 to-fuchsia-500',
                skills: ['.NET Framework', '.NET Core', 'ASP.NET', 'Oracle SQL', 'REST API', 'C#', 'Performance Optimization', 'HRMS'],
              },
              {
                year: '2022',
                role: 'Junior Software Engineer',
                company: 'Greytrix India Pvt Ltd',
                description:
                  'Contributed to the development of a CRM application using ASP.NET MVC, focusing on efficient data management and seamless user experience. Worked with Git and GitLab for version control, collaboration, and issue tracking. Participated in migrating the application to modern technologies using Node.js and React.js, improving scalability, application performance, and maintainability. Collaborated with the development team to implement new features, fix bugs, and optimize existing modules for better system efficiency.',
                align: 'left',
                gradient: 'from-cyan-500 to-blue-500',
                skills: ['ASP.NET MVC', 'React.js', 'Node.js', 'Git', 'GitLab', 'HTML', 'CSS', 'JavaScript'],
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex ${
                  item.align === 'left' ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline dot — tablet+ */}
                <div className="absolute left-1/2 top-16 hidden -translate-x-1/2 md:block">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_40px_rgba(139,92,246,0.7)]`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group relative w-full overflow-hidden rounded-[28px] p-6 backdrop-blur-3xl transition-all duration-500 sm:rounded-[36px] sm:p-8 md:w-[46%] lg:rounded-[42px] lg:p-10 ${
                    darkMode
                      ? 'border border-white/10 bg-white/[0.05] hover:border-cyan-400/30'
                      : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/50'
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition duration-500 group-hover:opacity-10`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div
                          className={`inline-flex rounded-full bg-gradient-to-r ${item.gradient} px-4 py-2 text-xs font-bold tracking-[0.2em] text-white shadow-lg sm:px-5 sm:text-sm`}
                        >
                          {item.year}
                        </div>
                        <h3
                          className={`mt-4 text-2xl font-black sm:mt-6 sm:text-3xl lg:text-4xl ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {item.role}
                        </h3>
                        <p className="mt-2 text-base font-semibold text-cyan-400 sm:mt-3 sm:text-xl lg:text-2xl">
                          {item.company}
                        </p>
                      </div>
                      <div
                        className={`hidden shrink-0 rounded-3xl bg-gradient-to-br ${item.gradient} p-4 text-2xl text-white shadow-[0_0_40px_rgba(139,92,246,0.45)] sm:flex lg:p-5 lg:text-3xl`}
                      >
                        ✦
                      </div>
                    </div>

                    <p
                      className={`mt-6 text-sm leading-relaxed sm:mt-8 sm:text-base lg:text-lg ${
                        darkMode ? 'text-gray-400' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3 lg:gap-4">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`${
                            darkMode
                              ? 'border border-white/10 bg-white/5 text-cyan-300'
                              : 'border border-slate-200 bg-slate-100 text-cyan-700'
                          } rounded-full px-3 py-2 text-xs font-medium backdrop-blur-xl sm:px-5 sm:py-3 sm:text-sm`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className={`${
              darkMode
                ? 'border border-white/10 bg-white/5'
                : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
            } relative overflow-hidden rounded-[28px] p-6 backdrop-blur-3xl sm:rounded-[36px] sm:p-10 lg:rounded-[48px] lg:p-12`}
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl lg:h-48 lg:w-48" />

            <p className="relative z-10 text-xs uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              Hire Me
            </p>

            <h2
              className={`relative z-10 mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl xl:text-6xl ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Let's Build Amazing Products Together
            </h2>

            <p
              className={`relative z-10 mt-5 text-sm leading-relaxed sm:mt-8 sm:text-base lg:text-lg ${
                darkMode ? 'text-gray-400' : 'text-slate-600'
              }`}
            >
              I'm available for freelance projects, full-time opportunities, and building scalable
              modern web applications using React.js, .NET Core, Node.js, MongoDB, SQL Server,
              MySQL, and Oracle Database.
            </p>

            <a
              href="mailto:yourmail@gmail.com?subject=Hiring%20Inquiry"
              className="relative z-10 mt-8 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-cyan-400 sm:mt-10 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg"
            >
              Hire Me
            </a>

            <div className="relative z-10 mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3 lg:mt-10">
              {['React.js Development', '.NET Core APIs', 'Full Stack Development', 'Database Management'].map(
                (service) => (
                  <div
                    key={service}
                    className={`${
                      darkMode
                        ? 'border border-white/10 bg-white/5 text-cyan-300'
                        : 'border border-slate-200 bg-slate-100 text-cyan-700'
                    } rounded-full px-4 py-2 text-xs font-medium backdrop-blur-xl sm:px-5 sm:py-2.5 sm:text-sm`}
                  >
                    {service}
                  </div>
                )
              )}
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-3 sm:mt-12 lg:mt-12">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.8)] sm:h-5 sm:w-5">
                <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
              </div>
              <p className={`text-base font-semibold sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Available for New Projects
              </p>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className={`${
              darkMode
                ? 'border border-white/10 bg-white/5'
                : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
            } relative overflow-hidden rounded-[28px] p-6 backdrop-blur-3xl sm:rounded-[36px] sm:p-10 lg:rounded-[48px] lg:p-12`}
          >
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl lg:h-48 lg:w-48" />

            <h3
              className={`relative z-10 text-2xl font-black sm:text-3xl lg:text-4xl ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Contact Details
            </h3>

            <div className="relative z-10 mt-8 space-y-6 sm:mt-10 sm:space-y-8 lg:mt-12">
              {/* Email */}
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] sm:text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  Email Address
                </p>
                <a
                  href="mailto:m.rajbhar1235@gmail.com"
                  className={`mt-2 block text-lg font-semibold transition-colors hover:text-cyan-400 sm:mt-3 sm:text-xl lg:text-2xl ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  m.rajbhar1235@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] sm:text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  Phone Number
                </p>
                <h4 className={`mt-2 text-lg font-semibold sm:mt-3 sm:text-xl lg:text-2xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  +91 7208955201
                </h4>
              </div>

              {/* Location */}
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] sm:text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  Location
                </p>
                <h4 className={`mt-2 text-lg font-semibold sm:mt-3 sm:text-xl lg:text-2xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Mumbai, India
                </h4>
              </div>

              {/* Availability */}
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] sm:text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                  Availability
                </p>
                <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.8)] sm:h-5 sm:w-5">
                    <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
                  </div>
                  <p className={`text-base font-semibold sm:text-lg lg:text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Available for Freelance & Full Time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}