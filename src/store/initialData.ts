import { Project, Service, JournalArticle, MetricItem, SiteSettings, ToolItem, ExtensionItem, SocialProfile, DeveloperProfile } from '../types';

export const initialSocialProfiles: SocialProfile[] = [
  {
    id: 'soc-x',
    platform: 'X',
    label: 'X (Twitter)',
    url: 'https://x.com/You_sh94',
    icon: 'Twitter',
    enabled: true,
    displayOrder: 1,
  },
  {
    id: 'soc-linkedin',
    platform: 'LinkedIn',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/yousef-z-445aba414?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    icon: 'Linkedin',
    enabled: true,
    displayOrder: 2,
  },
  {
    id: 'soc-telegram',
    platform: 'Telegram',
    label: 'Telegram',
    url: 'https://t.me/B0SS_S1',
    icon: 'Send',
    enabled: true,
    displayOrder: 3,
  },
  {
    id: 'soc-whatsapp',
    platform: 'WhatsApp',
    label: 'WhatsApp Direct',
    url: 'https://wa.link/lc6f5w',
    icon: 'MessageCircle',
    enabled: true,
    displayOrder: 4,
  },
  {
    id: 'soc-instagram',
    platform: 'Instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/55.0?cplk=cGNucHY5bzlxYzl0',
    icon: 'Instagram',
    enabled: true,
    displayOrder: 5,
  },
  {
    id: 'soc-tiktok',
    platform: 'TikTok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@zix8ii?_r=1&_d=f3c01a6371bii9&sec_uid=',
    icon: 'Film',
    enabled: true,
    displayOrder: 6,
  },
  {
    id: 'soc-facebook',
    platform: 'Facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/share/19u4QUKFTL/',
    icon: 'Facebook',
    enabled: true,
    displayOrder: 7,
  },
  {
    id: 'soc-snapchat',
    platform: 'Snapchat',
    label: 'Snapchat',
    url: 'https://www.snapchat.com/add/fi1_oo?share_id=ez2rePla17Q&locale=ar-JO',
    icon: 'Camera',
    enabled: true,
    displayOrder: 8,
  },
  {
    id: 'soc-threads',
    platform: 'Threads',
    label: 'Threads',
    url: 'https://www.threads.com/@1.0_v_?invite=0',
    icon: 'AtSign',
    enabled: true,
    displayOrder: 9,
  },
  {
    id: 'soc-discord',
    platform: 'Discord',
    label: 'Discord Community',
    url: 'https://discord.gg/kgwKFPTmZE',
    icon: 'Hash',
    enabled: true,
    displayOrder: 10,
  },
  {
    id: 'soc-youtube',
    platform: 'YouTube',
    label: 'YouTube Channel',
    url: 'https://youtube.com/@shaheenos?si=zhAQOa0MO2K6jKiS',
    icon: 'Youtube',
    enabled: true,
    displayOrder: 11,
  },
  {
    id: 'soc-gmail',
    platform: 'Gmail',
    label: 'Direct Gmail',
    url: 'mailto:shaheen.group000@gmail.com',
    icon: 'Mail',
    enabled: true,
    displayOrder: 12,
  },
  {
    id: 'soc-yahoo',
    platform: 'Yahoo',
    label: 'Direct Yahoo',
    url: 'mailto:shaheen.group000@yahoo.com',
    icon: 'Mail',
    enabled: true,
    displayOrder: 13,
  },
];

