'use client';

import { motion } from 'framer-motion';
import MinimalNav from '@/components/Navigation/MinimalNav';
import Timeline from '@/components/Resume/Timeline';

export default function ResumePage() {
  const handleDownload = () => {
    // This would typically link to a PDF file
    window.print();
  };

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
            transition={{ duration: 0.8 }}
            className="mb-16 flex items-center justify-between"
          >
            <div>
              <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text-primary mb-4">
                Resume
              </h1>
              <p className="text-text-secondary">Professional experience</p>
            </div>

            <button
              onClick={handleDownload}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-stone-600 rounded-lg text-text-muted hover:text-text-primary hover:border-stone-500 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="text-sm">Save as PDF</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Timeline />
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
