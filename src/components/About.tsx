import { siteConfig } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80&fit=crop';

const pillars = [
  { title: 'Market Expertise', desc: 'Deep local market knowledge and data-driven pricing strategies.' },
  { title: 'Client-First Approach', desc: 'Your goals drive every decision, from listing to closing.' },
  { title: 'Proven Track Record', desc: 'Consistent results backed by billions in successful transactions.' },
  { title: 'Full-Service Support', desc: 'From market analysis to closing, we handle every detail.' },
];

export function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about"
      className="fade-section py-28 lg:py-40 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Image (full color, no grayscale) */}
          <div className="relative">
            <div className="overflow-hidden aspect-[4/5] shadow-xl">
              <img
                src={ABOUT_IMAGE}
                alt="Luxury property"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Accent corner detail */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 hidden lg:block"
              style={{ background: siteConfig.colors.accent, opacity: 0.15 }}
            />
          </div>

          {/* Right — Text */}
          <div>
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
              style={{ color: siteConfig.colors.accent }}
            >
              About Us
            </p>

            <h2
              className="text-4xl sm:text-5xl leading-[1.1] mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: '#1a1a1a',
              }}
            >
              Built on Trust,{' '}
              <em style={{ color: '#4a4a4a', fontStyle: 'italic' }}>Delivered with Excellence</em>
            </h2>

            <p className="text-[#4a4a4a] text-base leading-relaxed mb-12">
              {siteConfig.description} Based in {siteConfig.city}, {siteConfig.state}, we've earned our reputation through consistent delivery, clear communication, and uncompromising quality.
            </p>

            {/* Pillars — gold border-left */}
            <div className="space-y-6">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="pl-6 border-l-2"
                  style={{ borderColor: siteConfig.colors.accent }}
                >
                  <h4 className="text-[#1a1a1a] font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-[#6b7280] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
