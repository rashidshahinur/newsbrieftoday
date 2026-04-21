import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getArticlesByCategory } from '@/data/articles';
import { CATEGORIES } from '@/types';

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!cat) return {};
  return { title: `${cat.name} News`, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const all = getArticlesByCategory(categorySlug);
  const [top, ...rest] = all;

  return (
    <div>
      <div style={{ backgroundColor: '#0F172A' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">{category.name}</h1>
          {category.description && <p className="text-white/60 text-base max-w-xl">{category.description}</p>}
          <p className="text-white/30 text-xs mt-3">{all.length} {all.length === 1 ? 'story' : 'stories'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {all.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No stories yet in this section.</p>
            <Link href="/" className="mt-4 inline-block hover:underline text-sm" style={{ color: '#C41E3A' }}>← Back to homepage</Link>
          </div>
        ) : (
          <>
            {top && (
              <div className="mb-10">
                <NewsCard article={top} variant="horizontal" className="border border-gray-200 rounded-xl p-4" />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((a) => <NewsCard key={a.id} article={a} />)}
              </div>
            )}
          </>
        )}

        <div className="mt-14 pt-8 border-t border-gray-200">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Other Sections</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== categorySlug).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:text-white transition-all hover:bg-slate-900">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <NewsletterSignup />
    </div>
  );
}