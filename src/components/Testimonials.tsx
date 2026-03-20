import { useState } from 'react'
import { siteConfig } from '../config'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Carousel, TestimonialCard, type TestimonialData } from '@/components/ui/retro-testimonial'

// ---------------------------------------------------------------------------
// Static profile photos (Unsplash, cropped to face)
// ---------------------------------------------------------------------------
const PROFILE_PHOTOS = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
]

// Luxury texture background used inside the expanded card overlay
const OVERLAY_BG =
  'https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?w=800&q=80&fit=crop'

// ---------------------------------------------------------------------------
// Additional dummy testimonials so the carousel has enough cards to scroll
// ---------------------------------------------------------------------------
const EXTRA_TESTIMONIALS: TestimonialData[] = [
  {
    description:
      'The market analysis they provided was spot-on. We closed our commercial property deal 15% above our initial target.',
    name: 'Robert K.',
    designation: 'Commercial Investor',
    src: PROFILE_PHOTOS[2],
  },
  {
    description:
      'Moving our family across the state was stressful, but their residential team made the entire process seamless.',
    name: 'Amanda L.',
    designation: 'Homeowner',
    src: PROFILE_PHOTOS[3],
  },
]

// ---------------------------------------------------------------------------
// Build card data by merging config testimonials + extras
// ---------------------------------------------------------------------------
function buildTestimonials(): TestimonialData[] {
  const configCards: TestimonialData[] = siteConfig.testimonials.map((t, i) => ({
    description: t.text,
    name: t.author,
    designation: t.role,
    src: PROFILE_PHOTOS[i % PROFILE_PHOTOS.length],
  }))

  return [...configCards, ...EXTRA_TESTIMONIALS]
}

// ---------------------------------------------------------------------------
// Testimonials section
// ---------------------------------------------------------------------------
export function Testimonials() {
  const ref = useScrollReveal<HTMLElement>()
  const testimonials = buildTestimonials()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="testimonials"
      className="fade-section py-28 lg:py-40 overflow-hidden"
      style={{ background: '#f5f0eb' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p
            className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
            style={{ color: siteConfig.colors.accent }}
          >
            Client Stories
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            What Our Clients Say
          </h2>
          {/* Gold divider */}
          <div
            className="mx-auto w-16 h-[2px]"
            style={{ background: siteConfig.colors.accent }}
          />
        </div>

        {/* Retro carousel */}
        <Carousel accentColor={siteConfig.colors.accent}>
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`${t.name}-${i}`}
              {...t}
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
  )
}
