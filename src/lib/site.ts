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

export const socialProof = {
  recommendationRate: "80%",
  reviewCount: "28",
  facebookLikes: "743",
  visits: "66",
  headline: "Locals already know Papa Smoke.",
  summary:
    "Public listing data points to a familiar Magnolia smoke shop with steady local engagement, customer recommendations, and a reputation for inventory and helpful service.",
  highlights: [
    "Recommended by shoppers on Facebook",
    "Known locally for smoke shop inventory",
    "Easy FM 1774 stop near Pinehurst and Magnolia",
  ],
};

export const demoImages = {
  hero:
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",
  glass:
    "https://images.unsplash.com/photo-1579105857874-9ed653109e0d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  accessories:
    "https://images.unsplash.com/photo-1618588487745-2d46620cabc5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFwZXN8ZW58MHx8MHx8fDA%3D",
  localHelp:
    "https://images.unsplash.com/photo-1648824572388-08db4577c1e3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  lounge:
    "https://images.unsplash.com/photo-1524653736724-8490ee06859d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZhcGVzfGVufDB8fDB8fHww",
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
    body: "Shop glass pipes, water pipes, replacement parts, and display-worthy pieces with local guidance near Pinehurst and Magnolia.",
  },
  {
    title: "Vapes & Accessories",
    body: "Find vape devices, wraps, papers, trays, cleaners, and everyday accessories from a smoke shop people can find fast on FM 1774.",
  },
  {
    title: "Local Help",
    body: "Get quick recommendations, friendly answers, and simple directions from Pinehurst, Magnolia, Tomball, and The Woodlands.",
  },
];
