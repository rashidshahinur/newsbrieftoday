'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="newsletter" className="text-white py-16 px-4" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
          style={{ backgroundColor: '#C41E3A' }}>Newsletter</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 leading-tight">
          The Daily Brief, in your inbox
        </h2>
        <p className="text-white/60 text-base mb-8 leading-relaxed">
          The most important stories, every morning. Clear, concise, essential.
        </p>
        {submitted ? (
          <div className="bg-white/10 rounded-xl p-6">
            <p className="text-white font-display font-semibold text-lg">✓ You&apos;re subscribed!</p>
            <p className="text-white/60 text-sm mt-2">Look for your first brief tomorrow morning.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 transition-all" />
            <button type="submit" disabled={loading}
              className="px-6 py-3 text-white font-semibold text-sm rounded-lg transition-colors whitespace-nowrap hover:opacity-90"
              style={{ backgroundColor: '#C41E3A' }}>
              {loading ? 'Subscribing...' : 'Subscribe Free'}
            </button>
          </form>
        )}
        <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}