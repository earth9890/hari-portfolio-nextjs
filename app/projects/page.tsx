'use client';

import { motion } from 'framer-motion';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { projectsData } from '@/lib/data';

export default function ProjectsPage() {
  return (
    <>
      <MinimalNav />

      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-stone-600 uppercase tracking-widest text-sm mb-4">Work</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text-primary mb-4">
              Projects
            </h1>
            <p className="text-text-secondary">Things I've built and shipped.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="py-8 border-b border-stone-900"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">
                    {project.title}
                  </h2>
                  <span className={`shrink-0 text-xs uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    project.status === 'live'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : project.status === 'in-progress'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-stone-500/10 text-stone-400'
                  }`}>
                    {project.status === 'live' ? 'Live' : project.status === 'in-progress' ? 'In Progress' : 'Archived'}
                  </span>
                </div>

                <p className="text-text-secondary leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-stone-500 border border-stone-800 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    Visit site →
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-text-muted hover:text-text-primary transition-colors text-sm"
                    >
                      Source code →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
