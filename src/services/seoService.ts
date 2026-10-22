import { Language, NavView, Project } from '../types';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'product';
  lang?: Language;
  locale?: string;
  author?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface RouteSeoConfig {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  keywords?: {
    en: string;
    ar: string;
  };
  type?: 'website' | 'article' | 'profile';
  robots?: string;
}

/**
 * Route-specific SEO configuration mapping for all views in the SHAHEEN GROUP platform.
 * Titles conform to standard SEO practice (30-60 characters, brand-aligned).
 * Descriptions conform to 120-160 characters with clear value propositions and CTAs.
 */
export const ROUTE_SEO_CONFIGS: Record<NavView, RouteSeoConfig> = {
  home: {
    title: {
      en: 'SHAHEEN GROUP — Beyond Innovation. Beyond Limits.',
      ar: 'مجموعة شاهين — ما بعد الابتكار. ما وراء الحدود',
    },
    description: {
      en: "We don't just build projects — we command the digital future. Sovereign engineering, autonomous AI, and cinematic web architecture in Amman, Jordan.",
      ar: 'نحن لا نبني المشاريع فحسب — بل نقود المستقبل الرقمي. تكتل هندسي وتقني متقدم للأنظمة الذاتية والمعمارية السينمائية من عمّان، الأردن.',
    },
    keywords: {
      en: 'SHAHEEN GROUP, Yousef Shaheen, digital architecture, autonomous systems, cinematic web, Jordan tech, Amman, elite engineering',
      ar: 'مجموعة شاهين, يوسف شاهين, معمارية رقمية, أنظمة ذكية, تصميم سينمائي, تقنية الأردن, عمان, هندسة برمجية متقدمة',
    },
    type: 'website',
  },
  projects: {
    title: {
      en: 'Flagship Projects & Architecture — SHAHEEN GROUP',
      ar: 'المشاريع القيادية والمعمارية الرقمية — مجموعة شاهين',
    },
    description: {
      en: 'Explore mission-critical deployments across autonomous AI, sovereign fintech, aerospace telemetry, and high-performance computing clusters.',
      ar: 'استكشف النظم المعمارية المتقدمة ومحركات الذكاء الاصطناعي والتداول الخوارزمي وهندسة التيليمترية الفضائية التابعة لمجموعة شاهين.',
    },
    keywords: {
      en: 'flagship projects, autonomous AI, sovereign fintech, aerospace telemetry, enterprise architecture, case studies',
      ar: 'مشاريع قيادية, ذكاء اصطناعي, أنظمة مالية سيادية, تيليمترية الفضاء, معمارية مؤسسية, دراسات حالة',
    },
    type: 'website',
  },
  'project-detail': {
    title: {
      en: 'Architectural Case Study — SHAHEEN GROUP',
      ar: 'دراسة حالة معمارية متقدمة — مجموعة شاهين',
    },
    description: {
      en: 'Detailed architectural review, stack benchmarks, performance indicators, and execution paradigms of Shaheen Group flagship initiatives.',
      ar: 'مراجعة معمارية تفصيلية ومعايير أداء الأنظمة ومؤشرات الأثر التقني لمبادرات ومشاريع مجموعة شاهين القيادية.',
    },
    type: 'article',
  },
  services: {
    title: {
      en: 'Sovereign Disciplines & Capabilities — SHAHEEN GROUP',
      ar: 'القدرات الهندسية والأنظمة الحوسبية — مجموعة شاهين',
    },
    description: {
      en: 'Elite autonomous systems engineering, cinematic web experiences, resilient distributed architectures, and algorithmic research services.',
      ar: 'هندسة النظم الذاتية المتقدمة، التجارب السينمائية للويب، البنى الموزعة المقاومة للأعطال، والبحوث الخوارزمية المتخصصة.',
    },
    type: 'website',
  },
  tools: {
    title: {
      en: 'Sovereign CLI & Developer Tooling — SHAHEEN GROUP',
      ar: 'أدوات المنظومة البرمجية وسطر الأوامر — مجموعة شاهين',
    },
    description: {
      en: 'Proprietary command-line orchestrators, telemetry stream monitors, and cryptographic vault tooling developed by SHAHEEN GROUP.',
      ar: 'أدوات سطر الأوامر ومحركات المراقبة اللحظية للبيانات والخزائن المشفرة المصممة خصيصاً لمهندسي مجموعة شاهين.',
    },
    type: 'website',
  },
  extensions: {
    title: {
      en: 'Extensions & Architectural Plugins — SHAHEEN GROUP',
      ar: 'الإضافات والتكاملات البرمجية — مجموعة شاهين',
    },
    description: {
      en: 'Curated developer extensions, IDE themes, GSAP motion adapters, and distributed database connectors expanding our sovereign ecosystem.',
      ar: 'إضافات بيئات التطوير المعتمدة وثيمات المحررات ومحولات الحركة التفاعلية وموصلات قواعد البيانات الموزعة لمنظومة شاهين.',
    },
    type: 'website',
  },
  developer: {
    title: {
      en: 'Mastermind Developer Identity — Yousef@Shaheen:~#',
      ar: 'هوية المطور والعقل المدبر — Yousef@Shaheen:~#',
    },
    description: {
      en: 'Verified terminal identity, architectural tenets, and direct command communication protocols of Yousef A. Shaheen from Amman, Jordan.',
      ar: 'الهوية الطرفية المعتمدة والمبادئ المعمارية وبروتوكولات التواصل المباشر للمؤسس والعقل المدبر يوسف أ. شاهين من عمّان، الأردن.',
    },
    type: 'profile',
  },
  about: {
    title: {
      en: 'About SHAHEEN GROUP — Executive Manifesto & Vision',
      ar: 'عن مجموعة شاهين — البيان القيادي والرؤية المستقبلية',
    },
    description: {
      en: 'Discover the foundational philosophy, sovereign engineering principles, and strategic vision of SHAHEEN GROUP commanding the digital frontier.',
      ar: 'تعرف على الفلسفة التأسيسية والمبادئ الهندسية السيادية والرؤية الاستراتيجية لمجموعة شاهين في قيادة الحدود الرقمية.',
    },
    type: 'website',
  },
  journal: {
    title: {
      en: 'The Shaheen Journal — Sovereign Systems & Design',
      ar: 'مجلة شاهين الفكرية — النظم المعمارية والتصميم الفاخر',
    },
    description: {
      en: 'Critical engineering essays, distributed systems research, and high-performance cinematic UI paradigms authored by Yousef A. Shaheen.',
      ar: 'أوراق بحثية نقدية ومقالات في النظم الموزعة ونظريات التصميم السينمائي فائق الأداء بقلم المهندس يوسف أ. شاهين.',
    },
    type: 'website',
  },
  social: {
    title: {
      en: 'Official Social Communications Hub — SHAHEEN GROUP',
      ar: 'مركز شبكات التواصل والاتصال الرقمي — مجموعة شاهين',
    },
    description: {
      en: 'Direct access to verified Shaheen Group broadcast channels, GitHub repositories, LinkedIn network, and official developer handles.',
      ar: 'الوصول المباشر إلى قنوات البث الرسمية ومستودعات غيت هب وشبكة لينكد إن والمنصات المعتمدة لمجموعة شاهين ومؤسسها.',
    },
    type: 'website',
  },
  contact: {
    title: {
      en: 'Initiate Strategic Partnership — SHAHEEN GROUP',
      ar: 'تواصل مع الإدارة — مكتب العقل المدبر لمجموعة شاهين',
    },
    description: {
      en: 'Direct correspondence channel with the Mastermind Office of SHAHEEN GROUP in Amman, Jordan for enterprise architecture engagements.',
      ar: 'قناة المراسلة المباشرة مع مكتب العقل المدبر لمجموعة شاهين في عمّان، الأردن للاستشارات المعمارية والصفقات المؤسسية الكبرى.',
    },
    type: 'website',
  },
  android: {
    title: {
      en: 'Native Android APK & Mobile Suite — SHAHEEN GROUP',
      ar: 'تطبيق الأندرويد الأصلي وحزمة APK — مجموعة شاهين',
    },
    description: {
      en: 'Download the production SHAHEEN GROUP Android APK (v1.4.2) featuring hardware-accelerated animations, offline vault, and biometric security.',
      ar: 'تحميل حزمة APK الرسمية لتطبيق مجموعة شاهين (v1.4.2) مع دعم تسريع الرسوميات عتادياً والخزينة دون اتصال والتشفير البيومتري.',
    },
    type: 'website',
  },
  admin: {
    title: {
      en: 'Mastermind CMS Console — SHAHEEN GROUP [Protected]',
      ar: 'بوابة إدارة المحتوى والنشر — مجموعة شاهين [محمية]',
    },
    description: {
      en: 'Restricted administrative content management, real-time telemetry, and deployment orchestrator for SHAHEEN GROUP platforms.',
      ar: 'لوحة التحكم الإدارية وإدارة المحتوى والتحليلات اللحظية ونشر التحديثات لمنصات مجموعة شاهين الرقمية.',
    },
    robots: 'noindex, nofollow',
    type: 'website',
  },
  parity: {
    title: {
      en: 'Benchmark Parity Audit Matrix — SHAHEEN GROUP',
      ar: 'مصفوفة مطابقة الميزات المعيارية — مجموعة شاهين',
    },
    description: {
      en: 'Transparent technical verification audit comparing SHAHEEN GROUP against reference benchmarks across UI, performance, and features.',
      ar: 'تدقيق التحقق المعماري الميداني لمطابقة ميزات مجموعة شاهين مع المعايير القياسية العالمية من حيث الأداء والتصميم.',
    },
    type: 'website',
  },
};

