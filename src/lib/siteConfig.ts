import { atLeast, type PackageTier } from "./packages";

// Product tier this client is on. The panel patches this line per client at
// provision time. It gates which site + admin sections show (via `minTier`
// below and the admin nav). Defaults to PRO so the template/demo and any
// pre-tier client that lacks this line keep the full feature set.
const PACKAGE_TIER: PackageTier = "PRO";

// Optional sections. Flip a flag to false to remove that section from the
// navbar + footer (the new-project tool sets these per client). The route
// still exists, it is simply not linked. Tier gating (`minTier`) is layered on
// top: a section shows only when its flag is on AND the client's tier reaches
// it, so FEATURES acts as a per-client on/off *within* the tier's ceiling.
const FEATURES = {
  catering: true,
  giftCard: false,
  rewards: true,
  blog: false,
};

type FeatureKey = keyof typeof FEATURES;
type NavLink = { label: string; href: string; feature?: FeatureKey; minTier?: PackageTier };

const ALL_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/Menu" },
  { label: "Catering", href: "/catering", feature: "catering", minTier: "STANDARD" },
  { label: "Gift Cards", href: "/GiftCard", feature: "giftCard", minTier: "STANDARD" },
  { label: "Rewards", href: "/rewards", feature: "rewards", minTier: "PRO" },
  { label: "Press", href: "/Blog", feature: "blog", minTier: "STANDARD" },
  { label: "Our Story", href: "/story" },
];

const ALL_FOOTER_LINKS: NavLink[] = [
  { label: "Menu", href: "/Menu" },
  { label: "Catering", href: "/catering", feature: "catering", minTier: "STANDARD" },
  { label: "Gift Cards", href: "/GiftCard", feature: "giftCard", minTier: "STANDARD" },
  { label: "Terms", href: "/terms" },
];

// A link shows when its feature flag is on (or it has none) AND the client's
// tier reaches its minTier (or it has none).
const enabled = (l: NavLink) =>
  (!l.feature || FEATURES[l.feature]) && (!l.minTier || atLeast(PACKAGE_TIER, l.minTier));
const pickLink = ({ label, href }: NavLink) => ({ label, href });

