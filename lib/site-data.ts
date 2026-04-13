/**
 * Centralized site data for easy maintenance.
 * All content that appears on multiple pages or changes frequently should live here.
 */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  project: string;
  rating: number;
}

export interface TechStack {
  name: string;
  type: string;
  color?: string;
}

export interface TrustBadge {
  label: string;
  sub: string;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappFormatted: string;
  email: string;
  facebook: string;
  facebookUrl: string;
  whatsappUrl: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maria Santos",
    role: "BSIT Student, University of Santo Tomas",
    quote: "Mark saved my thesis! The system worked perfectly and I defended with confidence. Zero issues during the oral defense.",
    project: "Thesis System - Attendance Monitoring",
    rating: 5,
  },
  {
    name: "James Rivera",
    role: "Startup Founder, Manila",
    quote: "Delivered a fully functional e-commerce platform in 2 weeks. Professional, responsive, and the code quality is exceptional.",
    project: "Full-Stack Web Application",
    rating: 5,
  },
  {
    name: "Ana Bautista",
    role: "Masteral Student, Ateneo de Manila",
    quote: "My research prototype exceeded expectations. Mark understood exactly what my adviser wanted and delivered on time.",
    project: "Research Prototype - Data Analytics Dashboard",
    rating: 5,
  },
];

export const TRUST_BADGES: TrustBadge[] = [
  { label: "100% Defense Success", sub: "Verified Thesis Record" },
  { label: "Turnitin-Verified", sub: "Elite Academic Quality" },
  { label: "Industry-Standard", sub: "Scalable Tech Architectures" },
];

export const TECH_STACK: TechStack[] = [
  { name: "React JS", type: "FRONTEND" },
  { name: "Next.js", type: "FULL-STACK" },
  { name: "TypeScript", type: "TYPE-SAFE" },
  { name: "Tailwind CSS", type: "UI DESIGN" },
  { name: "React Native", type: "MOBILE APP" },
  { name: "Convex / NextAuth", type: "BACKEND" },
];

export const CONTACT: ContactInfo = {
  whatsapp: "09922972119",
  whatsappFormatted: "09922972119",
  email: "trajano.mark0826@gmail.com",
  facebook: "facebook.com/superrmarky",
  facebookUrl: "https://facebook.com/superrmarky",
  whatsappUrl: "https://wa.me/639922972119",
};

export const WHATSAPP_QR_DATA = `https://wa.me/639922972119?text=Hi%20Mark,%20I%20found%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project`;

export const PAYMENT_METHODS = ["GCash", "Maya", "Bank", "PayPal"] as const;

export const SITE_SEO = {
  title: "MCT.DEV | Full-Stack Developer & Thesis Specialist",
  description: "Mark Christian Trajano - Professional Full-Stack Web & Mobile Developer and Academic Research Specialist in the Philippines. Expert in React, Next.js, and Thesis Systems.",
  url: "https://mct.dev",
  author: "Mark Christian Trajano",
};
