import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { Icon } from '../components/Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SERVICES_BANNER = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&fit=crop';

const extendedDescriptions: Record<string, { long: string; highlights: string[] }> = {
  'Commercial Sales & Leasing': {
    long: 'From Class A office towers to retail centers and industrial warehouses, our commercial team sources, negotiates, and closes deals that maximize your investment.',
    highlights: ['Office & retail leasing', 'Industrial properties', 'Tenant representation', 'Lease negotiation'],
  },
  'Residential Sales': {
    long: 'Whether you are buying your first home or selling a luxury estate, our residential agents provide expert guidance at every stage of the transaction.',
    highlights: ['Buyer representation', 'Listing & marketing', 'Luxury properties', 'First-time buyers'],
  },
  'Property Management': {
    long: 'Our property management division handles everything from tenant screening to maintenance coordination, ensuring your assets stay profitable and well-maintained.',
    highlights: ['Tenant screening', 'Rent collection', 'Maintenance coordination', 'Financial reporting'],
  },
  'Investment Advisory': {
    long: 'We help institutional and private investors build and optimize real estate portfolios through rigorous market analysis and strategic acquisition planning.',
    highlights: ['Portfolio optimization', 'Acquisition strategy', 'Risk assessment', '1031 exchanges'],
  },
  'Market Analysis': {
    long: 'Our research team delivers data-driven valuations, competitive market analyses, and trend forecasts that empower confident decision-making.',
    highlights: ['Comparative market analysis', 'Property valuations', 'Trend forecasting', 'Investment modeling'],
  },
  'Development Consulting': {
    long: 'From site selection and feasibility studies to entitlement support and project oversight, we guide developers through every phase of new construction.',
    highlights: ['Site selection', 'Feasibility studies', 'Entitlement support', 'Project oversight'],
  },
};

function getExtended(name: string) {
  const key = Object.keys(extendedDescriptions).find(
    (k) => name.toLowerCase().includes(k.toLowerCase().split(' ')[0].toLowerCase())
  );
  return key
    ? extendedDescriptions[key]
    : {
        long: 'Industry-leading expertise ensuring every transaction is completed to the highest standard.',
        highlights: ['Expert guidance', 'Market knowledge', 'Transparent process', 'Proven results'],
      };
}

export function ServicesPage() {
  const gridRef = useScrollReveal<HTMLDivElement>();

  return (
    <main>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_BANNER} alt="Modern glass building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/75 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-16">
          <nav className="mb-4 flex items-center gap-2 text-xs text-white/40" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Services</span>
          </nav>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Our Services
          </h1>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-28 lg:py-40 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div ref={gridRef} className="fade-section space-y-0 border-t border-[#e8e0d5]">
            {siteConfig.services.map((service, index) => {
              const ext = getExtended(service.name);
              return (
                <div
                  key={service.name}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-[#e8e0d5] hover:bg-white transition-colors px-2"
                >
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span
                      className="font-black text-3xl"
                      style={{ color: `${siteConfig.colors.accent}35` }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title + Icon */}
                  <div className="lg:col-span-3 flex items-start gap-4">
                    <Icon
                      name={service.icon}
                      className="w-5 h-5 shrink-0 mt-1"
                      style={{ color: siteConfig.colors.accent } as React.CSSProperties}
                    />
                    <h3
                      className="text-xl font-semibold group-hover:translate-x-1 transition-transform duration-300"
                      style={{ color: '#1a1a1a' }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-5">
                    <p className="text-[#4a4a4a] text-sm leading-relaxed">
                      {ext.long}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      {ext.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <span
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ background: siteConfig.colors.accent }}
                          />
                          <span className="text-[#6b7280] text-xs">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <a
              href={siteConfig.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5 text-white"
              style={{ background: siteConfig.colors.accent }}
            >
              Schedule a Consultation
              <Icon name="arrowright" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