/**
 * Pure DOM Helper: set or create a <meta> element with the target attribute
 */
function setMetaTag(selector: string, attrName: string, attrValue: string, content: string): void {
  if (typeof document === 'undefined') return;
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Pure DOM Helper: set or create a <link> element
 */
function setLinkTag(rel: string, href: string): void {
  if (typeof document === 'undefined') return;
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Constructs absolute canonical URL based on window environment or fallback origin
 */
export function getCanonicalUrl(view: NavView = 'home', projectSlug?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://shaheen-group.com';
  if (projectSlug) {
    return `${origin}/#project-${projectSlug}`;
  }
  if (view === 'home') {
    return `${origin}/`;
  }
  return `${origin}/#${view}`;
}

/**
 * Resolves an asset URL (image, logo, icon) to an absolute URL
 */
export function resolveAssetUrl(assetPath?: string, fallback = import.meta.env.BASE_URL + 'assets/brand/shaheen-icon.png'): string {
  const target = assetPath || fallback;
  if (/^https?:\/\//i.test(target)) {
    return target;
  }

  const origin = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://shaheen-group.com';

  const base = import.meta.env.BASE_URL || '/';
  const relativePath = target.startsWith(base)
    ? target.slice(base.length)
    : target.replace(/^\/+/, '');
  const cleanPath = relativePath.replace(/^\/+/, '');

  return new URL(base + cleanPath, origin).toString();
}

/**
 * Generates SEO metadata specifically tailored for a selected Project
 */
export function generateProjectSeo(project: Project, lang: Language): SeoMetadata {
  const isAr = lang === 'ar';
  
  // Custom SEO title/desc if provided in CMS, otherwise standard high-authority format
  const title = project.seoTitle?.[lang] || 
    (isAr
      ? `${project.title.ar} — دراسة حالة قيادية | مجموعة شاهين`
      : `${project.title.en} — Flagship Case Study | SHAHEEN GROUP`);

  const description = project.seoDescription?.[lang] || 
    project.summary[lang] || 
    (isAr ? 'دراسة معمارية متقدمة من مجموعة شاهين.' : 'High-stakes architectural case study from SHAHEEN GROUP.');

  const canonicalUrl = getCanonicalUrl('project-detail', project.slug);
  const imageUrl = resolveAssetUrl(project.image || project.gallery?.[0]);
  const keywords = [
    project.title[lang],
    project.category,
    'SHAHEEN GROUP',
    ...(project.technologies || []),
  ].join(', ');

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': project.title[lang],
    'headline': title,
    'description': description,
    'applicationCategory': project.category,
    'operatingSystem': 'Cloud, Web, Mobile, High-Concurrency Clusters',
    'url': canonicalUrl,
    'image': imageUrl,
    'datePublished': project.publicationDate || `${project.year || 2025}-01-01`,
    'author': {
      '@type': 'Person',
      'name': 'Yousef A. Shaheen',
      'jobTitle': 'Founder & Lead Architect',
      'nationality': 'Jordanian',
    },
    'creator': {
      '@type': 'Organization',
      'name': 'SHAHEEN GROUP',
      'url': typeof window !== 'undefined' ? window.location.origin : 'https://shaheen-group.com',
      'logo': resolveAssetUrl('assets/brand/shaheen-icon.png'),
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Amman',
        'addressCountry': 'Jordan',
      },
    },
    'keywords': keywords,
    'inLanguage': isAr ? 'ar' : 'en',
  };

  return {
    title,
    description,
    keywords,
    image: imageUrl,
    url: canonicalUrl,
    type: 'article',
    lang,
    locale: isAr ? 'ar_JO' : 'en_US',
    author: 'Yousef A. Shaheen',
    publishedTime: project.publicationDate || `${project.year || 2025}-01-01`,
    robots: 'index, follow',
    jsonLd,
  };
}