export const initialDeveloperProfile: DeveloperProfile = {
  displayName: 'Yousef A. Shaheen',
  identityStatement: {
    en: 'Mastermind of SHAHEEN GROUP.',
    ar: 'العقل المدبر لمجموعة شاهين.',
  },
  slogan: {
    en: "We don't just build projects — we command the digital future.",
    ar: 'نحن لا نبني المشاريع فحسب — بل نقود المستقبل الرقمي.',
  },
  introduction: {
    en: 'Visionary engineer and architect commanding sovereign digital flagships, autonomous agent infrastructures, and high-performance computational systems from Amman, Jordan.',
    ar: 'مهندس ومعمار برمجيات يقود المنصات الرقمية الكبرى، أنظمة الذكاء الاصطناعي الذاتية، ومحركات المعالجة فائقة السرعة انطلاقاً من عمّان، الأردن.',
  },
  location: {
    en: 'From: Jordan - Amman',
    ar: 'من: الأردن - عمّان',
  },
  terminalPrompt: 'Yousef@Shaheen:~#',
  image: '/assets/developer/yousef-shaheen.jpg',
  emailAddresses: [
    { label: 'Official Gmail', email: 'shaheen.group000@gmail.com', url: 'mailto:shaheen.group000@gmail.com' },
    { label: 'Official Yahoo', email: 'shaheen.group000@yahoo.com', url: 'mailto:shaheen.group000@yahoo.com' },
    { label: 'Direct Mastermind Desk', email: 'yousef@shaheen-group.com', url: 'mailto:yousef@shaheen-group.com' },
  ],
  socialProfileIds: [
    'soc-x',
    'soc-linkedin',
    'soc-telegram',
    'soc-whatsapp',
    'soc-instagram',
    'soc-discord',
    'soc-youtube',
  ],
};

export const initialTools: ToolItem[] = [
  {
    id: 'tool-core-cli',
    name: 'Shaheen Core CLI',
    slug: 'shaheen-core-cli',
    description: {
      en: 'A sovereign terminal orchestration utility for automated multi-cloud deployment, secret synchronization, and binary telemetry validation.',
      ar: 'أداة سطر أوامر سيادية لإدارة النشر السحابي التلقائي، مزامنة المفاتيح المشفرة، والتحقق الثنائي من القياسات اللحظية.',
    },
    icon: 'Terminal',
    category: 'DevOps & Orchestration',
    version: '2.4.0',
    docsUrl: 'https://docs.shaheen-group.com/cli',
    websiteUrl: 'https://shaheen-group.com/tools/cli',
    repoUrl: 'https://github.com/shaheen-group/core-cli',
    compatibility: ['Linux', 'macOS', 'Windows (WSL2)'],
    installationInstructions: {
      en: 'curl -fsSL https://get.shaheen-group.com/cli | bash',
      ar: 'curl -fsSL https://get.shaheen-group.com/cli | bash',
    },
    tags: ['CLI', 'Terminal', 'Cloud Deploy', 'Telemetry'],
    status: 'stable',
    published: true,
  },
  {
    id: 'tool-aero-telemetry',
    name: 'AeroTelemetry Stream Engine',
    slug: 'aerotelemetry-engine',
    description: {
      en: 'High-frequency binary WebSocket streaming engine engineered for aerospace avionics and financial order books.',
      ar: 'محرك بث ثنائي فائق التردد عبر WebSocket مصمم لأنظمة الملاحة الجوية ودفاتر أوامر الأسواق المالية.',
    },
    icon: 'Radio',
    category: 'High-Concurrency',
    version: '1.8.2',
    docsUrl: 'https://docs.shaheen-group.com/aerotelemetry',
    repoUrl: 'https://github.com/shaheen-group/aerotelemetry',
    compatibility: ['Node.js >= 20', 'Rust', 'Python 3.11+'],
    installationInstructions: {
      en: 'npm install @shaheen/aerotelemetry-engine',
      ar: 'npm install @shaheen/aerotelemetry-engine',
    },
    tags: ['WebSocket', 'Protobuf', 'Sub-millisecond', 'Streaming'],
    status: 'stable',
    published: true,
  },
  {
    id: 'tool-vault-mesh',
    name: 'Sovereign Mesh Vault',
    slug: 'sovereign-mesh-vault',
    description: {
      en: 'Zero-knowledge encrypted enclave for storing enterprise secrets and API tokens across distributed node clusters.',
      ar: 'خزينة مشفرة بمعيار المعرفة الصفرية لتخزين أسرار المؤسسات ومفاتيح الواجهات البرمجية عبر العقد الموزعة.',
    },
    icon: 'Shield',
    category: 'Security & Enclave',
    version: '3.1.0',
    docsUrl: 'https://docs.shaheen-group.com/vault',
    downloadUrl: 'https://shaheen-group.com/downloads/vault-mesh-v3.1.0.tar.gz',
    compatibility: ['Docker', 'Kubernetes', 'Bare Metal Linux'],
    installationInstructions: {
      en: 'docker pull shaheen/vault-mesh:latest && docker run -d -p 8443:8443 shaheen/vault-mesh',
      ar: 'docker pull shaheen/vault-mesh:latest && docker run -d -p 8443:8443 shaheen/vault-mesh',
    },
    tags: ['Security', 'Zero-Trust', 'Encryption', 'Enclave'],
    status: 'stable',
    published: true,
  },
];

