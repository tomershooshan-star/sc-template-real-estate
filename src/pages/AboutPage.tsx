import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { About } from '../components/About';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Carousel, TestimonialCard, type TestimonialData } from '@/components/ui/retro-testimonial';

const ABOUT_BANNER = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&fit=crop';

const values = [
  { title: 'Quality', desc: 'We deliver exceptional service and results on every transaction, no exceptions.' },
  { title: 'Trust', desc: 'Transparent communication, honest advice, and complete confidentiality.' },
  { title: 'Results', desc: 'Data-driven strategies that consistently outperform market benchmarks.' },
  { title: 'Service', desc: 'Dedicated support from first consultation through closing and beyond.' },
];

const OVERLAY_BG = 'https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?w=800&q=80&fit=crop';

const TEAM_MEMBERS: TestimonialData[] = [
  {
    description: 'Over 30 years leading real estate transactions across commercial, residential, and investment properties. Built Pinnacle from the ground up.',
    name: 'Sarah M.',
    designation: 'Founder & Broker',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
  },
  {
    description: '20 years specializing in office, retail, and industrial leasing. Closed over $500M in commercial transactions.',
    name: 'David R.',
    designation: 'Commercial Director',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    description: '15 years helping families find their dream homes. Known for her deep local market knowledge and white-glove client service.',
    name: 'Lisa C.',
    designation: 'Residential Lead',
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  },
  {
    description: '18 years in real estate investment advisory. Specializes in portfolio strategy, 1031 exchanges, and institutional acquisitions.',
    name: 'Mark T.',
    designation: 'Investment Advisor',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

export function AboutPage() {
  const valuesRef = useScrollReveal<HTMLElement>();
  const teamRef = useScrollReveal<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main>
      {/* Page Hero — image with lighter overlay + serif heading */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_BANNER} alt="Modern glass building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/75 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-16">
          <nav className="mb-4 flex items-center gap-2 text-xs text-white/40" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">About</span>
          </nav>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            About Us
          </h1>
        </div>
      </section>

      <About />

      {/* Values */}
      <section ref={valuesRef} className="fade-section py-28 lg:py-40 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-20 max-w-2xl">
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
              style={{ color: siteConfig.colors.accent }}
            >
              What Drives Us
            </p>
            <h2
              className="text-4xl sm:text-5xl leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#1a1a1a' }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#e8e0d5]">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="py-10 px-6 border-b border-[#e8e0d5] lg:border-b-0 lg:border-r border-r-[#e8e0d5] last:border-r-0"
              >
                <span
                  className="font-black text-4xl block mb-4"
                  style={{ color: `${siteConfig.colors.accent}30` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: '#1a1a1a' }}
                >
                  {value.title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — retro carousel cards */}
      <section ref={teamRef} className="fade-section py-28 lg:py-40 overflow-hidden" style={{ background: '#f5f0eb' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
              style={{ color: siteConfig.colors.accent }}
            >
              The Team
            </p>
            <h2
              className="text-4xl sm:text-5xl leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#1a1a1a' }}
            >
              Meet Our Leaders
            </h2>
            <div className="mx-auto w-16 h-[2px]" style={{ background: siteConfig.colors.accent }} />
          </div>
          <Carousel accentColor={siteConfig.colors.accent}>
            {TEAM_MEMBERS.map((member, i) => (
              <TestimonialCard
                key={member.name}
                {...member}
                index={i}
                backgroundImage={OVERLAY_BG}
                isActive={activeIndex === i}
                onOpen={(idx) => setActiveIndex(idx)}
                onClose={() => setActiveIndex(null)}
                accentColor={siteConfig.colors.accent}
              />
            ))}
          </Carousel>
        </div>
      </section>
    </main>
  );
}
