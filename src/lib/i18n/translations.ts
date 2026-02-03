export type Language = "fa" | "en";

export const translations = {
  fa: {
    name: "پوریا ذوالوریان",
    title: "توسعه‌دهنده فول‌استک",
    titleParts: ["توسعه‌دهنده فول‌استک", "وب۳", "اپلیکیشن دسکتاپ"],
    location: "شیراز، ایران",

    // Stats
    stats: {
      yearsFullStack: { value: "+۵", label: "سال فول‌استک" },
      yearsWeb3: { value: "+۳", label: "سال وب۳" },
      chainsDeployed: { value: "۳", label: "بلاکچین" },
      projects: { value: "+۱۰", label: "پروژه" },
    },

    // Sections
    sections: {
      about: "درباره من",
      experience: "سوابق کاری",
      skills: "مهارت‌ها",
    },

    aboutText:
      "توسعه‌دهنده فول‌استک جاوااسکریپت با بیش از ۵ سال تجربه در ساخت اپلیکیشن‌های وب مقیاس‌پذیر و بیش از ۳ سال تخصص در توسعه وب۳ روی بلاکچین‌های TRON، Polygon و TON. سابقه موفق در ارائه پلتفرم‌های پرترافیک، سیستم‌های بلادرنگ و اپلیکیشن‌های دسکتاپ تولیدی.",

    // Timeline
    now: "اکنون",
    currentDate: "بهمن ۱۴۰۴",
    started: "شروع از مرداد ۱۳۹۹",

    // Experience
    experiences: [
      {
        company: "شرکت تاو",
        role: "توسعه‌دهنده فول‌استک",
        startDate: "شهریور ۱۴۰۲",
        endDate: "بهمن ۱۴۰۴",
        duration: "۲.۵ سال",
        highlights: [
          "ساخت ۲ وب‌سایت سه‌بعدی تعاملی با Three.js - پلتفرم فروش بلیط سینما با انتخاب صندلی سه‌بعدی و فروشگاه لباس با اندازه‌گیری هوشمند و شوروم‌های سه‌بعدی",
          "پیاده‌سازی سیستم جستجوی هوشمند بر اساس اندازه‌های بدن کاربر برای پیشنهاد لباس شخصی‌سازی شده",
          "توسعه پلتفرم عرضه توکن با فروش خصوصی، مینتینگ و ماینینگ روی بلاکچین TON با استفاده از Tact",
          "ساخت درگاه پرداخت کریپتو با معماری چندزنجیره‌ای و پشتیبانی از بیش از ۱۴ بلاکچین",
          "راه‌اندازی مجدد نسخه ۲ فروشگاه چندفروشندگی NFT روی Polygon با محاسبات پیچیده پاداش و یکپارچه‌سازی قرارداد هوشمند",
          "پیاده‌سازی قراردادهای هوشمند روی TRON برای توزیع توکن و برنامه‌های واگذاری",
        ],
      },
      {
        company: "فریلنسر",
        role: "توسعه‌دهنده بک‌اند",
        startDate: "بهمن ۱۴۰۱",
        endDate: "شهریور ۱۴۰۲",
        duration: "۶ ماه",
        highlights: [
          "توسعه ربات‌های تلگرام با NestJS و TypeORM، Drizzle ORM و Prisma",
          "ساخت معماری‌های بک‌اند مقیاس‌پذیر برای پروژه‌های مختلف مشتریان",
        ],
      },
      {
        company: "چادکو",
        role: "توسعه‌دهنده بک‌اند",
        startDate: "شهریور ۱۴۰۰",
        endDate: "بهمن ۱۴۰۱",
        duration: "۱.۵ سال",
        highlights: [
          "نگهداری و مقیاس‌دهی بک‌اند Node.js با بیش از ۲،۰۰۰ کاربر فعال",
          "پیاده‌سازی سیستم چت بلادرنگ برای ارتباطات پلتفرم",
          "توسعه اپلیکیشن دسکتاپ تولیدی با Electron.js",
          "مدیریت پردازش داده در مقیاس بزرگ و بهینه‌سازی",
        ],
      },
      {
        company: "جیهات",
        role: "توسعه‌دهنده فرانت‌اند (کارآموز)",
        startDate: "مرداد ۱۳۹۹",
        endDate: "شهریور ۱۴۰۰",
        duration: "۱ سال",
        highlights: [
          "بازنویسی وب‌سایت قدیمی با Material-UI",
          "بهبود قابلیت نگهداری کد و تجربه کاربری",
        ],
      },
    ],

    // Skills
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

    // Snake Game
    snakeGame: {
      sectionTitle: "یه استراحت کوچیک",
      hint: "کلیک کنید و با کلیدهای جهت‌دار بازی کنید",
      score: "امتیاز",
      gameOver: "پایان بازی",
    },

    footer: "آماده همکاری در پروژه‌های فریلنس و قراردادی",
    switchLang: "EN",
  },
  en: {
    name: "Pooria Zoloorian",
    title: "Full Stack Developer",
    titleParts: ["Full Stack Developer", "Web3", "Desktop Apps"],
    location: "Shiraz, Iran",

    // Stats
    stats: {
      yearsFullStack: { value: "5+", label: "Years Full Stack" },
      yearsWeb3: { value: "3+", label: "Years Web3" },
      chainsDeployed: { value: "3", label: "Chains Deployed" },
      projects: { value: "10+", label: "Projects" },
    },

    // Sections
    sections: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
    },

    aboutText:
      "Full Stack JavaScript developer with 5+ years of experience building scalable web applications and 3+ years specializing in Web3 development across TRON, Polygon, and TON blockchains. Proven track record in delivering high-traffic platforms, real-time systems, and production desktop applications.",

    // Timeline
    now: "Now",
    currentDate: "Feb 2026",
    started: "Started Aug 2020",

    // Experience
    experiences: [
      {
        company: "TAV Company",
        role: "Full Stack Developer",
        startDate: "Aug 2023",
        endDate: "Feb 2026",
        duration: "2.5 years",
        highlights: [
          "Built 2 interactive 3D websites using Three.js - a cinema ticket platform with 3D seat selection and a clothing store with smart measurements and 3D showrooms",
          "Implemented smart search system based on user body measurements for personalized clothing recommendations",
          "Developed token launch platform with private sales, minting, and mining on TON blockchain using Tact",
          "Built crypto payment gateway with multi-chain architecture supporting 14+ blockchains",
          "Re-launched v2 of NFT multivendor marketplace on Polygon with complex reward calculations and smart contract integration",
          "Implemented smart contracts on TRON for token distribution and vesting schedules",
        ],
      },
      {
        company: "Self-employed",
        role: "Backend Developer",
        startDate: "Feb 2023",
        endDate: "Aug 2023",
        duration: "6 months",
        highlights: [
          "Developed Telegram bots using NestJS with TypeORM, Drizzle ORM, and Prisma",
          "Built scalable backend architectures for various client projects",
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
          "Implemented real-time chat system for platform communication",
          "Developed production desktop application using Electron.js",
          "Handled large-scale data processing and optimization",
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
          "Improved codebase maintainability and user experience",
        ],
      },
    ],

    // Skills
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

    // Snake Game
    snakeGame: {
      sectionTitle: "Take a Break",
      hint: "Click & use arrow keys to play",
      score: "Score",
      gameOver: "Game Over",
    },

    footer: "Available for freelance and contract work",
    switchLang: "فا",
  },
} as const;

export type Translations = typeof translations.fa;
