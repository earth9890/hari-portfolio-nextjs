'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { blogPostsData } from '@/lib/data';

export default function BlogPage() {
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
            <p className="text-stone-600 uppercase tracking-widest text-sm mb-4">Writing</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-text-primary mb-4">
              Blog
            </h1>
            <p className="text-text-secondary">Engineering essays and technical writing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-16"
          >
            {blogPostsData.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="flex items-baseline gap-4 mb-3">
                    <time className="text-stone-600 text-sm">{post.date}</time>
                    <span className="text-stone-700">·</span>
                    <span className="text-text-muted text-sm">{post.category}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text-primary group-hover:text-stone-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
