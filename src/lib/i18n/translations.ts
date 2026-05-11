export type Language = "fa" | "en";

export const translations = {
  fa: {
    name: "پوریا ذوالوریان",
    tagline: "توسعه‌دهنده فول‌استک و Web3. کارهای سخت رو تحویل می‌دم.",
    location: "شیراز، ایران",
    sections: {
      whatIDo: "چه کار می‌کنم",
      selectedWork: "نمونه کارها",
      tech: "تکنولوژی‌ها",
    },
    whatIDo: [
      "Web3 — درگاه پرداخت چندزنجیره‌ای، عرضه توکن، NFT. سالیدیتی و تَکت. بیش از ۵ سال تجربه.",
      "فول‌استک — اپلیکیشن‌های production با React / Next / NestJS که زیر بار واقعی دووم می‌آرن.",
      "وب سه‌بعدی — تجربه‌های Three.js و WebGL برای محصولات تعاملی و رابط‌های immersive.",
    ],
    selectedWork: [
      "درگاه پرداخت کریپتو چندزنجیره‌ای با پشتیبانی از بیش از ۱۴ بلاکچین برای یک کلاینت پرداخت. مسئول طراحی abstraction، منطق کارمزد و pipeline تأیید تراکنش.",
      "پلتفرم کامل عرضه توکن روی TON با Tact — فروش خصوصی، مینت و mining. عملیاتی، با حجم تراکنش واقعی.",
      "بازطراحی نسخه دو مارکت‌پلیس NFT چندفروشندگی روی Polygon — منطق پاداش، قراردادهای هوشمند، end-to-end.",
    ],
    tech: [
      "React", "Next.js", "Three.js", "Svelte",
      "Node.js", "NestJS", "Solidity", "Tact",
      "TON", "Polygon", "PostgreSQL", "Docker",
    ],
    contact: {
      line: "آماده همکاری در پروژه‌های فریلنس، قراردادی و تمام‌وقت — به‌خصوص Web3، وب تعاملی و فول‌استک خلاقانه.",
      emailLabel: "تماس از طریق ایمیل",
    },
    switchLang: "EN",
  },
  en: {
    name: "Pooria Zoloorian",
    tagline: "Full-stack & web3 developer. I ship the hard stuff.",
    location: "Shiraz, Iran",
    sections: {
      whatIDo: "What I do",
      selectedWork: "Selected work",
      tech: "Tech",
    },
    whatIDo: [
      "Web3 — multi-chain payments, token launches, NFTs. Solidity, Tact. 5+ years.",
      "Full-stack — production apps with React / Next / NestJS that survive real load.",
      "Interactive 3D — Three.js / WebGL for product explorers and immersive interfaces.",
    ],
    selectedWork: [
      "Designed a multi-chain crypto payment gateway supporting 14+ blockchains for a payments client. Owned the chain abstraction, fee logic, and confirmation pipeline.",
      "Built a full token launch platform on TON in Tact — private sale, minting, mining mechanics. Live, processed real volume.",
      "Led the v2 relaunch of a multi-vendor NFT marketplace on Polygon — reward logic, smart contracts, end-to-end.",
    ],
    tech: [
      "React", "Next.js", "Three.js", "Svelte",
      "Node.js", "NestJS", "Solidity", "Tact",
      "TON", "Polygon", "PostgreSQL", "Docker",
    ],
    contact: {
      line: "Open to freelance, contract, and full-time collaborations — Web3, interactive web, and creative full-stack.",
      emailLabel: "Email me",
    },
    switchLang: "فا",
  },
} as const;

export type Translations = typeof translations.fa;
