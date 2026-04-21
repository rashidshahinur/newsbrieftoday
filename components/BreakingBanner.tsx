export default function BreakingBanner({ headline }: { headline: string }) {
  return (
    <div className="text-white overflow-hidden py-2" style={{ backgroundColor: '#C41E3A' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <span className="flex-shrink-0 bg-white font-bold text-xs tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: '#C41E3A' }}>Breaking</span>
        <p className="ticker-text text-sm font-medium">{headline}</p>
      </div>
    </div>
  );
}