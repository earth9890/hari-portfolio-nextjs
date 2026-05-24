'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { resumeData, type ExperienceItem } from '@/lib/data';

// Augmented type with period
type ExperienceWithPeriod = ExperienceItem & { period: string };

function TimelineItem({ item, index }: { item: ExperienceWithPeriod; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-16 last:pb-0 border-l border-stone-600/30"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-500" />

      <div className="space-y-3">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary">
            {item.role}
          </h3>
          <p className="text-text-muted mt-1">{item.company}</p>
          <p className="text-stone-600 text-sm mt-1">{item.period}</p>
        </div>

        <p className="text-text-secondary leading-relaxed">{item.description}</p>

        {item.achievements && item.achievements.length > 0 && (
          <ul className="space-y-2 mt-4">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="text-text-muted flex gap-3">
                <span className="text-stone-600 mt-1.5">—</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [experiences, setExperiences] = useState<ExperienceWithPeriod[]>([]);

  useEffect(() => {
    // Calculate experience duration from start date (client-side only)
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

    // Augment experience items with calculated period
    const withPeriod = resumeData.map((item) => ({
      ...item,
      period: `March 2024 — Present (${calculateExperience(item.startDate)})`,
    }));

    setExperiences(withPeriod);
  }, []);

  // Don't render until client-side hydration is complete
  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {experiences.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