export const SITE_CONFIG = {
  // Brand
  name: "The Wagon Wheel",
  tagline: "EAGLE PASS' VIRAL TEXAS BBQ",
  subTagline:
    "Slow-smoked brisket, sausage, ribs, and Texas-size chicken fried steaks in Eagle Pass, TX.",
  legalName: "The Wagon Wheel LLC",
  trademark: "The Wagon Wheel",

  // Admin intro animation: "burger" (fast food) | "coffee" (café) | "pizza" (pizzeria)
  loaderStyle: "burger",

  defaultTheme: "dark" as "light" | "dark",

  // Main call-to-action button label
  menuCtaLabel: "Order online",

  // Loyalty / rewards program
  loyalty: {
    incentive: "free brisket rewards points, member specials, and Texas combo discounts",
  },

  // Inline catering menu shown on /catering
  catering: {
    pdfUrl: "",
    animation: "grill",
    menu: [
      {
        title: "Slow-Smoked BBQ Party Trays",
        note: "Smoked low and slow over Texas post oak, served with pickles, onions & signature house BBQ sauce",
        items: [
          { name: "Smoked Texas Brisket Tray (5 lbs)", qty: "Serves 10-12", price: 120 },
          { name: "Texas Sausage & Pork Ribs Combination Tray", qty: "Serves 10-12", price: 105 },
          { name: "Texas-Size Chicken Fried Steak Platter (10 pcs)", qty: "Serves 8-10", price: 95 },
        ],
      },
      {
        title: "Classic Texas Sides & Desserts",
        items: [
          { name: "Loaded Mac & Cheese Tray", qty: "Serves 10-12", price: 40 },
          { name: "Sweet Cream Corn Tray", qty: "Serves 10-12", price: 35 },
          { name: "Homemade Peach Cobbler Tray", qty: "Serves 10-12", price: 45 },
        ],
      },
    ] as { title: string; note?: string; items: { name: string; qty?: string; price: number }[] }[],
  },

  // Contact & Location
  address: "1824 Del Rio Blvd, Eagle Pass, TX 78852",
  street: "1824 Del Rio Blvd",
  city: "Eagle Pass",
  state: "TX",
  zip: "78852",
  phone: "(830) 513-7250",
  email: "wws78852@gmail.com",
  cateringEmail: "wws78852@gmail.com",
  timezone: "America/Chicago",
  lat: 28.7091,
  lng: -100.4995,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The%20Wagon%20Wheel%2C%20Eagle%20Pass%2C%20TX",

  // Social
  instagram: "thewagonwheel.co",
  instagramUrl: "https://www.instagram.com/thewagonwheel.co/",
  facebookUrl: "",
  tiktokUrl: "",
  beholdFeedId: "",

  // SEO
  siteUrl: "https://thewagonwheel.co",
  seoTitle: "The Wagon Wheel | Texas BBQ & Chicken Fried Steaks in Eagle Pass, TX",
  seoDescription:
    "The Wagon Wheel serves slow-smoked Texas brisket, sausage, pork ribs, and Texas-size chicken fried steaks in Eagle Pass, TX. Eagle Pass' viral BBQ destination.",
  seoKeywords: [
    "BBQ Eagle Pass TX",
    "brisket Eagle Pass",
    "chicken fried steak Eagle Pass",
    "Texas barbecue Eagle Pass",
    "BBQ catering Eagle Pass",
    "The Wagon Wheel Eagle Pass",
  ],
  ogImage: "/general/generalPages/mainImage.jpg",

  // Structured-data / business info
  cuisines: ["Barbecue", "American", "Texan"],
  priceRange: "$$",

  // Outreach conversion layer
  outreach: {
    enabled: true,
    discountReason: "review",
    trialLengthDays: 14,
    calendlyUrl: "https://calendly.com/popdeveloper54/10-minute-meet",
    signalKey: "the-wagon-wheel",
    savings: { estimatedOrdersPerDay: 35, avgOrderValue: 28, commissionPct: 20 },
  },

  // Colors (Crimson Red, Dark Charcoal & Deep Amber)
  primaryColor: "#b91c1c",
  secondaryColor: "#1a1a1a",
  accentColor: "#dc2626",

  // Hours (used for open/closed status) - 24h local time (Closed Mondays)
  hours: [
    { day: "Sunday", open: 11, close: 18 },
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: 11, close: 20 },
    { day: "Wednesday", open: 11, close: 20 },
    { day: "Thursday", open: 11, close: 20 },
    { day: "Friday", open: 11, close: 21 },
    { day: "Saturday", open: 11, close: 21 },
  ] as { day: string; open: number | null; close: number | null }[],

  // Home page text sections
  home: {
    heroHeadline: "EAGLE PASS' VIRAL TEXAS BBQ",
    heroSubHeadline: "Slow-smoked brisket & Texas-size steaks.",
    heroSlides: [
      {
        image: "/general/generalPages/mainImage.jpg",
        headline: "EAGLE PASS' VIRAL TEXAS BBQ",
        subheadline: "Slow-smoked brisket & Texas-size steaks.",
        ctaLabel: "Order online",
        ctaHref: "/Menu",
      },
      {
        image: "/general/generalPages/enjoy.jpg",
        headline: "Low & Slow Texas Post Oak BBQ",
        subheadline: "Brisket, sausage, ribs, and homemade BBQ sauce.",
        ctaLabel: "See Menu",
        ctaHref: "/Menu",
      },
      {
        image: "/general/generalPages/vibe.jpg",
        headline: "Texas-Size Chicken Fried Steaks",
        subheadline: "Hand-breaded, cooked to order, and smothered in gravy.",
        ctaLabel: "See Catering",
        ctaHref: "/catering",
      },
    ] as { image: string; headline: string; subheadline: string; ctaLabel: string; ctaHref: string }[],
    galleryTitle: "The Wagon Wheel",
    gallerySubtitle: "1824 Del Rio Blvd, Eagle Pass, TX",
    distinctiveFeatures: [
      {
        title: "Slow-smoked Texas BBQ",
        description:
          "Brisket, sausage, and pork ribs smoked low and slow over Texas post oak, finished with our homemade BBQ sauce. The real deal, every day.",
        image: "/general/generalPages/enjoy.jpg",
      },
      {
        title: "Texas-size chicken fried steaks",
        description:
          "Hand-breaded and cooked to order, smothered in generous gravy - the Texas-size plates Eagle Pass keeps coming back for.",
        image: "/general/generalPages/vibe.jpg",
      },
    ],
    featuring: [
      { name: "Takeaway", icon: "PiPackageFill" },
      { name: "Family friendly", icon: "MdOutlineFamilyRestroom" },
      { name: "Catering", icon: "BsBagCheckFill" },
      { name: "Daily Specials", icon: "TbPlant2Off" },
    ],
    faq: [
      {
        question: "What are you known for?",
        answer:
          "Slow-smoked Texas brisket, sausage, and our Texas-size chicken fried steaks - we're Eagle Pass' viral BBQ spot.",
      },
      {
        question: "What do you serve?",
        answer:
          "Smoked brisket, sausage, pork ribs, Texas Twinkles, hand-breaded chicken fried steaks, brisket sandwiches and mini tacos, plus classic sides like mac & cheese and cream corn.",
      },
      {
        question: "Do you offer catering or takeout?",
        answer:
          "Yes! We do takeout and catering - give us a call and we'll have your order ready.",
      },
      {
        question: "Where are you located?",
        answer: "We are located at 1824 Del Rio Blvd, Eagle Pass, TX 78852.",
      },
    ],
  },

  // Which optional sections are enabled
  features: FEATURES,

  // Product tier - gates site + admin sections
  packageTier: PACKAGE_TIER,

  // Navbar links
  navLinks: ALL_NAV_LINKS.filter(enabled).map(pickLink),

  // Footer
  footer: {
    get copyright() {
      return `© ${new Date().getFullYear()} The Wagon Wheel LLC. All rights reserved.`;
    },
    links: ALL_FOOTER_LINKS.filter(enabled).map(pickLink),
  },
};

export type SiteConfig = typeof SITE_CONFIG;
