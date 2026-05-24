'use client';

import { motion } from 'framer-motion';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { socialLinksData } from '@/lib/data';

// Group social links by category
const socialLinks = {
  Code: socialLinksData.filter((link) => link.category === 'Code'),
  Writing: socialLinksData.filter((link) => link.category === 'Writing'),
  Professional: socialLinksData.filter((link) => link.category === 'Professional'),
};

export default function SocialPage() {
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
            className="mb-16"
          >
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text-primary mb-4">
              Social
            </h1>
            <p className="text-text-secondary">Where to find me online.</p>
          </motion.div>

          <div className="space-y-16">
            {Object.entries(socialLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              >
                <h2 className="font-display text-xl text-stone-600 mb-6 tracking-wide uppercase text-sm">
                  {category}
                </h2>
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group block"
                    >
                      <div className="py-4 border-b border-stone-900 hover:border-stone-700 transition-colors">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-display text-2xl text-text-primary group-hover:text-stone-400 transition-colors">
                            {link.name}
                          </h3>
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
      </motion.main>
    </>
  );
}
