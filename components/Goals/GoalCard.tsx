'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Goal } from '@/lib/data';

interface GoalCardProps {
  goal: Goal;
  index: number;
}

export default function GoalCard({ goal, index }: GoalCardProps) {
  const [progress, setProgress] = useState(goal.progress);

  useEffect(() => {
    // Calculate progress percentage from current and target values (client-side only)
    const calculateProgress = (current?: number, target?: number): number => {
      if (current === undefined || target === undefined) return 0;
      return Math.round((current / target) * 100);
    };

    setProgress(
      goal.current && goal.target
        ? calculateProgress(goal.current, goal.target)
        : goal.progress
    );
  }, [goal.current, goal.target, goal.progress]);

  // Don't render until progress is calculated (avoid hydration mismatch)
  if (progress === 0 && goal.current === undefined) {
    return (
      <div className="bg-background-50 border border-stone-800 rounded-lg p-4 sm:p-6 hover:border-stone-700 transition-colors">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 pr-2">
            <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-text-primary mb-1.5 sm:mb-2">
              {goal.title}
            </h3>
            <p className="text-text-muted text-xs sm:text-sm">{goal.description}</p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full shrink-0 ${
              goal.status === 'completed'
                ? 'bg-stone-600'
                : goal.status === 'in-progress'
                ? 'bg-stone-500'
                : 'bg-stone-700'
            } text-background-100`}
          >
            {goal.status === 'completed'
              ? 'Completed'
              : goal.status === 'in-progress'
              ? 'In Progress'
              : 'Planned'}
          </span>
        </div>
        <div className="relative">
          <div className="h-1 bg-stone-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
              className="h-full bg-stone-600"
            />
          </div>
          <span className="absolute right-0 -top-4 sm:-top-5 text-xs text-stone-600">{progress}%</span>
        </div>
      </div>
    );
  }

  const statusColors = {
    completed: 'bg-stone-600',
    'in-progress': 'bg-stone-500',
    planned: 'bg-stone-700',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="bg-background-50 border border-stone-800 rounded-lg p-4 sm:p-6 hover:border-stone-700 transition-colors">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 pr-2">
            <h3 className="font-display text-base sm:text-lg font-semibold tracking-tight text-text-primary mb-1.5 sm:mb-2">
              {goal.title}
            </h3>
            <p className="text-text-muted text-xs sm:text-sm">{goal.description}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${statusColors[goal.status]} text-background-100`}>
            {statusLabels[goal.status]}
          </span>
        </div>

        <div className="relative">
          <div className="h-1 bg-stone-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
              className="h-full bg-stone-600"
            />
          </div>
          <span className="absolute right-0 -top-4 sm:-top-5 text-xs text-stone-600">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
