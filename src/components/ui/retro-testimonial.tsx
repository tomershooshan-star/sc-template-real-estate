/**
 * RetroTestimonial — vintage-style carousel with expandable cards.
 *
 * Usage:
 *   import { Carousel, TestimonialCard } from '@/components/ui/retro-testimonial'
 *
 *   <Carousel accentColor={siteConfig.colors.accent}>
 *     {testimonials.map((t) => (
 *       <TestimonialCard key={t.name} {...t} accentColor={siteConfig.colors.accent} backgroundImage="https://..." />
 *     ))}
 *   </Carousel>
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TestimonialData {
  /** Quote text shown on the card */
  description: string
  /** Full name of the person */
  name: string
  /** Job title / company / category */
  designation: string
  /** URL for circular profile photo */
  src: string
}

// ---------------------------------------------------------------------------
// useOutsideClick
// ---------------------------------------------------------------------------

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    function listener(e: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// ---------------------------------------------------------------------------
// ProfileImage
// ---------------------------------------------------------------------------

interface ProfileImageProps {
  src: string
  alt: string
  className?: string
  accentColor: string
}

function ProfileImage({ src, alt, className, accentColor }: ProfileImageProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full',
        className,
      )}
      style={{ border: `3px solid ${accentColor}` }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'sepia(30%) contrast(1.05) brightness(0.97)' }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// TestimonialCard
// ---------------------------------------------------------------------------

interface TestimonialCardProps extends TestimonialData {
  /** Unsplash URL used as the overlay background when expanded */
  backgroundImage?: string
  index: number
  /** Called when this card is set as the active expanded card */
  onOpen: (index: number) => void
  /** Called to close the expanded overlay */
  onClose: () => void
  isActive: boolean
  /** Brand accent color — passed from parent so this UI component stays config-agnostic */
  accentColor?: string
}

export function TestimonialCard({
  description,
  name,
  designation,
  src,
  backgroundImage,
  index,
  onOpen,
  onClose,
  isActive,
  accentColor = '#c9a96e',
}: TestimonialCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  useOutsideClick(overlayRef, onClose)

  // Derive a secondary gradient stop ~20% lighter for the top rule
  const accentLight = accentColor + 'cc'

  return (
    <>
      {/* ---- Collapsed card ---- */}
      <motion.div
        layoutId={`card-${index}`}
        onClick={() => onOpen(index)}
        whileHover={{ rotate: 1, scale: 1.025 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
        style={{
          width: '320px',
          height: '500px',
          background: 'linear-gradient(160deg, #f2f0eb 0%, #fff9eb 100%)',
          border: '1px solid #e8dfc8',
        }}
        aria-label={`Testimonial from ${name}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(index)}
      >
        {/* Decorative top rule */}
        <div
          className="absolute top-0 inset-x-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${accentColor} 0%, ${accentLight} 100%)` }}
        />

        {/* Content */}
        <div className="flex flex-col items-center justify-between h-full px-8 py-10">
          {/* Profile */}
          <div className="flex flex-col items-center gap-4">
            <ProfileImage src={src} alt={name} className="w-24 h-24" accentColor={accentColor} />
            <div className="text-center">
              <p
                className="font-semibold text-sm tracking-wide"
                style={{ color: '#1f1b1d', fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {name}
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-0.5"
                style={{ color: accentColor, letterSpacing: '0.12em' }}
              >
                {designation}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-px" style={{ background: accentColor }} />

          {/* Quote */}
          <div className="flex-1 flex items-center mt-6">
            <p
              className="text-center text-base leading-relaxed lowercase italic"
              style={{
                color: 'rgba(31, 27, 29, 0.72)',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              &ldquo;{description}&rdquo;
            </p>
          </div>

          {/* Tap hint */}
          <p
            className="text-[10px] tracking-widest uppercase mt-4"
            style={{ color: `${accentColor}80` }}
          >
            tap to expand
          </p>
        </div>
      </motion.div>

      {/* ---- Expanded overlay ---- */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(20, 15, 10, 0.72)', backdropFilter: 'blur(6px)' }}
            />

            {/* Expanded card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                ref={overlayRef}
                layoutId={`card-${index}`}
                className="relative overflow-hidden rounded-3xl shadow-2xl max-w-lg w-full"
                style={{
                  background: 'linear-gradient(160deg, #f2f0eb 0%, #fff9eb 100%)',
                  border: '1px solid #e8dfc8',
                }}
              >
                {/* Background image with overlay */}
                {backgroundImage && (
                  <div className="absolute inset-0 pointer-events-none">
                    <img
                      src={backgroundImage}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
                    />
                  </div>
                )}

                {/* Top rule */}
                <div
                  className="absolute top-0 inset-x-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${accentColor} 0%, ${accentLight} 100%)` }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2"
                  style={{
                    background: accentColor,
                    outlineColor: accentColor,
                  }}
                  aria-label="Close testimonial"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex flex-col items-center px-10 py-12 gap-6">
                  <ProfileImage src={src} alt={name} className="w-28 h-28" accentColor={accentColor} />

                  <div className="text-center">
                    <p
                      className="font-bold text-base tracking-wide"
                      style={{ color: '#1f1b1d', fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-xs tracking-widest uppercase mt-1"
                      style={{ color: accentColor, letterSpacing: '0.14em' }}
                    >
                      {designation}
                    </p>
                  </div>

                  <div className="w-16 h-px" style={{ background: accentColor }} />

                  <p
                    className="text-center text-lg leading-relaxed lowercase italic"
                    style={{
                      color: 'rgba(31, 27, 29, 0.8)',
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    &ldquo;{description}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------

interface CarouselProps {
  children: React.ReactNode
  className?: string
  /** Brand accent color for arrow buttons — passed from parent */
  accentColor?: string
}

export function Carousel({ children, className, accentColor = '#c9a96e' }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    return () => el.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = 340 // card width + gap
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 focus:outline-none focus-visible:ring-2"
        style={{
          background: accentColor,
          transform: 'translate(-50%, -50%)',
          outlineColor: accentColor,
        }}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Scrollable track */}
      <motion.div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {React.Children.map(children, (child) => (
          <div style={{ scrollSnapAlign: 'center', flexShrink: 0 }}>{child}</div>
        ))}
      </motion.div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 focus:outline-none focus-visible:ring-2"
        style={{
          background: accentColor,
          transform: 'translate(50%, -50%)',
          outlineColor: accentColor,
        }}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Hide native scrollbar (Webkit) */}
      <style>{`.retro-track::-webkit-scrollbar { display: none; }`}</style>
    </div>
  )
}
