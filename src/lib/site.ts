export const siteConfig = {
  name: "Papa Smoke",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://papasmoketx.com",
  shopUrl: process.env.NEXT_PUBLIC_SHOPIFY_URL || "https://shop.papasmoketx.com",
};

export const businessInfo = {
  name: "Papa Smoke",
  streetAddress: "37125 FM 1774 #102",
  city: "Magnolia",
  region: "TX",
  postalCode: "77355",
  phone: "(832) 382-3522",
  email: "hello@papasmoketx.com",
  latitude: 30.1840845,
  longitude: -95.7069624,
  googleMapsUrl:
    "https://www.google.com/maps/place/Papa+Smoke/@30.1840845,-95.7069624,971m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8647285219b438ed:0xb590225235ddc8b9!8m2!3d30.1840845!4d-95.7069624!16s%2Fg%2F1261wl710",
  facebookUrl: "https://facebook.com/papasmokeshop",
  openingHours: [
    "Monday 10:00 AM - 10:00 PM",
    "Tuesday 10:00 AM - 10:00 PM",
    "Wednesday 10:00 AM - 10:00 PM",
    "Thursday 10:00 AM - 10:00 PM",
    "Friday 10:00 AM - 10:00 PM",
    "Saturday 10:00 AM - 10:00 PM",
    "Sunday 10:00 AM - 10:00 PM",
  ],
  openingHoursSpecification: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  ],
  areaServed: ["Pinehurst", "Tomball", "Magnolia", "The Woodlands", "Montgomery County"],
};

export const demoImages = {
  hero:
    "https://source.unsplash.com/1600x1200/?neon,smoke-shop,storefront",
  glass:
    "https://source.unsplash.com/900x700/?glass-pipe,smoke-shop",
  accessories:
    "https://source.unsplash.com/900x700/?retail,accessories,neon",
  lounge:
    "https://source.unsplash.com/1200x800/?neon,retail,interior",
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
    body: "Friendly staff, straight answers, and a FM 1774 location built for quick stops or first-time questions.",
  },
];
