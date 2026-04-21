import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

export default function FeaturedStory({ article }: { article: Article }) {
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={`/article/${article.slug}`} className="group block relative rounded-xl overflow-hidden"
      style={{ backgroundColor: '#0F172A' }}>
      <div className="relative w-full h-72 sm:h-96 lg:h-[480px]">
        {article.imageUrl && (
          <Image src={article.imageUrl} alt={article.title} fill
            className="object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500" priority />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0F172A 0%, rgba(15,23,42,0.5) 50%, transparent 100%)' }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded"
            style={{ backgroundColor: '#C41E3A' }}>Featured</span>
          <span className="text-white/60 text-xs uppercase tracking-wider capitalize">{article.category}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3 max-w-3xl group-hover:text-red-200 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl line-clamp-2 leading-relaxed mb-4">
          {article.summary}
        </p>
        <div className="flex items-center gap-3 text-white/50 text-xs">
          <span>{article.author}</span>
          <span>·</span>
          <span>{date}</span>
          {article.readTime && <><span>·</span><span>{article.readTime} min read</span></>}
        </div>
      </div>
    </Link>
  );
}