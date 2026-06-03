"use server";

import { setDocument, deleteDocument, getCollection } from "./firestore";
import { CLINIC, SERVICE_LIST, SOCIAL } from "./site-config";
import type {
  ClinicSettings,
  HeroSection,
  AboutContent,
  Service,
  Testimonial,
  TeamMember,
  GalleryImage,
} from "./types";

export async function seedClinicSettings() {
  const settings: ClinicSettings = {
    id: "default",
    name: CLINIC.name,
    shortName: CLINIC.shortName,
    tagline: CLINIC.tagline,
    city: CLINIC.city,
    region: CLINIC.region,
    rating: CLINIC.rating,
    reviewCount: CLINIC.reviewCount,
    phoneDisplay: CLINIC.phoneDisplay,
    phoneTel: CLINIC.phoneTel,
    phoneDisplay2: CLINIC.phoneDisplay2,
    phoneTel2: CLINIC.phoneTel2,
    whatsapp: CLINIC.whatsapp,
    addressLine: CLINIC.addressLine,
    addressLine2: CLINIC.addressLine2,
    mapSearchQuery: CLINIC.mapSearchQuery,
    mapEmbedSrc: CLINIC.mapEmbedSrc,
    hoursSummary: CLINIC.hoursSummary,
    openingNext: CLINIC.openingNext,
    socialInstagram: SOCIAL.instagram,
    socialFacebook: SOCIAL.facebook,
  };

  await setDocument("settings", "default", settings);
}

export async function seedHeroSection() {
  const heroes: HeroSection[] = [
    {
      id: "hero-1",
      title: `Exceptional dental care in ${CLINIC.city}.`,
      subtitle: CLINIC.tagline,
      tagline: `A modern, minimally stressful clinic experience—clear guidance, advanced techniques, and meticulous hygiene for every age at ${CLINIC.name}.`,
      ctaText: "Book your visit",
      ctaLink: "/contact",
      heroImageUrl:
        "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1920&q=80",
      heroImageAlt: "Dental background image",
      heroVisualUrl:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=85",
      heroVisualAlt: "Advanced dental treatment suite",
      order: 0,
    },
  ];

  for (const hero of heroes) {
    await setDocument("hero", hero.id, hero);
  }
}

export async function seedServices() {
  const services: Service[] = SERVICE_LIST.map((title, idx) => ({
    id: `service-${idx}`,
    title,
    description: `Professional ${title.toLowerCase()} service`,
    category: "general",
    order: idx,
    featured: idx < 5,
  }));

  for (const service of services) {
    await setDocument("services", service.id, service);
  }
}

export async function seedTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "testimonial-1",
      name: "Verified patient",
      quote: "The place is super hygienic, clean, well-maintained.",
      rating: 5,
      featured: true,
      order: 0,
    },
    {
      id: "testimonial-2",
      name: "Ananya R.",
      quote: "Clear explanations before every step. Visits in Mangaluru finally feel stress-free.",
      rating: 5,
      featured: false,
      order: 1,
    },
    {
      id: "testimonial-3",
      name: "Rahul K.",
      quote: "Transparent planning, gentle hands, and premium attention to detail.",
      rating: 5,
      featured: false,
      order: 2,
    },
    {
      id: "testimonial-4",
      name: "Priya S.",
      quote: "Our family books online and gets reminders—it's organised and respectful of our time.",
      rating: 5,
      featured: false,
      order: 3,
    },
    {
      id: "testimonial-5",
      name: "Deepa P.",
      quote: "Sterilisation standards are obvious the moment you walk in. Highly recommended.",
      rating: 5,
      featured: false,
      order: 4,
    },
    {
      id: "testimonial-6",
      name: "Nikhil M.",
      quote: "Invisalign coaching from start to finish—they made the journey simple.",
      rating: 5,
      featured: false,
      order: 5,
    },
  ];

  for (const testimonial of testimonials) {
    await setDocument("testimonials", testimonial.id, testimonial);
  }
}

export async function seedTeam() {
  const team: TeamMember[] = [
    {
      id: "team-1",
      name: "Dr. Sandeep Shetty",
      role: "Lead clinician · orthodontics & multi-specialty dentistry",
      bio: "Driving clinical protocols, Invisalign-certified treatment planning, and a patient-calming chairside culture.",
      imageUrl:
        "/WhatsApp Image 2026-06-03 at 19.03.10.jpeg",
      order: 0,
    },
    {
      id: "team-2",
      name: "Dr. Anjali Shetty",
      role: "Clinician",
      bio: "Dedicated to comprehensive patient care, ensuring comfortable visits and exceptional treatment outcomes.",
      imageUrl:
        "/Screenshot 2026-06-03 213443.png",
      order: 1,
    },
  ];

  for (const member of team) {
    await setDocument("team", member.id, member);
  }
}

export async function seedGallery() {
  const galleryImages: GalleryImage[] = [
    {
      id: "gallery-1",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.08.57 (1).jpeg",
      alt: "Testimonial 1",
      order: 0,
    },
    {
      id: "gallery-2",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.08.57.jpeg",
      alt: "Testimonial 2",
      order: 1,
    },
    {
      id: "gallery-3",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.14.52.jpeg",
      alt: "Testimonial 3",
      order: 2,
    },
    {
      id: "gallery-4",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.19.49 (1).jpeg",
      alt: "Testimonial 4",
      order: 3,
    },
    {
      id: "gallery-5",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.19.49 (2).jpeg",
      alt: "Testimonial 5",
      order: 4,
    },
    {
      id: "gallery-6",
      url: "/testomonials/WhatsApp Image 2026-05-27 at 09.20.16.jpeg",
      alt: "Testimonial 6",
      order: 5,
    },
  ];

  for (const image of galleryImages) {
    await setDocument("gallery", image.id, image);
  }
}

export async function seedAllContent() {
  try {
    await seedClinicSettings();
    await seedHeroSection();
    await seedServices();
    await seedTestimonials();
    await seedTeam();
    await seedGallery();
    console.log("✅ Seeded all content to Firestore");
  } catch (error) {
    console.error("❌ Failed to seed content:", error);
  }
}