export const initialExtensions: ExtensionItem[] = [
  {
    id: 'ext-vscode-theme',
    name: 'Shaheen Cinematic Obsidian Theme',
    slug: 'shaheen-obsidian-theme',
    description: {
      en: 'An editorial visual theme for VS Code featuring deep charcoal tones, warm metallic gold syntax accents, and italicized typography.',
      ar: 'سمة بصرية سينمائية لمحرر VS Code بألوان الفحم الداكن والذهب المعدني مع تمييز طباعي متقدم للأكواد.',
    },
    icon: 'Code2',
    category: 'Developer Experience',
    compatibility: ['Visual Studio Code', 'VSCodium', 'Cursor'],
    version: '1.4.0',
    docsUrl: 'https://marketplace.visualstudio.com/items?itemName=shaheengroup.cinematic-theme',
    repoUrl: 'https://github.com/shaheen-group/vscode-cinematic-theme',
    installationInstructions: {
      en: 'ext install shaheengroup.cinematic-theme',
      ar: 'ext install shaheengroup.cinematic-theme',
    },
    configInstructions: {
      en: 'Set "workbench.colorTheme": "Shaheen Obsidian Gold" in your settings.json',
      ar: 'ضع "workbench.colorTheme": "Shaheen Obsidian Gold" في ملف settings.json الخاص بك',
    },
    relatedTools: ['tool-core-cli'],
    status: 'active',
    published: true,
  },
  {
    id: 'ext-lenis-camera',
    name: 'Lenis Cinematic Camera Controller',
    slug: 'lenis-cinematic-camera',
    description: {
      en: 'A lightweight GSAP & Lenis camera transition plugin coordinating inertia scroll, viewport tracking, and 3D parallax depth.',
      ar: 'إضافة خفيفة لتنسيق حركة الكاميرا والقصور الذاتي مع GSAP و Lenis لتقديم عمق ثلاثي الأبعاد فائق الانسيابية.',
    },
    icon: 'Layers',
    category: 'Motion Engineering',
    compatibility: ['React', 'Next.js', 'Vite', 'Vue 3'],
    version: '2.0.1',
    repoUrl: 'https://github.com/shaheen-group/lenis-cinematic-camera',
    installationInstructions: {
      en: 'npm install @shaheen/lenis-cinematic-camera',
      ar: 'npm install @shaheen/lenis-cinematic-camera',
    },
    configInstructions: {
      en: 'import { createCinematicCamera } from "@shaheen/lenis-cinematic-camera"; const cam = createCinematicCamera({ dampening: 0.12 });',
      ar: 'import { createCinematicCamera } from "@shaheen/lenis-cinematic-camera"; const cam = createCinematicCamera({ dampening: 0.12 });',
    },
    relatedTools: ['tool-aero-telemetry'],
    status: 'active',
    published: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: {
      en: 'Autonomous Neural Command Center',
      ar: 'مركز القيادة العصبي الذاتي',
    },
    slug: 'autonomous-neural-command',
    category: 'ai',
    client: 'Global Intelligence Consortium',
    year: '2026',
    summary: {
      en: 'A distributed neural orchestration platform delivering real-time agent coordination across global node clusters.',
      ar: 'منصة تنسيق عصبية موزعة توفر تنسيقاً لحظياً لوكلاء الذكاء الاصطناعي عبر عقد المعالجة العالمية.',
    },
    challenge: {
      en: 'Coordinating thousands of autonomous AI sub-agents with sub-20ms synchronization while visualizing dynamic topological network shifts in real-time.',
      ar: 'تنسيق آلاف الوكلاء الأذكياء بزمن مزامنة يقل عن 20 مللي ثانية مع نمذجة حية لتحولات الشبكة في الوقت الفعلي.',
    },
    solution: {
      en: 'Engineered an asynchronous consensus pipeline utilizing memory-mapped vector caches, WebSockets with binary framing, and a custom GPU-accelerated canvas topology visualizer.',
      ar: 'تصميم مسار توافق غير متزامن يعتمد على ذاكرات الفيكتور المباشرة، بروتوكول ويب سوكيت ذو ترميز ثنائي، ومحرك رسومي مسرع بعتاد الرسوميات.',
    },
    technologies: ['TypeScript', 'Node.js Cluster', 'WebGL Shaders', 'Redis Streams', 'Python Orchestrator'],
    metrics: [
      { label: { en: 'Throughput', ar: 'معدل المعالجة' }, value: '185k req/s' },
      { label: { en: 'Latency', ar: 'زمن الاستجابة' }, value: '8.4ms' },
      { label: { en: 'Cluster Nodes', ar: 'العقد المتزامنة' }, value: '1,240' },
    ],
    image: '/assets/projects/project-autonomous.jpg',
    featured: true,
    published: true,
    projectUrl: 'https://shaheen-group.com/case-studies/neural-command',
    repoUrl: 'https://github.com/shaheen-group/neural-command',
    demoUrl: 'https://shaheen-group.com/demo/neural-command',
    docsUrl: 'https://docs.shaheen-group.com/projects/neural-command',
    status: 'active',
  },
  {
    id: 'proj-2',
    title: {
      en: 'Algorithmic Sovereign Trading Terminal',
      ar: 'محطة التداول الخوارزمي السيادية',
    },
    slug: 'algorithmic-sovereign-trading',
    category: 'fintech',
    client: 'Sovereign Capital Reserve',
    year: '2025',
    summary: {
      en: 'High-frequency institutional trading dashboard with sub-millisecond execution telemetry and real-time liquidity heatmaps.',
      ar: 'لوحة تداول مؤسسية فائقة التردد مع قياسات تنفيذ دون المللي ثانية وخرائط حرارية للسيولة اللحظية.',
    },
    challenge: {
      en: 'Managing zero-loss order routing during volatile multi-exchange events without UI thread blocking or layout jank.',
      ar: 'إدارة توجيه الصفقات بدون أي فقد أثناء تقلبات الأسواق دون تجميد واجهة المستخدم أو هبوط معدل الإطارات.',
    },
    solution: {
      en: 'Built off-thread web worker data ingest pipes with delta compression and virtualized tabular grids rendered via Canvas 2D.',
      ar: 'بناء قنوات استيعاب بيانات مستقلة عبر خيوط المعالجة الخلفية وضغط الفروقات مع جداول بيانات افتراضية عالية الأداء.',
    },
    technologies: ['React 19', 'Web Workers', 'ZeroMQ', 'Tailwind CSS', 'WebAudio Haptics'],
    metrics: [
      { label: { en: 'Daily Volume', ar: 'حجم التداول اليومي' }, value: '$420M+' },
      { label: { en: 'Tick Refresh', ar: 'معدل تحديث الأسعار' }, value: '120 FPS' },
      { label: { en: 'Slippage Reduction', ar: 'تقليص الانزلاق' }, value: '-38%' },
    ],
    image: '/assets/projects/project-finance.jpg',
    featured: true,
    published: true,
    projectUrl: 'https://shaheen-group.com/case-studies/trading-terminal',
    repoUrl: 'https://github.com/shaheen-group/trading-terminal',
    demoUrl: 'https://shaheen-group.com/demo/trading-terminal',
    status: 'active',
  },
  {
    id: 'proj-3',
    title: {
      en: 'Orbital Telemetry & Avionics Interface',
      ar: 'واجهة القياسات والتحكم المداري الفضائي',
    },
    slug: 'orbital-telemetry-avionics',
    category: 'aerospace',
    client: 'Aerospace Systems Initiative',
    year: '2026',
    summary: {
      en: 'Mission-critical telemetry dashboard tracking orbital trajectory vectors, thruster thermals, and fail-safe autonomy.',
      ar: 'لوحة قياسات للمهام الفضائية الحرجة تتبع مسارات المدار الحرجة، حرارة المحركات، وأنظمة الأمان الذاتية.',
    },
    challenge: {
      en: 'Presenting dense multi-spectral avionics data with total clarity under high-pressure operator scenarios.',
      ar: 'عرض بيانات أجهزة الطيران متعددة الأطياف بأقصى درجات الوضوح البصري للطيارين والمشغلين في الظروف الحرجة.',
    },
    solution: {
      en: 'Implemented high-contrast night-vision dark modes, mathematical vector projection algorithms, and tactile audio confirmation cues.',
      ar: 'تنفيذ أنماط ليلية عالية التباين، وخوارزميات إسقاط متجهية رياضية دقيقة مع تأكيدات صوتية تكتيكية مخصصة.',
    },
    technologies: ['GSAP 3', 'SVG Projections', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
    metrics: [
      { label: { en: 'Reliability', ar: 'معدل الموثوقية' }, value: '99.9999%' },
      { label: { en: 'Data Points/Sec', ar: 'نقطة بيانات/ثانية' }, value: '2.4M' },
      { label: { en: 'Operator Response', ar: 'زمن استجابة المشغل' }, value: '<0.4s' },
    ],
    image: '/assets/projects/project-aerospace.jpg',
    featured: true,
    published: true,
    projectUrl: 'https://shaheen-group.com/case-studies/orbital-avionics',
    repoUrl: 'https://github.com/shaheen-group/orbital-avionics',
    status: 'active',
  },
];

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    number: '01',
    title: {
      en: 'Autonomous Systems & Agent Architecture',
      ar: 'الأنظمة الذاتية ومعمارية الوكلاء الأذكياء',
    },
    description: {
      en: 'We architect deterministic, self-healing agent pipelines that replace brittle workflows with self-governing computational models.',
      ar: 'نصمم مسارات عمل ذاتية التحكم ومعالجة ذاتية للأعطال تستبدل الأنماط التقليدية بنماذج حوسبة مستقلة وعالية الأمان.',
    },
    features: {
      en: ['Multi-agent orchestration engines', 'Edge neural deployment', 'Deterministic output validation', 'Vector pipeline acceleration'],
      ar: ['محركات تنسيق الوكلاء المتعددة', 'تشغيل النماذج في الحافة (Edge)', 'التحقق الحتمي من المخرجات', 'تسريع مسارات متجهات الذاكرة'],
    },
    iconName: 'Cpu',
  },
  {
    id: 'serv-2',
    number: '02',
    title: {
      en: 'Cinematic Web Architecture & Digital Flagships',
      ar: 'المعمارية السينمائية والمنصات القيادية الرقمية',
    },
    description: {
      en: 'We craft immersive digital experiences with flawless 60 FPS GSAP motion design, micro-interactions, and editorial luxury visual direction.',
      ar: 'نبتكر تجارب رقمية غامرة بمعدل 60 إطاراً في الثانية باستخدام GSAP وتفاعلات دقيقة مع هوية بصرية فاخرة واستثنائية.',
    },
    features: {
      en: ['Bespoke GSAP & Lenis motion mechanics', 'Bilingual RTL/LTR typography mastery', 'Spatial layout & lighting engineering', 'Zero-layout-shift performance'],
      ar: ['أنظمة حركة مخصصة بـ GSAP و Lenis', 'إتقان تام للطباعة ثنائية اللغة RTL/LTR', 'هندسة الفضاءات الضوئية والتوزيع', 'أداء صارم بدون اهتزاز في التخطيط'],
    },
    iconName: 'Sparkles',
  },
  {
    id: 'serv-3',
    number: '03',
    title: {
      en: 'High-Concurrency Distributed Engineering',
      ar: 'الهندسة البرمجية الموزعة عالية التزامن',
    },
    description: {
      en: 'Resilient backend foundations capable of executing hundreds of thousands of transactions per second with zero data corruption.',
      ar: 'بنى تحتية خلفية فائقة القوة قادرة على معالجة مئات آلاف المعاملات في الثانية الواحدة مع ضمان أقصى درجات سلامة البيانات.',
    },
    features: {
      en: ['Distributed ledger integrations', 'Binary WebSocket streaming', 'Sub-millisecond data pipelines', 'Zero-trust architecture'],
      ar: ['تكاملات السجلات الموزعة', 'بث ثنائي عالي السرعة عبر WebSocket', 'مسارات نقل بيانات دون المللي ثانية', 'معمارية أمنية قائمة على انعدام الثقة'],
    },
    iconName: 'Layers',
  },
  {
    id: 'serv-4',
    number: '04',
    title: {
      en: 'Strategic Technical Research & Sovereignty',
      ar: 'البحوث التقنية الاستراتيجية والسيادة الرقمية',
    },
    description: {
      en: 'Empowering enterprises and state-scale initiatives to own their algorithmic infrastructure without vendor lock-in or foreign dependencies.',
      ar: 'تمكين المؤسسات والمبادرات الكبرى من امتلاك بنيتها الخوارزمية الرقمية المستقلة دون التبعية لأي طرف خارجي.',
    },
    features: {
      en: ['Proprietary algorithm design', 'Security auditing & penetration defense', 'Hardware-software co-optimization', 'Sovereign data governance'],
      ar: ['تصميم خوارزميات ملكية خاصة', 'تدقيق أمني واختبارات اختراق دفاعية', 'تنسيق عالي الأداء بين العتاد والبرمجيات', 'حوكمة سيادية شاملة للبيانات'],
    },
    iconName: 'Shield',
  },
];

