import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getRelatedArticles, articles } from '@/data/articles';
import NewsCard from '@/components/NewsCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { CATEGORIES } from '@/types';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, images: article.imageUrl ? [{ url: article.imageUrl }] : [] },
  };
}

const CAT_COLORS: Record<string, string> = {
  bangladesh: '#15803d', world: '#1d4ed8', politics: '#7e22ce',
  tech: '#0e7490', business: '#1e293b', health: '#047857', culture: '#b45309',
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, article.category, 3);
  const catInfo = CATEGORIES.find((c) => c.slug === article.category);
  const catColor = CAT_COLORS[article.category] || '#374151';
  const date = new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span className="mx-2">›</span>
          {catInfo && <><Link href={`/${article.category}`} className="hover:text-red-600 capitalize">{catInfo.name}</Link><span className="mx-2">›</span></>}
          <span className="text-gray-700 line-clamp-1">{article.title}</span>
        </nav>

        <span className="inline-block px-2.5 py-1 rounded text-white mb-4 text-xs font-bold tracking-widest uppercase"
          style={{ backgroundColor: catColor }}>
          {article.category}
        </span>

        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5"
          style={{ color: '#0F172A' }}>
          {article.title}
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed border-l-4 pl-4 mb-6"
          style={{ borderColor: '#C41E3A' }}>
          {article.summary}
        </p>

        <div className="flex items-center gap-3 text-sm text-gray-400 pb-6 border-b border-gray-200">
          <span className="font-medium text-gray-700">{article.author}</span>
          <span>·</span>
          <time>{date}</time>
          {article.readTime && <><span>·</span><span>{article.readTime} min read</span></>}
        </div>
      </div>

      {article.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden bg-gray-100">
            <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="article-content text-gray-800 text-lg leading-relaxed">
          {article.content.split('\n\n').map((p, i) =>
            p.trim() ? <p key={i} className="mb-6 leading-[1.85]">{p.trim()}</p> : null
          )}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Share</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://dailybrieftoday.com/article/${article.slug}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 text-white text-sm font-medium rounded hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1877F2' }}>Facebook</a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://dailybrieftoday.com/article/${article.slug}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">X / Twitter</a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-6 rounded-full" style={{ backgroundColor: '#C41E3A' }} />
              <h2 className="font-display font-bold text-xl" style={{ color: '#0F172A' }}>Related Stories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => <NewsCard key={r.id} article={r} />)}
            </div>
          </div>
        </div>
      )}
      <NewsletterSignup />
    </div>
  );
}