import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { Icon } from './Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company */}
          <div>
            <span className="text-white font-bold text-lg block mb-4">{siteConfig.companyName}</span>
            <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 text-[11px] font-medium text-white/30 border border-white/10"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/40 font-medium text-xs tracking-[0.2em] uppercase mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/30 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 font-medium text-xs tracking-[0.2em] uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-white/30 hover:text-white transition-colors text-sm">
                  <Icon name="phone" className="w-4 h-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/30 hover:text-white transition-colors text-sm">
                  <Icon name="mail" className="w-4 h-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/30 text-sm">
                  <Icon name="mappin" className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    {siteConfig.address}<br />
                    {siteConfig.city}, {siteConfig.state}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <p className="text-white/10 text-xs">
            Powered by{' '}
            <a href="https://scaleify.co" target="_blank" rel="noopener noreferrer" className="hover:text-white/30 transition-colors">
              Scaleify
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
