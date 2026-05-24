'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { navItems, personalData } from '@/lib/data';

export default function MinimalNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              const label = navItems.find((item) => item.href === `#${id}`)?.label;
              if (label) setActiveSection(label);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background-100/80 backdrop-blur-md py-4' : 'py-6'
        }`}
      >
        <div className="container-wide flex justify-between items-center">
          <Link
            href="/"
            className={`font-display text-lg tracking-tight transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {personalData.name}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : activeSection === item.label;
              const isHashLink = item.href.startsWith('#');
              // When on home page, use hash for scrolling; otherwise link to /#section
              const href = isHashLink && pathname !== '/' ? `/${item.href}` : item.href;
              return (
                <li key={item.href}>
                  {isHashLink && pathname === '/' ? (
                    <a
                      href={href}
                      className={`relative text-sm transition-colors duration-300 ${
                        isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-stone-500"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`relative text-sm transition-colors duration-300 ${
                        isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-stone-500"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-muted hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background-100 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => {
              const isHashLink = item.href.startsWith('#');
              const href = isHashLink && pathname !== '/' ? `/${item.href}` : item.href;
              return (
                <div key={item.href}>
                  {isHashLink && pathname === '/' ? (
                    <a
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-3xl tracking-tight transition-colors text-text-primary hover:text-stone-400"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="font-display text-3xl tracking-tight transition-colors text-text-primary hover:text-stone-400"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
