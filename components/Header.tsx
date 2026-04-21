'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/types';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div style={{ backgroundColor: '#0F172A' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs">
            <span className="text-gray-400">{today}</span>
            <Link href="#newsletter" style={{ color: '#C41E3A' }} className="font-medium hover:opacity-80">
              Subscribe →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight"
              style={{ color: '#0F172A' }}>
              Daily Brief
            </span>
            <span className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#C41E3A', fontFamily: 'var(--font-inter)' }}>
              Today
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}>
                {cat.name}
              </Link>
            ))}
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}