import { useState, useEffect } from 'react';
import { siteConfig } from '../config';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  function handleAccept() {
    setDismissed(true);
    setTimeout(() => setVisible(false), 350);
  }

  function handleManage() {
    setDismissed(true);
    setTimeout(() => setVisible(false), 350);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        transform: dismissed ? 'translateY(100%)' : 'translateY(0)',
        opacity: dismissed ? 0 : 1,
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
      }}
    >
      {/* Real-estate site has a light background, so use primary dark color for the bar */}
      <div
        className="px-6 py-4"
        style={{
          background: 'rgba(26, 54, 93, 0.97)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-50"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0z" />
            </svg>
            <p className="text-white/60 text-sm leading-relaxed">
              We use cookies to enhance your browsing experience and analyze site traffic.{' '}
              <span className="text-white/35">
                By continuing, you agree to our use of cookies.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleManage}
              className="text-sm text-white/50 hover:text-white/80 px-4 py-2 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAccept}
              className="text-sm font-semibold px-5 py-2 transition-opacity hover:opacity-90"
              style={{ background: siteConfig.colors.accent, color: '#fff' }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
