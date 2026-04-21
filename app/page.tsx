import FeaturedStory from '@/components/FeaturedStory';
import NewsCard from '@/components/NewsCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import BreakingBanner from '@/components/BreakingBanner';
import { getFeaturedArticle, getLatestArticles, getArticlesByCategory } from '@/data/articles';
import { CATEGORIES } from '@/types';
import Link from 'next/link';

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(9);
  const bangladeshArticles = getArticlesByCategory('bangladesh').slice(0, 4);
  const worldArticles = getArticlesByCategory('world').slice(0, 4);

  return (
    <div>
      <BreakingBanner headline="Welcome to Daily Brief Today — Clear, concise news from Bangladesh and around the world." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {featured && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 border-t-4" style={{ borderColor: '#C41E3A' }} />
              <span className="font-bold text-xs tracking-widest uppercase" style={{ color: '#C41E3A' }}>Top Story</span>
            </div>
            <FeaturedStory article={featured} />
          </section>
        )}

        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-1 h-6 rounded-full" style={{ backgroundColor: '#C41E3A' }} />
            <h2 className="font-display font-bold text-2xl" style={{ color: '#0F172A' }}>Latest Stories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((article) => (
              <NewsCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <section>
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2" style={{ borderColor: '#0F172A' }}>
              <h2 className="font-display font-bold text-xl" style={{ color: '#0F172A' }}>Bangladesh</h2>
              <Link href="/bangladesh" className="text-xs font-bold uppercase tracking-wider hover:underline" style={{ color: '#C41E3A' }}>
                All stories →
              </Link>
            </div>
            <div>{bangladeshArticles.map((a) => <NewsCard key={a.id} article={a} variant="compact" />)}</div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2" style={{ borderColor: '#0F172A' }}>
              <h2 className="font-display font-bold text-xl" style={{ color: '#0F172A' }}>World</h2>
              <Link href="/world" className="text-xs font-bold uppercase tracking-wider hover:underline" style={{ color: '#C41E3A' }}>
                All stories →
              </Link>
            </div>
            <div>{worldArticles.map((a) => <NewsCard key={a.id} article={a} variant="compact" />)}</div>
          </section>
        </div>

        <section className="mb-14 py-8 bg-gray-50 rounded-xl px-6">
          <h2 className="font-display font-bold text-xl mb-5 text-center" style={{ color: '#0F172A' }}>Browse by Section</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:text-white transition-all duration-200">
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <NewsletterSignup />
    </div>
  );
}