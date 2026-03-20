import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { siteConfig } from './config';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SiteChat } from './components/SiteChat';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PropertiesPage } from './pages/PropertiesPage';

function App() {
  useEffect(() => {
    const root = document.documentElement;
    const { colors } = siteConfig;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-dark', colors.dark);
    root.style.setProperty('--color-light', colors.light);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-light', colors.textLight);

    document.title = `${siteConfig.companyName} — ${siteConfig.tagline}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', siteConfig.description);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafaf8]">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
        </Routes>
        <Footer />
        <SiteChat />
      </div>
    </BrowserRouter>
  );
}

export default App;