/**
 * Generates SEO metadata for any registered view route
 */
export function generateRouteSeo(route: NavView, lang: Language): SeoMetadata {
  const isAr = lang === 'ar';
  const config = ROUTE_SEO_CONFIGS[route] || ROUTE_SEO_CONFIGS.home;
  const canonicalUrl = getCanonicalUrl(route);
  const imageUrl = resolveAssetUrl('assets/brand/shaheen-icon.png');
  const title = config.title[lang];
  const description = config.description[lang];
  const keywords = config.keywords?.[lang] || 'SHAHEEN GROUP, Yousef Shaheen, Amman, Jordan, Software Architecture';

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': route === 'developer' ? 'ProfilePage' : (route === 'home' ? 'WebSite' : 'WebPage'),
    'name': title,
    'description': description,
    'url': canonicalUrl,
    'inLanguage': isAr ? 'ar' : 'en',
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'SHAHEEN GROUP',
      'url': typeof window !== 'undefined' ? window.location.origin : 'https://shaheen-group.com',
      'slogan': isAr ? 'ما بعد الابتكار. ما وراء الحدود.' : 'Beyond Innovation. Beyond Limits.',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SHAHEEN GROUP',
      'url': typeof window !== 'undefined' ? window.location.origin : 'https://shaheen-group.com',
      'logo': imageUrl,
      'founder': {
        '@type': 'Person',
        'name': 'Yousef A. Shaheen',
        'jobTitle': 'Founder & System Mastermind',
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Amman',
        'addressCountry': 'Jordan',
      },
    },
  };

  return {
    title,
    description,
    keywords,
    image: imageUrl,
    url: canonicalUrl,
    type: config.type || 'website',
    lang,
    locale: isAr ? 'ar_JO' : 'en_US',
    author: 'Yousef A. Shaheen',
    robots: config.robots || 'index, follow',
    jsonLd,
  };
}

