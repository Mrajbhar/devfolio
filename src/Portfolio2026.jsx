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

const [mousePosition, setMousePosition] = useState({
  x: 0,
  y: 0,
});

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-[#050816] text-white' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900'} min-h-screen overflow-hidden transition-all duration-500`}>
      <motion.div
        animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"
      />

      <motion.div
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        transition={{ duration: 0.05 }}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.9)]"
      />

    <header
  className={`${
    darkMode
      ? 'border-white/10 bg-black/30'
      : 'border-slate-200 bg-white/70 shadow-lg shadow-slate-200/50'
  } fixed top-0 z-50 w-full border-b backdrop-blur-2xl`}
>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
    
    {/* Logo */}
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
      MR
    </div>

    {/* Desktop Menu */}
    <div
      className={`${
        darkMode
          ? 'border border-white/10 bg-white/5'
          : 'border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/40'
      } hidden items-center gap-2 rounded-full p-2 backdrop-blur-2xl lg:flex`}
    >
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className={`${
            darkMode ? 'text-gray-300' : 'text-slate-700'
          } rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white`}
        >
          {item}
        </a>
      ))}
    </div>

    {/* Right Buttons */}
    <div className="flex items-center gap-3">
      
      {/* Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`${
          darkMode
            ? 'border-white/10 bg-white/5 text-white'
            : 'border-slate-200 bg-white text-slate-900'
        } rounded-full border px-4 py-2`}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className={`${
          darkMode ? 'text-white' : 'text-slate-900'
        } text-3xl lg:hidden`}
      >
        {mobileMenu ? '✕' : '☰'}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenu && (
    <div
      className={`${
        darkMode
          ? 'border-white/10 bg-[#050816]/95'
          : 'border-slate-200 bg-white/95'
      } border-t backdrop-blur-2xl lg:hidden`}
    >
      <div className="flex flex-col px-6 py-6">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMobileMenu(false)}
            className={`${
              darkMode ? 'text-gray-300' : 'text-slate-700'
            } rounded-xl px-4 py-4 text-lg font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )}
</header>

     <section id="home" className="min-h-screen px-6 pt-40">
  <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
    
    {/* Left Content */}
    <div>
      <p className="mb-6 text-sm uppercase tracking-[0.4em] text-cyan-300">
        Welcome to My Portfolio
      </p>

      <h1
        className={`text-6xl font-black leading-[0.9] md:text-[7rem] ${
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
        } mt-10 max-w-2xl text-xl leading-relaxed`}
      >
        Full Stack Developer with 4+ years of experience in building scalable
        web and desktop applications using .NET Core, ASP.NET MVC, React.js,
        Node.js, SQL Server, Oracle, MongoDB, and modern frontend technologies.
        Passionate about creating premium UI/UX experiences, secure backend
        APIs, and high-performance applications.
      </p>

      {/* Skills */}
      <div className="mt-10 flex flex-wrap gap-4">
        {[
          '.NET Core',
          'ASP.NET MVC',
          'React.js',
          'Node.js',
          'SQL Server',
          'Oracle',
          'MongoDB',
          'Full Stack Development',
        ].map((role) => (
          <motion.div
            key={role}
            whileHover={{ y: -5 }}
            className={`${
              darkMode
                ? 'border border-white/10 bg-white/5 text-white'
                : 'border border-slate-200 bg-white text-slate-800 shadow-md shadow-slate-200/40'
            } rounded-2xl px-6 py-3 font-medium backdrop-blur-xl`}
          >
            {role}
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-12 flex flex-wrap items-center gap-5">
        
        <a
          href="mailto:yourmail@gmail.com?subject=Hiring%20Inquiry"
          className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-cyan-400"
        >
          Hire Me
        </a>

        <a
          href="/resume.pdf"
          target="_blank"
          className={`${
            darkMode
              ? 'border border-white/10 bg-white/5 text-white'
              : 'border border-slate-200 bg-white text-slate-800 shadow-lg shadow-slate-200/40'
          } inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105`}
        >
          Download Resume
        </a>
      </div>

      {/* Social Links */}
      <div className="mt-10 flex items-center gap-5">
        {[
          {
            Icon: GithubIcon,
            link: 'https://github.com/Mrajbhar',
          },
          {
            Icon: LinkedinIcon,
            link: 'https://www.linkedin.com/in/mohan-rajbhar/',
          },
          {
            Icon: LeetcodeIcon,
            link: 'https://leetcode.com/u/Mrajbhar/',
          },
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
            } flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-110`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>

    {/* Right Image Section */}
    <div className="relative flex items-center justify-center">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[720px] w-[720px] rounded-full border border-cyan-400/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute h-[620px] w-[620px] rounded-full border border-purple-500/10"
      >
        <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.9)]" />
      </motion.div>

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <div className="absolute inset-0 rounded-[42px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-3xl" />

        <div className="overflow-hidden rounded-[42px] border border-purple-500/40 bg-[#070816] p-[2px] shadow-[0_0_120px_rgba(139,92,246,0.45)]">
          <div className="overflow-hidden rounded-[40px]">
            <img
              src={profileImage}
              alt="Shreemohan Rajbhar"
              className="h-[760px] w-[560px] object-cover object-top"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

    <section id="about" className="px-6 py-32">
  <div
    className={`mx-auto max-w-7xl rounded-[40px] p-12 backdrop-blur-3xl ${
      darkMode
        ? 'border border-white/10 bg-white/5'
        : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
    }`}
  >
    <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
      About Me
    </p>

    <h2
      className={`mt-6 text-6xl font-black leading-tight ${
        darkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      Experienced Full Stack .NET Developer
    </h2>

    <p
      className={`mt-8 max-w-5xl text-xl leading-relaxed ${
        darkMode ? 'text-gray-400' : 'text-slate-600'
      }`}
    >
      I am a passionate Full Stack Developer with 4+ years of experience in
      designing and developing scalable web and desktop applications. I
      specialize in building modern applications using .NET Core, ASP.NET MVC,
      ASP.NET Web Applications, React.js, Node.js, and MongoDB.

      <br />
      <br />

      I have strong experience working with SQL Server, MySQL, Oracle Database,
      and Windows Forms applications. I focus on creating clean architecture,
      responsive user interfaces, secure backend APIs, and high-performance
      applications that deliver seamless user experiences.

      <br />
      <br />

      I enjoy solving complex problems, learning new technologies, and building
      premium-quality software solutions for businesses and users.
    </p>
  </div>
</section>

      <section id="skills" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-purple-300">
              Skills & Expertise
            </p>

            <h2 className={`mt-6 text-7xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Tech Arsenal
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  {[
    'React.js',
    '.NET Core',
    'Node.js',
    'MongoDB',
    'SQL Server',
    'MySQL',
    'Oracle Database'
  ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ y: -10 }}
                className={`${darkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white shadow-xl shadow-slate-200/40'} rounded-[32px] p-8 backdrop-blur-2xl`}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 text-4xl text-white shadow-[0_0_50px_rgba(139,92,246,0.45)]">
                  ✦
                </div>

                <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {skill}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
              Projects
            </p>

            <h2 className={`mt-6 text-7xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Featured Work
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                whileHover={{ y: -10 }}
                className={`${darkMode ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white shadow-xl shadow-slate-200/40'} overflow-hidden rounded-[36px] backdrop-blur-2xl`}
              >
                <div className="h-56 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />

                <div className="p-8">
                  <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Modern Web Application
                  </h3>

                  <p className={`mt-5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    Scalable premium application with futuristic UI and smooth animations.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative px-6 py-36">
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-500 to-blue-500 opacity-40 md:block" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-28 text-center">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">
              Experience Timeline
            </p>

            <h2 className={`mt-6 text-8xl font-black leading-[0.9] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              My Professional Journey
            </h2>

            <p className={`mx-auto mt-8 max-w-3xl text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Each stage represents a different milestone in my development career and technical growth.
            </p>
          </div>

          <div className="relative space-y-28">
            {[
             {
  year: '2025 - Present',
  role: 'Software Engineer',
  company: 'Clover Infotech Pvt. Ltd. — Client: HDFC Bank',
  description:
    'Leading the development of an in-house Mutual Fund and Bond Trading platform used by 4000+ active users. Developed and maintained modules for Mutual Fund and Bond buy/sell transactions, including multiple investment and transaction forms. Implemented SWIFT payment integration for seamless transaction amount transfers after Mutual Fund and Bond purchases. Enhanced the platform by introducing combined SWIFT generation, enabling multiple transactions to generate a single SWIFT message instead of separate messages. Collaborated closely with Business Analysts and Product teams to gather requirements and deliver new features. Managed bug fixes, production support, and feature enhancements based on business needs. Integrated third-party Email APIs for automated transaction notifications. Worked extensively on both Windows and Web Applications using C#, .NET Core, ASP.NET MVC, Windows Forms, and SQL Server while ensuring high performance, scalability, and smooth transaction processing.',
  align: 'right',
  gradient: 'from-purple-500 to-blue-500',
  skills: [
    'C#',
    '.NET Core',
    'ASP.NET MVC',
    'SQL Server',
    'Windows Forms',
    'React',
    'REST API',
    'SWIFT Integration',
  ],
},
             {
  year: '2024 - 2025',
  role: 'Software Engineer',
  company: 'Sodel Software Solutions Private Limited',
  description:
    'Developed a dynamic assessment platform in the E-Learning domain using ASP.NET Web Forms, Entity Framework, JavaScript, AJAX, jQuery, and MySQL. Built responsive and data-driven modules for assessment management, improving user experience and system efficiency. Implemented real-time question counting and percentage tracking for accurate assessment results. Designed and integrated custom authentication and authorization middleware supporting Google and Microsoft login using secure key and private key encryption. Configured Google Console and Microsoft Console for seamless API integrations and authentication workflows. Implemented multithreading in C# and ASP.NET for large-scale report generation, enabling asynchronous processing of 1,000–10,000+ records without blocking the UI or causing HTTP 500 errors. Reduced report generation time by over 80% and improved system stability by allowing users to continue navigation while reports downloaded in the background. Successfully designed, implemented, and deployed the solution within one week. Optimized more than 15 application pages by improving code flow, eliminating unnecessary loops, and enhancing execution performance by 25%.',
  align: 'left',
  gradient: 'from-blue-500 to-cyan-500',
  skills: [
    'ASP.NET',
    'C#',
    'Entity Framework',
    'JavaScript',
    'AJAX',
    'jQuery',
    'MySQL',
    'Multithreading',
    'Authentication',
    'REST API',
  ],
},
            {
  year: '2022 - 2024',
  role: 'Software Developer',
  company: 'Osource Global Pvt Ltd',
  description:
    'Worked on multiple HRMS applications using .NET Framework, .NET Core, ASP.NET, and Oracle SQL. Successfully migrated three HRMS projects from .NET Framework 4.0 to 4.8, improving system compatibility, optimization, and application stability while reducing system errors by 50%. Enhanced application performance by optimizing page loading time from 2–3 minutes to 5–6 seconds, resulting in improved user experience, increased engagement, and reduced bounce rates. Developed and integrated multiple RESTful APIs using .NET Core to enable seamless communication and data exchange between various HRMS modules. Worked extensively with Oracle SQL, including optimized stored procedures and database views to improve system efficiency, scalability, and data integrity. Contributed to building a modern, scalable, and maintainable HRMS architecture capable of supporting evolving business requirements and long-term sustainability.',
  align: 'right',
  gradient: 'from-purple-500 to-fuchsia-500',
  skills: [
    '.NET Framework',
    '.NET Core',
    'ASP.NET',
    'Oracle SQL',
    'REST API',
    'C#',
    'Performance Optimization',
    'HRMS',
  ],
},
         {
  year: '2022',
  role: 'Junior Software Engineer',
  company: 'Greytrix India Pvt Ltd',
  description:
    'Contributed to the development of a CRM application using ASP.NET MVC, focusing on efficient data management and seamless user experience. Worked with Git and GitLab for version control, collaboration, and issue tracking. Participated in migrating the application to modern technologies using Node.js and React.js, improving scalability, application performance, and maintainability. Collaborated with the development team to implement new features, fix bugs, and optimize existing modules for better system efficiency.',
  align: 'left',
  gradient: 'from-cyan-500 to-blue-500',
  skills: [
    'ASP.NET MVC',
    'React.js',
    'Node.js',
    'Git',
    'GitLab',
    'HTML',
    'CSS',
    'JavaScript',
  ],
},
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex ${item.align === 'left' ? 'justify-start' : 'justify-end'}`}
              >
                <div className="absolute left-1/2 top-16 hidden -translate-x-1/2 md:block">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_40px_rgba(139,92,246,0.7)]`}>
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group relative w-full overflow-hidden rounded-[42px] p-10 backdrop-blur-3xl transition-all duration-500 md:w-[46%] ${
                    darkMode
                      ? 'border border-white/10 bg-white/[0.05] hover:border-cyan-400/30'
                      : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/50'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition duration-500 group-hover:opacity-10`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className={`inline-flex rounded-full bg-gradient-to-r ${item.gradient} px-5 py-2 text-sm font-bold tracking-[0.2em] text-white shadow-lg`}>
                          {item.year}
                        </div>

                        <h3 className={`mt-6 text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {item.role}
                        </h3>

                        <p className="mt-3 text-2xl font-semibold text-cyan-400">
                          {item.company}
                        </p>
                      </div>

                      <div className={`hidden rounded-3xl bg-gradient-to-br ${item.gradient} p-5 text-3xl text-white shadow-[0_0_40px_rgba(139,92,246,0.45)] md:flex`}>
                        ✦
                      </div>
                    </div>

                    <p className={`mt-8 text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                      {item.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`${
                            darkMode
                              ? 'border border-white/10 bg-white/5 text-cyan-300'
                              : 'border border-slate-200 bg-slate-100 text-cyan-700'
                          } rounded-full px-5 py-3 text-sm font-medium backdrop-blur-xl`}
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

      <section id="contact" className="px-6 py-32">
  <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
    
    {/* Left Card */}
    <motion.div
      whileHover={{ y: -8 }}
      className={`${
        darkMode
          ? 'border border-white/10 bg-white/5'
          : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
      } relative overflow-hidden rounded-[48px] p-12 backdrop-blur-3xl`}
    >
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <p className="relative z-10 text-sm uppercase tracking-[0.3em] text-cyan-300">
        Hire Me
      </p>

      <h2
        className={`relative z-10 mt-8 text-6xl font-black leading-tight ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Let’s Build Amazing Products Together
      </h2>

      <p
        className={`relative z-10 mt-8 max-w-2xl text-lg leading-relaxed ${
          darkMode ? 'text-gray-400' : 'text-slate-600'
        }`}
      >
        I’m available for freelance projects, full-time opportunities, and
        building scalable modern web applications using React.js, .NET Core,
        Node.js, MongoDB, SQL Server, MySQL, and Oracle Database.
      </p>

      {/* Hire Me Button */}
      <a
        href="mailto:yourmail@gmail.com?subject=Hiring%20Inquiry"
        className="relative z-10 mt-10 inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-cyan-400"
      >
        Hire Me
      </a>

      {/* Services */}
      <div className="relative z-10 mt-10 flex flex-wrap gap-4">
        {[
          'React.js Development',
          '.NET Core APIs',
          'Full Stack Development',
          'Database Management',
        ].map((service) => (
          <div
            key={service}
            className={`${
              darkMode
                ? 'border border-white/10 bg-white/5 text-cyan-300'
                : 'border border-slate-200 bg-slate-100 text-cyan-700'
            } rounded-full px-5 py-3 text-sm font-medium backdrop-blur-xl`}
          >
            {service}
          </div>
        ))}
      </div>

      {/* Availability */}
      <div className="relative z-10 mt-12 flex items-center gap-4">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>

        <p
          className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Available for New Projects
        </p>
      </div>
    </motion.div>

    {/* Right Card */}
    <motion.div
      whileHover={{ y: -8 }}
      className={`${
        darkMode
          ? 'border border-white/10 bg-white/5'
          : 'border border-slate-200 bg-white shadow-2xl shadow-slate-200/40'
      } relative overflow-hidden rounded-[48px] p-12 backdrop-blur-3xl`}
    >
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <h3
        className={`relative z-10 text-4xl font-black ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Contact Details
      </h3>

      <div className="relative z-10 mt-12 space-y-8">
        
        {/* Email */}
        <div>
          <p
            className={`${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            } text-sm uppercase tracking-[0.25em]`}
          >
            Email Address
          </p>

          <a
            href="mailto:yourmail@gmail.com"
            className={`mt-3 block text-2xl font-semibold transition-colors hover:text-cyan-400 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            m.rajbhar1235@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div>
          <p
            className={`${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            } text-sm uppercase tracking-[0.25em]`}
          >
            Phone Number
          </p>

          <h4
            className={`mt-3 text-2xl font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            +91 7208955201
          </h4>
        </div>

        {/* Location */}
        <div>
          <p
            className={`${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            } text-sm uppercase tracking-[0.25em]`}
          >
            Location
          </p>

          <h4
            className={`mt-3 text-2xl font-semibold ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Mumbai, India
          </h4>
        </div>

        {/* Availability */}
        <div>
          <p
            className={`${
              darkMode ? 'text-gray-400' : 'text-slate-600'
            } text-sm uppercase tracking-[0.25em]`}
          >
            Availability
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>

            <p
              className={`text-xl font-semibold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
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
