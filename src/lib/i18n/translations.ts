export type Language = "fa" | "en";

export const translations = {
  fa: {
    name: "پوریا ذوالوریان",
    greeting: "",
    title: "فول‌استک و وب۳",
    titleParts: ["فول‌استک", "وب۳", "تجربه‌های سه‌بعدی"],
    location: "شیراز، ایران",
    // Stats (kept original as you didn't ask to change them)
    stats: {
      yearsFullStack: { value: "+۵", label: "سال تجربه فول‌استک" },
      yearsWeb3: { value: "+۳", label: "سال تجربه وب۳" },
      chainsDeployed: { value: "۳", label: "بلاکچین فعال" },
      projects: { value: "+۱۰", label: "پروژه عملیاتی" },
    },
    // Sections
    sections: {
      about: "درباره من",
      experience: "سوابق کاری",
      skills: "مهارت‌ها",
    },
    aboutText: `سلام، من پوریام.
حدود پنج ساله که به عنوان Full-Stack Developer فعالیت می‌کنم و تمرکز اصلی‌ام روی پروژه‌های Web3 بوده؛ از طراحی و پیاده‌سازی سیستم‌های multi-chain payment گرفته تا token launch، NFT و توسعه رابط‌های کاربری interactive و سه‌بعدی.
به ساخت محصولاتی علاقه دارم که علاوه بر عملکرد فنی قوی، تجربه کاربری دقیق و قابل لمس داشته باشند. اگر روی پروژه یا ایده‌ای کار می‌کنید و فکر می‌کنید می‌تونم مفید باشم، خوشحال می‌شم بیشتر درباره‌ش صحبت کنیم.`,
    aboutFeatures: [
      {
        icon: "code",
        title: "فول‌استک",
        description:
          "از صفر تا صد اپلیکیشن می‌سازم با React، Next.js، Node.js و NestJS — طوری که تو تولید دووم بیاره",
      },
      {
        icon: "blockchain",
        title: "وب۳ و بلاکچین",
        description:
          "قرارداد هوشمند و dApp روی TRON، Polygon، TON — با Solidity و Tact — از مینت و فروش تا پرداخت چند شبکه‌ای",
      },
      {
        icon: "cube",
        title: "وب سه‌بعدی و تعاملی",
        description:
          "تجربه‌های جذاب و زنده درست می‌کنم با Three.js و WebGL — مثلاً explorer محصول یا رابط‌های immersive",
      },
      {
        icon: "server",
        title: "بک‌اند محکم",
        description:
          "سیستم‌هایی طراحی می‌کنم که زیر فشار واقعی نلرزن و با تغییر نیازها همراه بشن",
      },
    ],
    // Timeline
    now: "اکنون",
    currentDate: "بهمن ۱۴۰۴",
    started: "شروع از مرداد ۱۳۹۹",
    // Experience (lightly polished for natural tone, but kept structure & facts)
    experiences: [
      {
        company: "شرکت تاو",
        role: "توسعه‌دهنده فول‌استک",
        startDate: "شهریور ۱۴۰۲",
        endDate: "بهمن ۱۴۰۴",
        duration: "۲.۵ سال",
        highlights: [
          "دو پلتفرم وب سه‌بعدی عملیاتی با Three.js ساختم — از جمله سیستم‌هایی با تجربه‌های تعاملی جذاب",
          "سیستم جستجوی هوشمند مبتنی بر اندازه‌های بدن پیاده کردم که پیشنهاد لباس رو خیلی بهتر کرد",
          "پلتفرم کامل عرضه توکن روی TON (فروش خصوصی + مینت + ماینینگ) با Tact ساختم",
          "درگاه پرداخت کریپتو چندزنجیره‌ای با پشتیبانی بیش از ۱۴ بلاکچین طراحی و راه‌اندازی کردم",
          "نسخه دوم مارکت‌پلیس NFT چندفروشندگی رو روی Polygon دوباره لانچ کردیم (با منطق پاداش و قرارداد هوشمند)",
          "قراردادهای هوشمند TRON برای توزیع توکن و برنامه‌های واگذاری نوشتم و دیپلوی کردم",
        ],
      },
      {
        company: "فریلنسر",
        role: "توسعه‌دهنده بک‌اند",
        startDate: "بهمن ۱۴۰۱",
        endDate: "شهریور ۱۴۰۲",
        duration: "۶ ماه",
        highlights: [
          "ربات‌های تلگرام با NestJS و ORMهای مختلف (TypeORM، Prisma، Drizzle) ساختم",
          "معماری‌های بک‌اند مقیاس‌پذیر برای پروژه‌های متنوع مشتری‌ها طراحی کردم",
        ],
      },
      {
        company: "چادکو",
        role: "توسعه‌دهنده بک‌اند",
        startDate: "شهریور ۱۴۰۰",
        endDate: "بهمن ۱۴۰۱",
        duration: "۱.۵ سال",
        highlights: [
          "بک‌اند Node.js با بیش از ۲٬۰۰۰ کاربر فعال رو نگهداری و مقیاس کردم",
          "سیستم چت بلادرنگ برای ارتباط داخل پلتفرم پیاده‌سازی کردم",
          "اپلیکیشن دسکتاپ عملیاتی با Electron.js ساختم",
          "پردازش داده در مقیاس بالا رو مدیریت و عملکرد رو بهینه کردم",
        ],
      },
      {
        company: "جیهات",
        role: "توسعه‌دهنده فرانت‌اند (کارآموز)",
        startDate: "مرداد ۱۳۹۹",
        endDate: "شهریور ۱۴۰۰",
        duration: "۱ سال",
        highlights: [
          "وب‌سایت قدیمی رو با Material-UI بازنویسی کردم",
          "ساختار کد و تجربه کاربری رو بهبود دادم",
        ],
      },
    ],
    // Skills (unchanged)
    skills: {
      فرانت‌اند: [
        "React",
        "Next.js",
        "Three.js",
        "Svelte",
        "Material-UI",
        "Tailwind CSS",
      ],
      بک‌اند: [
        "Node.js",
        "NestJS",
        "Express",
        "REST APIs",
        "GraphQL",
        "WebSockets",
      ],
      دیتابیس: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "TypeORM",
        "Prisma",
        "Drizzle ORM",
      ],
      وب۳: [
        "Solidity",
        "Tact",
        "TRON",
        "TON",
        "Polygon",
        "Smart Contracts",
        "NFTs",
      ],
      ابزارها: ["Git", "Docker", "Electron.js", "Linux", "CI/CD"],
      "در حال یادگیری": ["Go"],
    },
    // Snake Game (unchanged)
    snakeGame: {
      sectionTitle: "یه استراحت کوچیک",
      hint: "کلیک کنید و با کلیدهای جهت‌دار بازی کنید",
      play: "شروع",
      score: "امتیاز",
      gameOver: "پایان بازی",
      difficulties: { easy: "آسان", normal: "متوسط", hard: "سخت" },
    },
    footer:
      "آماده همکاری در پروژه‌های فریلنس، قراردادی و تمام‌وقت — به‌خصوص وب۳، وب تعاملی و فول‌استک خلاقانه",
    switchLang: "EN",
  },

  en: {
    name: "Pooria Zoloorian",
    greeting: "Hi, I'm",
    title: "Full-Stack & Web3",
    titleParts: ["Full-Stack", "Web3", "3D Experiences"],
    location: "Shiraz, Iran",
    // Stats (unchanged)
    stats: {
      yearsFullStack: { value: "5+", label: "Years of Full Stack Experience" },
      yearsWeb3: { value: "3+", label: "Years of Web3 Experience" },
      chainsDeployed: { value: "3", label: "Active Blockchains" },
      projects: { value: "10+", label: "Production Projects" },
    },
    // Sections
    sections: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
    },
  aboutText:
  "Hi, I'm Pooria.\n\n" +
  "I'm a Full-Stack Developer with over five years of experience, primarily focused on Web3 projects. My work includes designing and building multi-chain payment systems, token launch platforms, NFT infrastructure, and interactive 3D web experiences.\n\n" +
  "I care about building products that combine strong technical foundations with thoughtful user experience. If you're working on a project or idea and think I could contribute, I'd be glad to hear more about it.",
    aboutFeatures: [
      {
        icon: "code",
        title: "Full-Stack",
        description:
          "End-to-end apps with React, Next.js, Node.js, NestJS — built to survive real production",
      },
      {
        icon: "blockchain",
        title: "Web3 & Blockchain",
        description:
          "Smart contracts & dApps on TRON, Polygon, TON — Solidity + Tact — minting, sales, multi-chain payments",
      },
      {
        icon: "cube",
        title: "Interactive 3D Web",
        description:
          "Interactive and immersive experiences built with Three.js and WebGL — including product explorers and advanced web interfaces",
      },
      {
        icon: "server",
        title: "Reliable Backends",
        description:
          "Systems that don't shake under real load and grow with changing needs",
      },
    ],
    // Timeline
    now: "Now",
    currentDate: "Feb 2026",
    started: "Started Aug 2020",
    // Experience (light polish for natural flow)
    experiences: [
      {
        company: "TAV Company",
        role: "Full Stack Developer",
        startDate: "Aug 2023",
        endDate: "Feb 2026",
        duration: "2.5 years",
        highlights: [
          "Built production 3D web platforms with Three.js — including interactive and immersive user experiences",
          "Created smart body-measurement-based search system that significantly improved clothing recommendations",
          "Developed full token launch platform on TON (private sale + minting + mining) using Tact",
          "Designed and launched multi-chain crypto payment gateway supporting 14+ blockchains",
          "Led relaunch of v2 multi-vendor NFT marketplace on Polygon with complex reward logic and smart contracts",
          "Wrote and deployed TRON smart contracts for token distribution and vesting",
        ],
      },
      {
        company: "Self-employed",
        role: "Backend Developer",
        startDate: "Feb 2023",
        endDate: "Aug 2023",
        duration: "6 months",
        highlights: [
          "Built Telegram bots using NestJS with TypeORM, Prisma and Drizzle",
          "Designed scalable backend architectures for various client projects",
        ],
      },
      {
        company: "Chadko",
        role: "Backend Developer",
        startDate: "Aug 2021",
        endDate: "Feb 2023",
        duration: "1.5 years",
        highlights: [
          "Maintained and scaled Node.js backend serving 2,000+ active users",
          "Implemented real-time chat system for in-platform communication",
          "Developed production desktop application using Electron.js",
          "Managed large-scale data processing and performance optimization",
        ],
      },
      {
        company: "Jihaat",
        role: "Frontend Developer (Intern)",
        startDate: "Aug 2020",
        endDate: "Aug 2021",
        duration: "1 year",
        highlights: [
          "Refactored legacy website using Material-UI",
          "Improved code structure and overall user experience",
        ],
      },
    ],
    // Skills (unchanged)
    skills: {
      Frontend: [
        "React",
        "Next.js",
        "Three.js",
        "Svelte",
        "Material-UI",
        "Tailwind CSS",
      ],
      Backend: [
        "Node.js",
        "NestJS",
        "Express",
        "REST APIs",
        "GraphQL",
        "WebSockets",
      ],
      Database: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "TypeORM",
        "Prisma",
        "Drizzle ORM",
      ],
      Web3: [
        "Solidity",
        "Tact",
        "TRON",
        "TON",
        "Polygon",
        "Smart Contracts",
        "NFTs",
      ],
      Tools: ["Git", "Docker", "Electron.js", "Linux", "CI/CD"],
      Learning: ["Go"],
    },
    // Snake Game (unchanged)
    snakeGame: {
      sectionTitle: "Take a Break",
      hint: "Click & use arrow keys to play",
      play: "Play",
      score: "Score",
      gameOver: "Game Over",
      difficulties: { easy: "Easy", normal: "Normal", hard: "Hard" },
    },
    footer:
      "Available for freelance, contract, and full-time collaborations — especially in Web3, interactive web, and creative full-stack projects",
    switchLang: "فا",
  },
} as const;

export type Translations = typeof translations.fa;