export const initialJournalArticles: JournalArticle[] = [
  {
    id: 'art-1',
    title: {
      en: 'Beyond Innovation: The Architecture of Digital Command',
      ar: 'ما بعد الابتكار: معمارية القيادة الرقمية والسيادة البرمجية',
    },
    slug: 'beyond-innovation-digital-command',
    category: 'Architecture',
    date: 'OCT 2026',
    readTime: '6 min',
    image: '/assets/journal/shaheen-hq.jpg',
    excerpt: {
      en: 'Why modern technology enterprises must transition from passive application builders to commanders of their computational ecosystems.',
      ar: 'لماذا يتعين على مؤسسات التقنية المعاصرة التحول من مجرد بناء تطبيقات عادية إلى قيادة منظوماتها الحوسبية بالكامل.',
    },
    content: {
      en: `In an era saturated with commoditized templates, true technological dominance is not won by following conventions. It is commanded through relentless precision, mathematical discipline, and bespoke visual identity.

From our headquarters in Amman, Jordan, SHAHEEN GROUP approaches every project not as an isolated software deliverable, but as an architectural flagship. We reject generic libraries that bloat bundles and dilute user focus. Instead, we engineer experiences that marry cinematic art direction with millisecond-grade execution speed.

To command the digital future, three principles are paramount:
1. Sovereign Infrastructure: Full ownership of models, code paths, and telemetry.
2. Aesthetic Distinction: Interfaces that evoke luxury, authority, and emotional resonance.
3. Radical Performance: Zero-jank execution that respects human attention and device hardware.`,
      ar: `في عصر يمتلئ بالنماذج المكررة والمستهلكة، لا يمكن تحقيق التفوق التقني الحقيقي عبر اتباع المألوف. بل يتم فرضه بالدقة الرياضية الصارمة، والانضباط البرمجي، والهوية البصرية المخصصة.

من مقرنا الرئيسي في عمّان، الأردن، تنظر مجموعة شاهين (SHAHEEN GROUP) إلى كل مشروع ليس كمجرد برمجية معزولة، بل كمعلم رقمي قيادي متكامل. نحن نرفض القوالب الجاهزة التي ترهق الذاكرة وتشتت انتباه المستخدمين، ونستبدلها بتجارب تجمع بين الإخراج السينمائي الفاخر وسرعة التنفيذ الفائقة دون تأخير.

لقيادة المستقبل الرقمي، نلتزم بثلاث ركائز جوهرية:
١. السيادة التقنية الكاملة على النماذج ومسارات البيانات.
٢. التميز الجمالي الذي يفرض الهيبة والاحترام.
٣. الأداء الحاسم الخالي من أي هبوط في الإطارات مع احترام وقت المستخدمين.`,
    },
    published: true,
  },
  {
    id: 'art-2',
    title: {
      en: 'Cinematic Parallax & Layered Depth in Web Environments',
      ar: 'الإزاحة السينمائية ثلاثية الأبعاد وعمق الطبقات في الويب المعاصر',
    },
    slug: 'cinematic-parallax-depth',
    category: 'Motion Design',
    date: 'SEP 2026',
    readTime: '4 min',
    image: '/assets/projects/project-aerospace.jpg',
    excerpt: {
      en: 'Analyzing how controlled compositor transforms create high-fashion editorial presence without sacrificing Core Web Vitals.',
      ar: 'تحليل عملي لكيفية استخدام تحويلات العتاد الرسومي لخلق حضور بصري سينمائي فاخر دون الإضرار بمؤشرات أداء الويب.',
    },
    content: {
      en: `Motion design in digital flagships is not about gratuitous animations that bounce everywhere. It is about spatial gravitas and intentional rhythm.

By decoupling the walking subject layer from ambient spotlighting, we achieve depth that mirrors luxury cinema campaigns. Every transform is constrained to GPU compositor properties (translate3d, opacity) ensuring buttery 60 FPS transitions across iPhones, Android devices, and ultra-wide desktop monitors.`,
      ar: `تصميم الحركة في المنصات القيادية لا يعني الحركات العشوائية المشتتة، بل يعني إضفاء الهيبة المكانية والتناغم البصري الواعي.

من خلال عزل طبقة العنصر المتحرك عن إضاءات الأستوديو الخلفية، نحقق عمقاً يحاكي الإعلانات السينمائية الفاخرة، مع تقييد كافة التحريكات على معالج الرسوميات لضمان أداء مستقر بسرعة 60 إطاراً في الثانية.`,
    },
    published: true,
  },
];

