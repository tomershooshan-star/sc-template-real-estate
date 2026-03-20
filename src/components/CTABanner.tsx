import { siteConfig } from '../config';
import { Icon } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function CTABanner() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="contact"
      className="fade-section py-32 lg:py-44"
      style={{ background: '#f5f0eb' }}
      aria-label="Call to action"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        {/* Overline */}
        <p
          className="text-xs font-medium tracking-[0.3em] uppercase mb-6"
          style={{ color: siteConfig.colors.accent }}
        >
          Start Today
        </p>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: '#1a1a1a',
          }}
        >
          Ready to Find Your{' '}
          <em style={{ color: siteConfig.colors.accent, fontStyle: 'italic' }}>
            Perfect Property?
          </em>
        </h2>

        {/* Thin gold rule */}
        <div
          className="w-16 h-px mx-auto mb-10"
          style={{ background: siteConfig.colors.accent }}
        />

        <p className="text-[#4a4a4a] text-lg sm:text-xl mb-14 max-w-2xl mx-auto leading-relaxed font-light">
          Schedule a complimentary consultation with our team. No obligation, just expert guidance tailored to your goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={siteConfig.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5 text-white"
            style={{ background: siteConfig.colors.accent }}
          >
            {siteConfig.ctaText}
            <Icon name="arrowright" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 border"
            style={{
              borderColor: siteConfig.colors.accent,
              color: siteConfig.colors.accent,
              background: 'transparent',
            }}
          >
            <Icon name="phone" className="w-4 h-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
