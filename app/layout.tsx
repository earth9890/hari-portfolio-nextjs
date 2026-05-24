import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Singular_dev69 — Software Engineer',
  description: 'Portfolio of a software engineer building thoughtful products.',
  icons: {
    icon: '/blackhole-icon.png',
    shortcut: '/blackhole-icon.png',
    apple: '/blackhole-icon.png',
  },
  verification: {
    google: 'ht4JVMzr-P-7rz1Om8l8vc4tLDl-0pqcnK97UuxARpI',
  },
  openGraph: {
    title: 'Singular_dev69 — Software Engineer',
    description: 'Portfolio of a software engineer building thoughtful products.',
    type: 'website',
    images: [
      {
        url: '/blackhole.webp',
        width: 1200,
        height: 630,
        alt: 'Singular_dev69 — Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singular_dev69 — Software Engineer',
    description: 'Portfolio of a software engineer building thoughtful products.',
    images: ['/blackhole.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