export const initialMetrics: MetricItem[] = [
  {
    id: 'm1',
    value: '99.999',
    suffix: '%',
    label: { en: 'Telemetry SLA Uptime', ar: 'جاهزية النظم الحرجة' },
    context: { en: 'Over 48M verified transactions', ar: 'عبر أكثر من 48 مليون معاملة معتمدة' },
  },
  {
    id: 'm2',
    value: '< 8.4',
    suffix: 'ms',
    label: { en: 'Quantum Execution Speed', ar: 'سرعة التنفيذ الفائقة' },
    context: { en: 'Sub-millisecond data pipelines', ar: 'مسارات بيانات دون المللي ثانية' },
  },
  {
    id: 'm3',
    value: '100',
    suffix: '%',
    label: { en: 'Bespoke Architecture', ar: 'معمارية أصلية مخصصة' },
    context: { en: 'Zero generic templates or AI slop', ar: 'خالية تماماً من القوالب المكررة' },
  },
  {
    id: 'm4',
    value: 'Jordan',
    suffix: '',
    label: { en: 'Strategic Global HQ', ar: 'المقر الاستراتيجي العالمي' },
    context: { en: 'Amman commanding international scope', ar: 'من عمّان بنطاق عمليات دولي' },
  },
];

export const initialSiteSettings: SiteSettings = {
  brandName: 'SHAHEEN GROUP',
  primaryStatement: {
    en: 'Beyond Innovation. Beyond Limits.',
    ar: 'ما بعد الابتكار. ما وراء الحدود.',
  },
  secondaryStatement: {
    en: "We don't just build projects — we command the digital future.",
    ar: 'نحن لا نبني المشاريع فحسب — بل نقود المستقبل الرقمي.',
  },
  heroIdentity: {
    en: 'Mastermind of SHAHEEN GROUP.',
    ar: 'العقل المدبر لمجموعة شاهين.',
  },
  location: {
    en: 'From: Jordan - Amman',
    ar: 'من: الأردن - عمّان',
  },
  terminalSignature: 'Yousef@Shaheen:~#',
  contactEmail: 'yousef@shaheen-group.com',
  contactPhone: '+962 6 500 0000',
  homepageBlocks: ['hero', 'about', 'metrics', 'projects', 'tools', 'extensions', 'services', 'journal', 'social', 'contact'],
  audioTrackUrl: '/assets/audio/shaheen-ambient.mp3',
};
