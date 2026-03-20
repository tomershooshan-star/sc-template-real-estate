import { siteConfig } from '../config';
import { Icon } from './Icons';

const HERO_IMAGE_DEFAULT = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&fit=crop';

const FEATURED_PROPERTIES = [
  {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&fit=crop',
    type: 'Commercial',
    address: '350 Park Avenue, Suite 800',
    price: '$4.2M',
    beds: null,
    sqft: '8,400 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fit=crop',
    type: 'Residential',
    address: '12 Lakewood Drive',
    price: '$1.85M',
    beds: '5 bed / 4 bath',
    sqft: '4,200 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&fit=crop',
    type: 'Investment',
    address: '800 Congress Ave, 3rd Floor',
    price: '$2.6M',
    beds: null,
    sqft: '6,100 sq ft',
  },
];

export function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-end overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={siteConfig.heroImage || HERO_IMAGE_DEFAULT}
            alt="Modern glass building"
            className="w-full h-full object-cover"
          />
          {/* Lighter, warmer overlay for luxury feel */}
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#1a1a1a]/30 to-transparent" />
        </div>

        {/* Content — bottom-aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-28 pt-40">
          <div className="max-w-3xl">
            {/* Overline — always white on hero image */}
            <p
              className="text-xs font-medium tracking-[0.3em] uppercase mb-6 text-white/70"
            >
              {siteConfig.license}
            </p>

            {/* Headline — serif, elegant weight */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
            >
              {siteConfig.companyName}
            </h1>

            {/* Thin gold rule */}
            <div className="w-16 h-px mb-8" style={{ background: siteConfig.colors.accent }} />

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-white/65 font-light leading-relaxed mb-12 max-w-xl tracking-wide">
              {siteConfig.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href={siteConfig.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5"
                style={{
                  background: siteConfig.colors.accent,
                  color: '#fff',
                }}
              >
                {siteConfig.ctaText}
                <Icon name="arrowright" className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="text-white/50 hover:text-white text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2"
              >
                View Services
                <span className="w-8 h-px bg-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-3 opacity-40">
          <span className="text-[10px] text-white tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-lr' }}>
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* Gradient bridge from dark hero to white body */}
      <div className="h-24 bg-gradient-to-b from-[#0d1b2a] via-[#2a3444] to-[#fafaf8]" />

      {/* Featured Properties Strip */}
      <div className="bg-[#fafaf8] border-b border-[#e8e0d5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p
                className="text-[11px] font-medium tracking-[0.3em] uppercase mb-2"
                style={{ color: siteConfig.colors.accent }}
              >
                Available Now
              </p>
              <h2
                className="text-2xl sm:text-3xl text-[#1a1a1a]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
              >
                Featured Properties
              </h2>
            </div>
            <a
              href="/properties"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-70"
              style={{ color: siteConfig.colors.accent }}
            >
              View All
              <Icon name="arrowright" className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURED_PROPERTIES.map((prop) => (
              <div
                key={prop.address}
                className="group overflow-hidden border border-[#e8e0d5] bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={prop.image}
                    alt={prop.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Details */}
                <div className="p-5">
                  <p
                    className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-2"
                    style={{ color: siteConfig.colors.accent }}
                  >
                    {prop.type}
                  </p>
                  <p className="text-sm font-semibold text-[#1a1a1a] mb-1 leading-snug">{prop.address}</p>
                  <p className="text-[#6b7280] text-xs mb-3">{prop.beds ? `${prop.beds}  ·  ` : ''}{prop.sqft}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a365d' }}
                    >
                      {prop.price}
                    </span>
                    <span
                      className="text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 group-hover:opacity-70"
                      style={{ color: siteConfig.colors.accent }}
                    >
                      Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
