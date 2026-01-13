import type { Metadata } from "next";

// 1. Environment Check
const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev';
const baseUrl = 'https://sapanafertilizer.com';

export const seoConfig = {
  title: {
    default: "Sapana Fertilizers | Agro Shop in Gandhinagar & Chandrala",
    template: "%s | Sapana Fertilizers"
  },
  description: "Best Fertilizer and Pesticide shop in Gandhinagar. Authorized dealer for Bayer, Syngenta, IFFCO. Seeds for Potato (Kufri), Groundnut (G2), and Cotton. Control Munda, Blight, and Wilt effective.",
  siteName: "Sapana Fertilizers",
  url: baseUrl,
  keywords: [
    // --- 1. Top Locations ---
    "Fertilizer shop in Gandhinagar",
    "Agro center Chandrala",
    "Pesticides dealer Kalol",
    "Khatar ni dukan Dehgam",
    
    // --- 2. Potato (Bataka) ---
    "Potato fertilizer Gujarat",
    "Bataka ni dava",         // Potato medicine
    "Kufri Pukhraj seeds",    // Popular variety
    "Potato blight medicine", // Common disease
    "Bataka ma sukaro",       // Wilt in potato
    
    // --- 3. Groundnut (Magfali) ---
    "Groundnut seeds Gujarat",
    "Magfali ni iyad",        // Groundnut caterpillar
    "Munda ni dava",          // White grub (Huge problem in GJ)
    "Magfali growth booster",
    
    // --- 4. Vegetables (Shakbhaji) ---
    "Tomato virus medicine",
    "Ringan ni dava",         // Brinjal medicine
    "Bhinda ma iyad",         // Okra pest
    "Vegetable seeds shop",
    
    // --- 5. General Vernacular (Gujlish) ---
    "Jantu nashak dava",      // Insecticide
    "Kheti vadi kendra",      // Agriculture center
    "Sardar khatar price",    // GSFC Fertilizer
    "Urea bhav aaj no",       // Urea price
    
    // --- 6. Brands ---
    "Bayer pesticides",
    "Syngenta fungicides",
    "UPL products list",
    "Sapana Fertilizers"
  ]
};

// 2. Local Business Structured Data (JSON-LD)
export const localBusinessJsonLd = !isDev ? {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sapana Fertilizers",
  "image": `${baseUrl}/logo.png`,
  "telephone": "+91 9898929874",
  "url": baseUrl,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "At & Post Chandrala, Near NH-48",
    "addressLocality": "Gandhinagar",
    "addressRegion": "Gujarat",
    "postalCode": "382321",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.2156,
    "longitude": 72.6369 
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "20:00"
  },
  "areaServed": ["Gandhinagar", "Chandrala", "Kalol", "Dehgam", "Chiloda"]
} : null;

// 3. Metadata Export
export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: !isDev ? seoConfig.title : "[DEV] Sapana Fertilizers",
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: "Sapana Fertilizers" }],
  
  robots: {
    index: !isDev,
    follow: !isDev,
    googleBot: {
      index: !isDev,
      follow: !isDev,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: seoConfig.siteName,
    title: seoConfig.title.default,
    description: seoConfig.description,
    
  },
  
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Gandhinagar",
    "geo.position": "23.2156;72.6369",
    "ICBM": "23.2156, 72.6369"
  }
};