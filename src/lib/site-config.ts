/** Central content for Dr. Sandeep Shetty's clinic — update here only. */

export const CLINIC = {
  name: "Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre",
  shortName: "Dr. Sandeep Shetty",
  url: "https://www.drsandeepshetty.in", // Replace with actual production domain
  tagline: "Where comfort meets innovation",
  city: "Mangaluru",
  region: "Karnataka",
  rating: 4.9,
  reviewCount: 115,
  phoneDisplay: "0824 411 3388",
  phoneTel: "tel:+918244113388",
  phoneDisplay2: "07411 133575",
  phoneTel2: "tel:+917411133575",
  whatsapp: "https://wa.me/+917411133575",
  addressLine:
    "Marian Paradise Plaza, 1st floor, Shop No. 106, Bunts Hostel Rd, near PSR Silk Sarees, Mangaluru, Karnataka 575003",
  addressLine2:
    "1st Floor of the Gateway Complex in Pandeshwar, Mangaluru, Karnataka 575001",
  mapSearchQuery:
    "Dr+Sandeep+Shetty+Dental+Clinic+Marian+Paradise+Plaza+Mangaluru",
  /** Google Maps search (directions / listing). Replace with Place URL when available. */
  get googleMapsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${this.mapSearchQuery}`;
  },
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Dr.+Sandeep+Shetty%27s+Dental+Clinic+Marian+Paradise+Plaza+Bunts+Hostel+Rd+Mangaluru+575003&t=&z=16&ie=UTF8&iwloc=&output=embed",
  hoursSummary: "Mon–Sat · 10:00 AM – 8:00 PM",
  openingNext: "Opens 10:00 AM Monday",
};

export const SERVICE_LIST = [
  "Teeth whitening",
  "Bonding",
  "Check-ups",
  "Cosmetic procedures",
  "Dental implants",
  "Dentures & bridges",
  "Emergency care",
  "Extractions",
  "Fillings and sealants",
  "Laser dentistry",
  "Mouth guards",
  "Oral surgery",
  "Root canals",
  "Invisalign®",
  "Any other"
  ,
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/drsandeepshettys",
  facebook: "https://facebook.com/",
};
