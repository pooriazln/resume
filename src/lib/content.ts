export const content = {
  name: "Pooria Zoloorian",
  firstName: "Pooria",
  lastName: "Zoloorian",
  positioning:
    "Full-stack and on-chain engineer. I build the backend, the smart contracts, and the frontend.",
  proof: "5+ years · Solidity, Tact, TypeScript, Go",
  availability: "Available for remote, freelance, and full-time work",
  location: "Shiraz, Iran",
  nav: {
    about: "About",
    build: "What I build",
    work: "Work",
    contact: "Contact",
    hire: "Hire me",
  },
  sections: {
    about: "About",
    build: "What I build",
    work: "Where I've worked",
    contact: "Contact",
  },
  about: {
    title: "I take products from architecture and data models through to deploy.",
    body:
      "Most of what I work on is backend-heavy and on-chain: smart contracts, realtime systems, and payments. I build the frontends for the same products, so I can own a project end to end instead of handing it off in pieces.",
    current: {
      pre: "Currently at ",
      label: "Tav Holding",
      href: "https://tavholding.org",
      post: ", building Arandao.",
    },
  },
  build: [
    {
      title: "On-chain systems",
      body: "Smart contracts in Solidity and Tact, token launches, tokenomics, cross-chain bridges, and on-chain payments.",
    },
    {
      title: "Full-stack products",
      body: "APIs, dashboards, CRMs, auth, and realtime systems. NestJS, Go, Next.js, Postgres.",
    },
    {
      title: "Telegram mini apps & bots",
      body: "Telegram games and bots with on-chain payments on TON.",
    },
    {
      title: "Interactive web",
      body: "Interactive 3D interfaces with Three.js and WebGL.",
    },
  ],
  work: [
    {
      name: "Arandao",
      tag: "Current · Web3",
      body: "A Web3 platform with multi-tier referral mechanics, DAO governance, tokenomics, and a cross-chain bridge.",
      href: "",
    },
    {
      name: "tondb",
      tag: "Solo build · TON",
      body: "A discovery and voting platform for Telegram projects — users rate projects and earn a TON token for their activity, paid out by a Tact token contract.",
      href: "",
    },
    {
      name: "Aryosense",
      tag: "Backend",
      body: "A platform for user-built multiplayer 3D worlds — create, share, and explore spaces together in realtime, with AI-driven characters.",
      href: "https://aryosense.com",
    },
    {
      name: "Clinify",
      tag: "Full-stack",
      body: "A doctor-appointment platform for clinics — scheduling, bookings, and patient management.",
      href: "",
    },
    {
      name: "Redstart Apply",
      tag: "Full-stack",
      body: "A study-abroad and migration consultancy site — school and university listings, consultations, and bookings.",
      href: "",
    },
    {
      name: "Cice",
      tag: "Full build · AI",
      body: "An AI style assistant: real-time body modeling from height and weight, with size-aware shop recommendations over semantic product search.",
      href: "",
    },
    {
      name: "Jiggle",
      tag: "Frontend · Freelance",
      body: "A Telegram tap-to-earn game with on-chain payments on TON.",
      href: "",
    },
    {
      name: "Chadko",
      tag: "Full-stack",
      body: "A cross-platform Electron app for automated posting (macOS, Windows, Linux), plus a support-chat system with a reusable npm chat client.",
      href: "",
    },
  ],
  contact: {
    title: "Get in touch.",
    line: "Backend, smart contracts, or a full product build — let's talk.",
    note: "I usually reply within 24 hours.",
    emailLabel: "Email me",
  },
  scroll: "Scroll",
} as const;
