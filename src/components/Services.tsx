import { siteConfig } from '../config';
import { Icon } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const serviceDescriptions: Record<string, string> = {
  'Commercial Sales & Leasing': 'Office, retail, and industrial properties sourced and negotiated for maximum value.',
  'Residential Sales': 'Expert guidance through every step of buying or selling your home.',
  'Property Management': 'Full-service management keeping your investments performing and tenants satisfied.',
  'Investment Advisory': 'Strategic portfolio analysis and acquisition guidance for institutional and private investors.',
  'Market Analysis': 'Data-driven valuations and competitive analysis to inform your decisions.',
  'Development Consulting': 'Site selection, feasibility studies, and project oversight for new developments.',
};

function getDescription(name: string): string {
  const match = Object.keys(serviceDescriptions).find(
    (k) => name.toLowerCase().includes(k.toLowerCase().split(' ')[0].toLowerCase())
  );
  return match ? serviceDescriptions[match] : 'Professional services delivered with precision by our expert team.';
}

export function Services() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="services"
      className="fade-section py-28 lg:py-40 bg-[#fafaf8]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header — centered for real estate elegance */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p
            className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
            style={{ color: siteConfig.colors.accent }}
          >
            What We Do
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Our Services
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ background: siteConfig.colors.accent }} />
        </div>

        {/* Services — 2x3 elegant card grid (unique to real estate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service) => (
            <div
              key={service.name}
              className="group relative bg-white border border-[#e8e0d5] p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top gold line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: siteConfig.colors.accent }}
              />

              {/* Icon in gold circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 border transition-colors duration-300"
                style={{
                  borderColor: `${siteConfig.colors.accent}40`,
                  background: `${siteConfig.colors.accent}08`,
                }}
              >
                <Icon
                  name={service.icon}
                  className="w-6 h-6"
                  style={{ color: siteConfig.colors.accent } as React.CSSProperties}
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold text-[#1a1a1a] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                {getDescription(service.name)}
              </p>

              {/* Learn more link */}
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ color: siteConfig.colors.accent }}
              >
                Learn More
                <Icon name="arrowright" className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
