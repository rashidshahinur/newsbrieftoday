import Link from 'next/link';
import { CATEGORIES } from '@/types';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#0F172A' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <span className="font-display font-black text-xl block">Daily Brief</span>
            <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: '#C41E3A' }}>Today</span>
            <p className="text-white/60 text-sm leading-relaxed">Clear, concise daily news briefs. Based in Dhaka, covering the world.</p>
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase text-white/40 mb-4">Sections</h3>
            <nav className="space-y-2">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-white/70 hover:text-white transition-colors">{cat.name}</Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase text-white/40 mb-4">More</h3>
            <nav className="space-y-2">
              {CATEGORIES.slice(4).map((cat) => (
                <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-white/70 hover:text-white transition-colors">{cat.name}</Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase text-white/40 mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/70 hover:text-white transition-colors">Facebook</a>
              <a href="#newsletter" className="block text-sm text-white/70 hover:text-white transition-colors">Newsletter</a>
              <a href="mailto:editor@dailybrieftoday.com" className="block text-sm text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {year} Daily Brief Today. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}