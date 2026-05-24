import Link from 'next/link';
import { notFound } from 'next/navigation';
import MinimalNav from '@/components/Navigation/MinimalNav';
import { blogPostsData } from '@/lib/data';

export async function generateStaticParams() {
  return blogPostsData
    .filter((post) => post.content !== 'Coming soon...')
    .map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <MinimalNav />

      <div className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="flex items-baseline gap-4 mb-6">
              <time className="text-stone-600">{post.date}</time>
              <span className="text-stone-700">·</span>
              <span className="text-text-muted text-sm">{post.category}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-text-primary leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-text-secondary mt-6 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-text-secondary leading-relaxed space-y-6 whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
