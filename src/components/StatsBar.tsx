import { siteConfig } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function StatsBar() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="fade-section py-20 border-y border-[#e8e0d5]"
      style={{ background: '#f5f0eb' }}
      aria-label="Company statistics"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-[#ddd5c8]">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center px-6">
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: siteConfig.colors.accent,
                }}
              >
                {stat.value}
              </span>
              <span className="block text-[#6b7280] text-xs font-medium tracking-[0.2em] uppercase mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
