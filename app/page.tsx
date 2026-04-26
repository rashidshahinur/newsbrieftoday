import Link from "next/link";
import Image from "next/image";
import { getFeaturedArticle, getLatestArticles } from "@/data/articles";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(9);
  const sidebarItems = latest.slice(0, 5);
  const gridItems = latest.slice(1, 7);

  return (
    <div style={{ background: "#faf9f7", minHeight: "100vh" }}>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 64px" }}>

        {/* ── Double rule NYer-style section divider ── */}
        <div style={{ borderTop: "3px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", height: "5px", marginBottom: "32px" }} />

        {/* ── Top: Hero + Sidebar ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 280px", gap: "0", marginBottom: "0" }}>

          {featured && (
            <div style={{ paddingRight: "40px", paddingBottom: "40px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C41E3A", fontWeight: 600, marginBottom: "14px" }}>
                প্রধান সংবাদ
              </p>
              {featured.imageUrl && (
                <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "22px" }}>
                  <Image src={featured.imageUrl} alt={featured.title} fill style={{ objectFit: "cover" }} priority />
                </div>
              )}
              <Link href={`/article/${featured.slug}`} style={{ textDecoration: "none" }}>
                <h2 style={{ fontFamily: "Libre Baskerville, Georgia, serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px", color: "#1a1a1a", letterSpacing: "-0.5px" }}>
                  {featured.title}
                </h2>
              </Link>
              <p style={{ fontSize: "17px", color: "#333", lineHeight: 1.75, marginBottom: "16px", fontFamily: "Hind Siliguri, sans-serif" }}>
                {featured.summary}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#888", borderTop: "1px solid #e0dbd3", paddingTop: "12px" }}>
                <span style={{ fontFamily: "Libre Baskerville, serif", fontStyle: "italic" }}>{featured.author}</span>
                <span>·</span>
                <span>{featured.readTime} মিনিট পড়ুন</span>
              </div>
            </div>
          )}

          {/* Vertical rule */}
          <div style={{ background: "#e0dbd3", width: "1px", margin: "0" }} />

          {/* Sidebar */}
          <div style={{ paddingLeft: "32px", paddingBottom: "40px" }}>
            <div style={{ borderBottom: "2px solid #1a1a1a", paddingBottom: "8px", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                আজকের সংক্ষেপ
              </h3>
            </div>
            {sidebarItems.map((article, i) => (
              <div key={article.id} style={{ display: "flex", gap: "14px", paddingBottom: "18px", marginBottom: "18px", borderBottom: "1px solid #e0dbd3" }}>
                <span style={{ fontFamily: "Libre Baskerville, serif", fontSize: "32px", fontWeight: 700, color: "#e0dbd3", lineHeight: 1, minWidth: "36px" }}>
                  {i + 1}
                </span>
                <div>
                  <Link href={`/article/${article.slug}`} style={{ textDecoration: "none" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.45, color: "#1a1a1a", marginBottom: "5px", fontFamily: "Hind Siliguri, sans-serif" }}>
                      {article.title}
                    </p>
                  </Link>
                  <p style={{ fontSize: "11px", color: "#999", fontFamily: "Libre Baskerville, serif", fontStyle: "italic" }}>
                    {article.author}
                  </p>
                </div>
              </div>
            ))}

            {/* Facebook CTA */}
            <div style={{ marginTop: "4px", paddingTop: "20px", borderTop: "2px solid #1a1a1a" }}>
              <p style={{ fontFamily: "Libre Baskerville, serif", fontSize: "12px", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Facebook
              </p>
              <p style={{ fontSize: "12px", color: "#6b6b6b", lineHeight: 1.6, marginBottom: "12px" }}>
                প্রতিদিনের সংবাদ সারসংক্ষেপ পেতে ফলো করুন।
              </p>
              <a href="https://facebook.com/dailybrieftoday" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#1877F2", color: "#fff", textAlign: "center", padding: "10px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
                👍 পেজ ফলো করুন
              </a>
            </div>
          </div>
        </div>

        {/* ── NYer double-rule divider ── */}
        <div style={{ borderTop: "3px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", height: "5px", margin: "0 0 36px" }} />

        {/* ── Section heading ── */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "Libre Baskerville, serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#1a1a1a" }}>
            সর্বশেষ সংবাদ
          </h2>
          <span style={{ fontSize: "11px", color: "#C41E3A", letterSpacing: "0.5px" }}>সব খবর →</span>
        </div>

        {/* ── 3-col grid — thin rules only, no boxes ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
          {gridItems.map((article, i) => (
            <div key={article.id} style={{
              padding: "0 28px 32px",
              paddingLeft: i % 3 === 0 ? "0" : "28px",
              paddingRight: i % 3 === 2 ? "0" : "28px",
              borderLeft: i % 3 !== 0 ? "1px solid #e0dbd3" : "none",
              borderBottom: i < 3 ? "1px solid #e0dbd3" : "none",
              paddingTop: i >= 3 ? "32px" : "0",
            }}>
              {article.imageUrl && (
                <div style={{ position: "relative", width: "100%", height: "170px", marginBottom: "16px" }}>
                  <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: "cover" }} />
                </div>
              )}
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C41E3A", fontWeight: 600, marginBottom: "8px" }}>
                {article.category}
              </p>
              <Link href={`/article/${article.slug}`} style={{ textDecoration: "none" }}>
                <h3 style={{ fontFamily: "Hind Siliguri, sans-serif", fontSize: "17px", fontWeight: 700, lineHeight: 1.35, marginBottom: "10px", color: "#1a1a1a" }}>
                  {article.title}
                </h3>
              </Link>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65, marginBottom: "12px" }}>
                {article.summary}
              </p>
              <p style={{ fontFamily: "Libre Baskerville, serif", fontSize: "11px", color: "#999", fontStyle: "italic" }}>
                {article.author}
              </p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
