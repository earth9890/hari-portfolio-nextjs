'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import BlackHole from '@/components/BlackHole/BlackHole';
import { personalData, aboutData, resumeData, projectsData, blogPostsData, goalsData, socialLinksData, type ExperienceItem } from '@/lib/data';

// Import section components
import MinimalNav from '@/components/Navigation/MinimalNav';
import GoalCard from '@/components/Goals/GoalCard';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform scroll progress for opacity/parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  // Collapse animation state
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Calculate experience period client-side to avoid hydration mismatch
  const [experienceWithPeriod, setExperienceWithPeriod] = useState<Array<ExperienceItem & { period: string }>>([]);

  useEffect(() => {
    const calculateExperience = (startDate: string): string => {
      const start = new Date(startDate);
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      if (years === 0) {
        return `${months} month${months !== 1 ? 's' : ''}`;
      } else if (months === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
      }
    };

    const withPeriod = resumeData.map((item) => ({
      ...item,
      period: `March 2024 — Present (${calculateExperience(item.startDate)})`,
    }));

    setExperienceWithPeriod(withPeriod);
  }, []);

  // Handle collapse completion from BlackHole shake
  const handleCollapseComplete = () => {
    // Scroll to goals section with instant behavior
    setTimeout(() => {
      const goalsSection = document.getElementById('goals');
      if (goalsSection) {
        goalsSection.scrollIntoView({ behavior: 'instant' });
        // Trigger reveal animation after scroll
        setIsRevealing(true);
        setTimeout(() => setIsRevealing(false), 800);
      }
      // Reset collapse state after a brief delay for reveal effect
      setTimeout(() => {
        setIsCollapsing(false);
      }, 100);
    }, 200);
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
      <BlackHole onCollapseStart={() => setIsCollapsing(true)} onCollapseComplete={handleCollapseComplete} />
      <MinimalNav />

      {/* Collapse animation wrapper - applies scale compression to all content */}
      <motion.div
        animate={{
          scale: isCollapsing ? 0.5 : 1,
          opacity: isCollapsing ? 0.2 : 1,
        }}
        transition={{
          duration: 2.5,
          ease: 'easeIn',
        }}
        style={{
          transformOrigin: 'center center',
        }}
      >

      {/* ==================== HERO SECTION ==================== */}
      <section className="h-screen flex items-center justify-center px-4 sm:px-6 snap-start">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-text-primary mb-6 sm:mb-8">
            {personalData.name}
          </h1>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed px-2">
            {personalData.tagline}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 sm:mt-16"
          >
            <a
              href="#about"
              className="link-underline text-text-muted hover:text-text-primary transition-colors duration-300 text-xs sm:text-sm tracking-wide uppercase inline-block"
            >
              Scroll to explore
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start flex items-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">About</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary mb-6 sm:mb-8">
              {aboutData.intro}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-10 sm:space-y-12"
          >
            <div>
              <h3 className="font-display text-lg sm:text-xl text-stone-500 mb-3 sm:mb-4">Philosophy</h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {aboutData.philosophy}
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl text-stone-500 mb-3 sm:mb-4">What I Build</h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {aboutData.whatIBuild}
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl text-stone-500 mb-3 sm:mb-4">How I Think</h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {aboutData.howIThink}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== RESUME SECTION ==================== */}
      <section id="resume" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">Experience</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary">
              Resume
            </h2>
          </motion.div>

          <div className="space-y-0">
            {experienceWithPeriod.length > 0 && experienceWithPeriod.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-8 pb-12 sm:pb-16 border-l border-stone-600/30"
              >
                <div className="absolute left-0 top-2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-500" />

                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-text-primary">
                      {item.role}
                    </h3>
                    <p className="text-text-muted mt-1 text-sm sm:text-base">{item.company}</p>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1">{item.period}</p>
                  </div>

                  <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{item.description}</p>

                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-text-muted flex gap-2 sm:gap-3 text-sm sm:text-base">
                          <span className="text-stone-600 mt-1 sm:mt-1.5 shrink-0">—</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <a
              href="/resume"
              className="link-underline text-stone-500 hover:text-stone-400 transition-colors text-xs sm:text-sm"
            >
              View full resume →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">Work</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary">
              Projects
            </h2>
            <p className="text-text-secondary mt-3 sm:mt-4 text-sm sm:text-base">Things I've built and shipped.</p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="py-6 sm:py-8 border-b border-stone-900 hover:border-stone-700 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">
                        {project.title}
                      </h3>
                      <span className={`inline-block mt-2 text-xs uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        project.status === 'live'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : project.status === 'in-progress'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-stone-500/10 text-stone-400'
                      }`}>
                        {project.status === 'live' ? 'Live' : project.status === 'in-progress' ? 'In Progress' : 'Archived'}
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed text-sm sm:text-base mb-4 sm:mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs text-stone-500 border border-stone-800 rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 sm:gap-6">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-text-muted hover:text-text-primary transition-colors text-xs sm:text-sm"
                    >
                      Visit site →
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-text-muted hover:text-text-primary transition-colors text-xs sm:text-sm"
                      >
                        Source code →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <a
              href="/projects"
              className="link-underline text-stone-500 hover:text-stone-400 transition-colors text-xs sm:text-sm"
            >
              View all projects →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== BLOG PREVIEW SECTION ==================== */}
      <section id="blog" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">Writing</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary">
              Blog
            </h2>
            <p className="text-text-secondary mt-3 sm:mt-4 text-sm sm:text-base">Engineering essays and technical writing.</p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {blogPostsData.slice(0, 3).map((post, index) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block"
              >
                <div className="flex items-baseline gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <time className="text-stone-600 text-xs sm:text-sm">{post.date}</time>
                  <span className="text-stone-700">·</span>
                  <span className="text-text-muted text-xs sm:text-sm">{post.category}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-primary group-hover:text-stone-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base">
                  {post.excerpt}
                </p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <a
              href="/blog"
              className="link-underline text-stone-500 hover:text-stone-400 transition-colors text-xs sm:text-sm"
            >
              View all posts →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== GOALS SECTION ==================== */}
      <section id="goals" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start">
        {/* Singularity reveal animation wrapper */}
        <motion.div
          initial={false}
          animate={
            isRevealing
              ? {
                  scale: [0.3, 1],
                  opacity: [0, 1],
                  filter: ['blur(10px)', 'blur(0px)'],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            times: [0, 1],
          }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">Progress</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary">
              Goals of 2026
            </h2>
          </motion.div>

          {/* Goals by category */}
          {(['Engineering', 'Learning', 'Personal'] as const).map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="mb-12 sm:mb-16"
            >
              <h3 className="font-display text-base sm:text-lg md:text-xl text-stone-600 mb-6 sm:mb-8 tracking-wide uppercase text-xs sm:text-sm">
                {category}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {goalsData
                  .filter((goal) => goal.category === category)
                  .map((goal, index) => (
                    <GoalCard key={goal.id} goal={goal} index={index} />
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== SOCIAL / CONNECT SECTION ==================== */}
      <section id="social" className="min-h-screen pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 snap-start flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-xs sm:text-sm mb-4">Connect</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary mb-3 sm:mb-4">
              Let's Work Together
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">Find me online or send me an email.</p>
          </motion.div>

          <div className="space-y-16">
            {['Code', 'Writing', 'Professional'].map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <h3 className="font-display text-xl text-stone-600 mb-6 tracking-wide uppercase text-sm">
                  {category}
                </h3>
                <div className="space-y-4">
                  {socialLinksData
                    .filter((link) => link.category === category)
                    .map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group block"
                      >
                        <div className="py-4 border-b border-stone-900 hover:border-stone-700 transition-colors">
                          <div className="flex items-baseline justify-between">
                            <h4 className="font-display text-2xl text-text-primary group-hover:text-stone-400 transition-colors">
                              {link.name}
                            </h4>
                            {link.url.startsWith('http') && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-stone-600 group-hover:text-stone-500 transition-colors"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            )}
                          </div>
                          <p className="text-text-muted mt-1">{link.description}</p>
                        </div>
                      </a>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      </motion.div>
      <footer className="py-12 px-6 border-t border-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stone-600 text-sm">
            © {new Date().getFullYear()} {personalData.name}. Built with craft and intention.
          </p>
        </div>
      </footer>
    </div>
  );
}
