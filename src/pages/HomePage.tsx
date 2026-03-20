import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { StatsBar } from '../components/StatsBar';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { CTABanner } from '../components/CTABanner';

export function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <StatsBar />
      <About />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
