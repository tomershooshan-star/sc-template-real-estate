import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PROPERTIES_BANNER = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&fit=crop';

const properties = [
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
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fit=crop',
    type: 'Residential',
    address: '45 Willow Creek Lane',
    price: '$1.35M',
    beds: '4 bed / 3 bath',
    sqft: '3,800 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop',
    type: 'Commercial',
    address: '1200 Main Street, 12th Floor',
    price: '$7.8M',
    beds: null,
    sqft: '15,200 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&fit=crop',
    type: 'Residential',
    address: '88 Sunrise Boulevard',
    price: '$2.1M',
    beds: '6 bed / 5 bath',
    sqft: '5,600 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80&fit=crop',
    type: 'Investment',
    address: '600 Riverside Towers, Unit 4B',
    price: '$890K',
    beds: '2 bed / 2 bath',
    sqft: '1,400 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&fit=crop',
    type: 'Residential',
    address: '22 Oak Ridge Estate',
    price: '$3.4M',
    beds: '7 bed / 6 bath',
    sqft: '8,100 sq ft',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80&fit=crop',
    type: 'Commercial',
    address: '500 Tech Park Drive, Suite 300',
    price: '$5.5M',
    beds: null,
    sqft: '12,000 sq ft',
  },
];

export function PropertiesPage() {
  const gridRef = useScrollReveal<HTMLDivElement>();

  return (
    <main>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={PROPERTIES_BANNER} alt="City skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#1a1a1a]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-16">
          <nav className="mb-4 flex items-center gap-2 text-xs text-white/30" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Properties</span>
          </nav>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Our Properties
          </h1>
        </div>
      </section>

      {/* Gradient bridge */}
      <div className="h-24 bg-gradient-to-b from-[#0d1b2a] via-[#2a3444] to-[#fafaf8]" />

      {/* Properties Grid */}
      <section className="py-20 lg:py-28 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
              style={{ color: siteConfig.colors.accent }}
            >
              Available Listings
            </p>
            <h2
              className="text-3xl sm:text-4xl text-[#1a1a1a] leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
            >
              Find Your Next Property
            </h2>
            <div className="w-12 h-px mx-auto mt-6" style={{ background: siteConfig.colors.accent }} />
          </div>

          <div ref={gridRef} className="fade-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop.address}
                className="group overflow-hidden border border-[#e8e0d5] bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
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
                <div className="p-6">
                  <p
                    className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-2"
                    style={{ color: siteConfig.colors.accent }}
                  >
                    {prop.type}
                  </p>
                  <p className="text-base font-semibold text-[#1a1a1a] mb-1 leading-snug">{prop.address}</p>
                  <p className="text-[#6b7280] text-sm mb-4">
                    {prop.beds ? `${prop.beds}  ·  ` : ''}{prop.sqft}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#e8e0d5]">
                    <span
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a365d' }}
                    >
                      {prop.price}
                    </span>
                    <span
                      className="text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer hover:opacity-70 transition-colors"
                      style={{ color: siteConfig.colors.accent }}
                    >
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#6b7280] text-sm mb-6">
              Don't see what you're looking for? We have access to off-market listings.
            </p>
            <a
              href={siteConfig.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              style={{ background: siteConfig.colors.accent, color: '#fff' }}
            >
              {siteConfig.ctaText}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
