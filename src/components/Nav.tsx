import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  function isActive(to: string) {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e8e0d5] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Home">
            {siteConfig.logoUrl ? (
              <div
                className="h-11 px-3 flex items-center rounded transition-all duration-300"
                style={scrolled ? {} : { backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <img
                  src={siteConfig.logoUrl}
                  alt={`${siteConfig.companyName} logo`}
                  className="h-8 object-contain"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    const container = img.parentElement as HTMLElement;
                    container.style.display = 'none';
                    const fallback = container.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'inline';
                  }}
                />
              </div>
            ) : null}
            <span
              className="font-bold text-lg tracking-tight group-hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: scrolled ? '#1a365d' : '#fff',
                display: siteConfig.logoUrl ? 'none' : 'inline',
              }}
            >
              {siteConfig.companyName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
                style={{
                  color: isActive(link.to)
                    ? (scrolled ? siteConfig.colors.accent : '#fff')
                    : scrolled
                    ? '#4a4a4a'
                    : 'rgba(255,255,255,0.85)',
                  textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.4)',
                }}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={siteConfig.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300"
            style={{
              border: scrolled ? `1px solid ${siteConfig.colors.accent}` : '1px solid rgba(255,255,255,0.8)',
              color: scrolled ? siteConfig.colors.accent : '#fff',
              background: 'transparent',
              textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = siteConfig.colors.accent;
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = scrolled ? siteConfig.colors.accent : '#fff';
            }}
          >
            Contact
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: scrolled ? '#4a4a4a' : 'rgba(255,255,255,0.7)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`block h-px bg-current transition-all duration-300 origin-left ${menuOpen ? 'rotate-45 translate-x-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 origin-left ${menuOpen ? '-rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
          style={{ background: 'rgba(255,255,255,0.97)' }}
        >
          <div className="flex flex-col gap-1 border-t border-[#e8e0d5] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-3 text-sm font-medium tracking-wide transition-colors"
                style={{
                  color: isActive(link.to) ? siteConfig.colors.accent : '#6b7280',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
