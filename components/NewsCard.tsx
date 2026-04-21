import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface NewsCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  bangladesh: '#15803d',
  world: '#1d4ed8',
  politics: '#7e22ce',
  tech: '#0e7490',
  business: '#1e293b',
  health: '#047857',
  culture: '#b45309',
  entertainment: '#be185d',
};

function formatShort(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function NewsCard({ article, variant = 'default', className = '' }: NewsCardProps) {
  const color = CATEGORY_COLORS[article.category] || '#374151';

  const Badge = () => (
    <span className="inline-block px-2 py-0.5 rounded text-white mr-1 mb-1"
      style={{ backgroundColor: color, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
      {article.category}
    </span>
  );

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className={`group flex gap-3 py-3 border-b border-gray-200 last:border-0 ${className}`}>
        <div className="flex-1 min-w-0">
          <Badge />
          <h3 className="font-display font-semibold text-sm text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{formatShort(article.publishDate)}</p>
        </div>
        {article.imageUrl && (
          <div className="flex-shrink-0 w-20 h-16 rounded overflow-hidden bg-gray-100">
            <Image src={article.imageUrl} alt={article.title} width={80} height={64} className="w-full h-full object-cover" />
          </div>
        )}
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className={`news-card group flex gap-4 ${className}`}>
        <div className="flex-shrink-0 w-36 sm:w-48 h-28 sm:h-32 rounded overflow-hidden bg-gray-100">
          {article.imageUrl && (
            <Image src={article.imageUrl} alt={article.title} width={192} height={128} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex-1 py-1 min-w-0">
          <Badge />
          <h3 className="font-display font-semibold text-base text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">{article.summary}</p>
          <p className="text-xs text-gray-400 mt-2">{formatShort(article.publishDate)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className={`news-card group block bg-white rounded-lg overflow-hidden border border-gray-200 ${className}`}>
      <div className="card-image-wrapper w-full h-48 sm:h-52 bg-gray-100">
        {article.imageUrl && (
          <Image src={article.imageUrl} alt={article.title} width={400} height={208} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <Badge />
        <h3 className="font-display font-semibold text-base text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-3">{article.summary}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{article.author}</span>
          <span>{formatShort(article.publishDate)}</span>
        </div>
      </div>
    </Link>
  );
}