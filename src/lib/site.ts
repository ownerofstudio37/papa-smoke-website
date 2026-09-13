export const siteConfig = {
  name: "Papa Smoke",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://papasmoketx.com",
  shopUrl: process.env.NEXT_PUBLIC_SHOPIFY_URL || "https://shop.papasmoketx.com",
};

export const businessInfo = {
  name: "Papa Smoke",
  streetAddress: "Pinehurst, TX",
  city: "Pinehurst",
  region: "TX",
  postalCode: "77362",
  phone: "(832) 555-0198",
  email: "hello@papasmoketx.com",
  areaServed: ["Pinehurst", "Tomball", "Magnolia", "The Woodlands", "Montgomery County"],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/blog", label: "Blog" },
];

export const defaultHomeSections = [
  {
    title: "Premium Glass",
    body: "Hand pipes, water pipes, replacement parts, and practical guidance for the setup you actually want.",
  },
  {
    title: "Vapes & Accessories",
    body: "A rotating selection of devices, wraps, papers, trays, cleaners, and everyday smoke shop essentials.",
  },
  {
    title: "Local Help",
    body: "Friendly staff, straight answers, and a Pinehurst location built for quick stops or first-time questions.",
  },
];
