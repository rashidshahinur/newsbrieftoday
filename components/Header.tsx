import Link from 'next/link';

const navItems = [
  { label: 'বাংলাদেশ', href: '/category/bangladesh' },
  { label: 'আন্তর্জাতিক', href: '/category/world' },
  { label: 'ব্যবসা', href: '/category/business' },
  { label: 'প্রযুক্তি', href: '/category/tech' },
  { label: 'স্বাস্থ্য', href: '/category/health' },
  { label: 'সংস্কৃতি', href: '/category/culture' },
  { label: 'বিনোদন', href: '/category/entertainment' },
];

export default function Header() {
  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header style={{ borderBottom: '1px solid #e0dbd3' }}>
      {/* Top strip */}
      <div style={{
        background: '#1a1a1a',
        color: '#999',
        fontSize: '11px',
        padding: '5px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{today}</span>
        <span style={{ letterSpacing: '1px' }}>DAILY BRIEF TODAY</span>
        <span>dailybrieftoday.com</span>
      </div>

      {/* Masthead */}
      <div style={{ textAlign: 'center', padding: '28px 16px 20px', borderBottom: '3px solid #1a1a1a' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1
            className="masthead"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-1px',
              lineHeight: 1,
              color: '#1a1a1a',
            }}
          >
            Daily Brief Today
          </h1>
        </Link>
        <p style={{
          fontFamily: "'Hind Siliguri', sans-serif",
          fontSize: '12px',
          color: '#6b6b6b',
          marginTop: '8px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          দৈনিক সংক্ষিপ্ত · আজকের গুরুত্বপূর্ণ সংবাদ
        </p>
      </div>

      {/* Nav */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        padding: '10px 32px',
        flexWrap: 'wrap',
        borderBottom: '1px solid #e0dbd3',
      }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontSize: '12px',
              color: '#1a1a1a',
              letterSpacing: '0.5px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}