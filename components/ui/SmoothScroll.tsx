'use client';

import { useEffect } from 'react';

// Lenis smooth scroll wrapper
// Note: Using native scroll for simplicity - Lenis can be added later if needed
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enable smooth scrolling via CSS
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}
