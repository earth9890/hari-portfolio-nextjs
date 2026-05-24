'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { goalsData } from '@/lib/data';
import GoalCard from '@/components/Goals/GoalCard';

// Group goals by category
const goalsByCategory = {
  Personal: goalsData.filter((goal) => goal.category === 'Personal'),
  Engineering: goalsData.filter((goal) => goal.category === 'Engineering'),
  Learning: goalsData.filter((goal) => goal.category === 'Learning'),
} as const;

export default function GoalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof goalsByCategory>('Personal');

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
              Goals of 2026
            </h1>
            <p className="text-text-secondary">Tracking progress across engineering, learning, and personal growth.</p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 mb-12 overflow-x-auto"
          >
            {Object.keys(goalsByCategory).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as keyof typeof goalsByCategory)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-stone-800 text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-stone-900'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Goals list */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {goalsByCategory[selectedCategory].map((goal, index) => (
              <GoalCard key={goal.id} goal={goal} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