/**
 * Injects or updates Schema.org JSON-LD structured data script
 */
export function injectJsonLd(schema: Record<string, unknown> | Array<Record<string, unknown>>): void {
  if (typeof document === 'undefined') return;
  let script = document.getElementById('shaheen-ld-json') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'shaheen-ld-json';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

/**
 * Cleans Schema.org JSON-LD structured script if needed
 */
export function cleanJsonLd(): void {
  if (typeof document === 'undefined') return;
  const script = document.getElementById('shaheen-ld-json');
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

/**
 * Core DOM mutator: synchronously updates document.title, meta descriptions,
 * OpenGraph, Twitter Cards, canonical links, robots, and JSON-LD
 */
export function updateDocumentSeo(metadata: SeoMetadata): void {
  if (typeof document === 'undefined') return;

  const currentUrl = metadata.url || (typeof window !== 'undefined' ? window.location.href : 'https://shaheen-group.com');
  const resolvedImage = resolveAssetUrl(metadata.image);
  const lang = metadata.lang || 'en';
  const locale = metadata.locale || (lang === 'ar' ? 'ar_JO' : 'en_US');

  // 1. Synchronize HTML element lang & dir
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // 2. Document Title
  document.title = metadata.title;

  // 3. Primary Meta Tags
  setMetaTag('meta[name="description"]', 'name', 'description', metadata.description);
  if (metadata.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metadata.keywords);
  }
  setMetaTag('meta[name="author"]', 'name', 'author', metadata.author || 'Yousef A. Shaheen | SHAHEEN GROUP');
  setMetaTag('meta[name="robots"]', 'name', 'robots', metadata.robots || 'index, follow');

  // 4. OpenGraph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', resolvedImage);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', metadata.type || 'website');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'SHAHEEN GROUP');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', locale);

  // 5. Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedImage);
  setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@ShaheenGroup');
  setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@ShaheenGroup');

  // 6. Canonical Link
  setLinkTag('canonical', currentUrl);

  // 7. Schema.org JSON-LD
  if (metadata.jsonLd) {
    injectJsonLd(metadata.jsonLd);
  }
}

/**
 * High-level orchestration method to update SEO based on view or project
 */
export function updateForView(
  view: NavView,
  lang: Language = 'en',
  project?: Project | null
): SeoMetadata {
  const metadata = project
    ? generateProjectSeo(project, lang)
    : generateRouteSeo(view, lang);

  updateDocumentSeo(metadata);
  return metadata;
}

/**
 * Returns current computed metadata without necessarily applying it to DOM
 */
export function getMetadataForView(
  view: NavView,
  lang: Language = 'en',
  project?: Project | null
): SeoMetadata {
  return project ? generateProjectSeo(project, lang) : generateRouteSeo(view, lang);
}

/**
 * SEO Service Singleton Export
 */
export const seoService = {
  updateDocumentSeo,
  generateProjectSeo,
  generateRouteSeo,
  updateForView,
  getMetadataForView,
  injectJsonLd,
  cleanJsonLd,
  getCanonicalUrl,
  resolveAssetUrl,
  ROUTE_SEO_CONFIGS,
};

export default seoService;
