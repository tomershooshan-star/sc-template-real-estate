import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { Icon } from '../components/Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CONTACT_BANNER = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&fit=crop';

const businessHours = [
  { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useScrollReveal<HTMLElement>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    'w-full px-4 py-3.5 bg-white border border-[#e0d8ce] text-[#1a1a1a] text-sm placeholder:text-[#9ca3af] outline-none transition-all duration-300 focus:border-[var(--color-accent)]';

  return (
    <main>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={CONTACT_BANNER} alt="Modern glass building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/75 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-16">
          <nav className="mb-4 flex items-center gap-2 text-xs text-white/40" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Contact</span>
          </nav>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section ref={formRef} className="fade-section py-28 lg:py-40 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Form */}
            <div className="lg:col-span-3">
              <p
                className="text-xs font-medium tracking-[0.25em] uppercase mb-4"
                style={{ color: siteConfig.colors.accent }}
              >
                Get In Touch
              </p>
              <h2
                className="text-3xl sm:text-4xl mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#1a1a1a' }}
              >
                Let's Talk About Your Goals
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-10">
                Fill out the form and our team will get back to you within one business day.
              </p>

              {submitted ? (
                <div className="py-16 text-center border border-[#e8e0d5] bg-white">
                  <h3
                    className="font-bold text-xl mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1a1a1a' }}
                  >
                    Message Received
                  </h3>
                  <p className="text-[#6b7280] text-sm">We'll contact you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-[#6b7280] tracking-wider uppercase mb-2">Name</label>
                      <input id="name" name="name" type="text" required placeholder="John Smith" value={formState.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[#6b7280] tracking-wider uppercase mb-2">Email</label>
                      <input id="email" name="email" type="email" required placeholder="john@company.com" value={formState.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-xs font-medium text-[#6b7280] tracking-wider uppercase mb-2">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" value={formState.phone} onChange={handleChange} className={inputClass} />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-xs font-medium text-[#6b7280] tracking-wider uppercase mb-2">Message</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Tell us about your property goals..." value={formState.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:gap-5 text-white"
                    style={{ background: siteConfig.colors.accent }}
                  >
                    Send Message
                    <Icon name="arrowright" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div>
                <h3
                  className="font-bold text-sm mb-6"
                  style={{ color: '#1a1a1a' }}
                >
                  Contact Information
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors text-sm">
                      <Icon name="phone" className="w-4 h-4 shrink-0" style={{ color: siteConfig.colors.accent } as React.CSSProperties} />
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors text-sm break-all">
                      <Icon name="mail" className="w-4 h-4 shrink-0" style={{ color: siteConfig.colors.accent } as React.CSSProperties} />
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3 text-[#4a4a4a] text-sm">
                      <Icon name="mappin" className="w-4 h-4 shrink-0 mt-0.5" style={{ color: siteConfig.colors.accent } as React.CSSProperties} />
                      <span>{siteConfig.address}<br />{siteConfig.city}, {siteConfig.state}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="border-t border-[#e8e0d5] pt-8">
                <h3
                  className="font-bold text-sm mb-6"
                  style={{ color: '#1a1a1a' }}
                >
                  Business Hours
                </h3>
                <ul className="space-y-3">
                  {businessHours.map(({ day, hours }) => (
                    <li key={day} className="flex items-center justify-between">
                      <span className="text-[#6b7280] text-sm">{day}</span>
                      <span
                        className="text-sm"
                        style={{ color: hours === 'Closed' ? '#9ca3af' : '#4a4a4a' }}
                      >
                        {hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
