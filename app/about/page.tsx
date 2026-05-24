'use client';

import { motion } from 'framer-motion';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { aboutData } from '@/lib/data';

export default function AboutPage() {
  return (
    <>
      <MinimalNav />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen pt-32 pb-24 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-24"
          >
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text-primary mb-8">
              About
            </h1>
            <p className="font-sans text-xl md:text-2xl text-text-secondary leading-relaxed">
              {aboutData.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-24"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text-primary mb-8">
              Philosophy
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                {aboutData.philosophy}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-24"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text-primary mb-8">
              What I Build
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                {aboutData.whatIBuild}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text-primary mb-8">
              How I Think
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                {aboutData.howIThink}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
