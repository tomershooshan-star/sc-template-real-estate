/**
 * Site configuration — all customizable fields.
 * This file gets auto-generated per lead from their Prospeo data.
 * To customize for a new lead, just replace the values below.
 */

export const siteConfig = {
  // Company Info
  companyName: "Pinnacle Realty Group",
  tagline: "Elevating Real Estate Since 1992",
  description: "Full-service real estate firm specializing in commercial and residential properties across the greater metro area.",
  phone: "(555) 987-6543",
  email: "info@pinnaclerealty.com",
  address: "500 Market Street, Suite 200",
  city: "Austin",
  state: "TX",

  // Logo — auto-fetched from Clearbit
  logoUrl: "https://logo.clearbit.com/pinnaclerealty.com",

  // Hero image — custom photo URL; leave empty to use the default Unsplash image
  heroImage: "",

  // Colors — extracted from logo or set manually
  colors: {
    primary: "#1a365d",      // Main brand color
    primaryLight: "#2d5a8e",  // Lighter variant
    accent: "#c9a96e",       // Accent/CTA color (warm gold)
    dark: "#fafaf8",         // Warm white background
    light: "#1a1a1a",        // Dark text
    text: "#1a1a1a",         // Body text
    textLight: "#6b7280",    // Muted text
  },

  // Services — from Prospeo keywords
  services: [
    { name: "Commercial Sales & Leasing", icon: "building" },
    { name: "Residential Sales", icon: "home" },
    { name: "Property Management", icon: "clipboard" },
    { name: "Investment Advisory", icon: "layers" },
    { name: "Market Analysis", icon: "pencil" },
    { name: "Development Consulting", icon: "hammer" },
  ],

  // Stats — generic but impressive
  stats: [
    { value: "$2B+", label: "In Transactions" },
    { value: "1,200+", label: "Properties Sold" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "30+", label: "Years Experience" },
  ],

  // Testimonials — placeholder
  testimonials: [
    {
      text: "Their market insight and negotiation skills secured us a deal we didn't think was possible.",
      author: "Managing Partner",
      role: "Commercial Investment",
    },
    {
      text: "Professional, responsive, and genuinely invested in finding the right property for our needs.",
      author: "Business Owner",
      role: "Office Relocation",
    },
  ],

  // CTA
  ctaText: "Schedule a Consultation",
  ctaUrl: "https://cal.com/scale-ify/clarity-call",

  // Footer
  license: "Licensed Real Estate Brokerage",
  certifications: ["Licensed Brokerage", "NAR Member", "CCIM Designated"],

  // SEO
  siteUrl: "https://demo.scaleify.co",
};
