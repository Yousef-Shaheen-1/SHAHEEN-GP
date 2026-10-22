import React, { useState, useEffect, useRef } from 'react';
import { useCmsStore } from '../store/useCmsStore';
import { 
  Language, 
  Project, 
  ToolItem, 
  ExtensionItem, 
  Service, 
  JournalArticle, 
  SocialProfile, 
  CategoryItem, 
  AdminUser 
} from '../types';
import { soundscape } from '../services/soundscape';
import { requestAiContent } from '../services/api';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Database,
  Terminal,
  Layers,
  Share2,
  User,
  Sliders,
  ExternalLink,
  Shield,
  Upload,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  RefreshCw,
  Search,
  Globe,
  Tag,
  Key,
  Smartphone,
  Cpu,
  Save,
  Server
} from 'lucide-react';

interface AdminPortalProps {
  lang: Language;
  onExit: () => void;
}

type TabType = 
  | 'overview'
  | 'projects'
  | 'tools'
  | 'extensions'
  | 'services'
  | 'categories'
  | 'media'
  | 'developer'
  | 'socials'
  | 'navigation'
  | 'blocks'
  | 'seo'
  | 'users'
  | 'audit'
  | 'settings';

export const AdminPortal: React.FC<AdminPortalProps> = ({ lang, onExit }) => {
  const isArabic = lang === 'ar';
  const cms = useCmsStore();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Forms State
  const [projectTitleEn, setProjectTitleEn] = useState('');
  const [projectTitleAr, setProjectTitleAr] = useState('');
  const [projectCategory, setProjectCategory] = useState<'ai' | 'fintech' | 'aerospace' | 'enterprise'>('ai');
  const [projectSummaryEn, setProjectSummaryEn] = useState('');
  const [projectSummaryAr, setProjectSummaryAr] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [projectYear, setProjectYear] = useState('2026');
  const [projectImage, setProjectImage] = useState('/assets/projects/project-autonomous.jpg');

  // Tool Form
  const [toolName, setToolName] = useState('');
  const [toolSlug, setToolSlug] = useState('');
  const [toolCategory, setToolCategory] = useState('DevOps & CLI');
  const [toolVersion, setToolVersion] = useState('1.0.0');
  const [toolDescEn, setToolDescEn] = useState('');
  const [toolDescAr, setToolDescAr] = useState('');
  const [toolInstallEn, setToolInstallEn] = useState('npm install -g @shaheen/cli');

  // Category Form
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatType, setNewCatType] = useState<'project' | 'tool' | 'extension'>('project');
  const [newCatColor, setNewCatColor] = useState('#e0a21b');

  // User Form
  const [newUsername, setNewUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'superadmin' | 'editor' | 'auditor'>('editor');

  // AI Assistant State
  const [aiTask, setAiTask] = useState<'draft_project' | 'draft_article' | 'translate' | 'seo_optimize'>('draft_project');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTargetLang, setAiTargetLang] = useState<'en' | 'ar'>('ar');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  useEffect(() => {
    if (cms.isAuthenticated) {
      cms.fetchAuditLogs();
    }
  }, [cms.isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    soundscape.playClickTone();
    setIsLoggingIn(true);
    setAuthError(false);

    const success = await cms.login(passwordInput);
    setIsLoggingIn(false);

    if (!success) {
      setAuthError(true);
    } else {
      setPasswordInput('');
    }
  };

  const handlePersistToServer = async () => {
    soundscape.playClickTone();
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccessMessage(null);

    const ok = await cms.persistToServer();
    setIsSaving(false);

    if (ok) {
      setSaveSuccessMessage(isArabic ? 'تم حفظ ومزامنة البيانات في خادم التخزين الدائم بنجاح.' : 'Data state successfully persisted to durable server storage.');
      setTimeout(() => setSaveSuccessMessage(null), 4000);
    } else {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 4000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundscape.playClickTone();
    setUploadingMedia(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        const res = await fetch('/api/media/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            base64Data,
            mimeType: file.type,
            altText: { en: file.name, ar: file.name },
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.media) {
            cms.addMedia(json.media);
            setSaveSuccessMessage(isArabic ? 'تم رفع الملف بنجاح.' : `File ${file.name} uploaded.`);
            setTimeout(() => setSaveSuccessMessage(null), 3000);
          }
        }
        setUploadingMedia(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadingMedia(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    soundscape.playClickTone();

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: {
        en: projectTitleEn || 'Autonomous Flagship Initiative',
        ar: projectTitleAr || 'مبادرة قيادية ذاتية',
      },
      slug: (projectTitleEn || 'initiative').toLowerCase().replace(/\s+/g, '-'),
      category: projectCategory,
      client: projectClient || 'Shaheen Enterprise Client',
      year: projectYear || '2026',
      summary: {
        en: projectSummaryEn || 'High-performance architectural deployment.',
        ar: projectSummaryAr || 'منظومة معمارية رقمية فائقة الأداء.',
      },
      challenge: {
        en: 'High data velocity with zero downtime tolerances.',
        ar: 'كثافة بيانات عالية مع معايير عمل مستمرة دون أي توقف.',
      },
      solution: {
        en: 'Distributed vector architecture with GPU acceleration.',
        ar: 'معمارية متجهات موزعة مع تسريع العتاد الرسومي.',
      },
      technologies: ['TypeScript', 'Node.js', 'Tailwind CSS', 'GSAP'],
      metrics: [
        { label: { en: 'SLA', ar: 'الجاهزية' }, value: '99.99%' },
        { label: { en: 'Speed', ar: 'السرعة' }, value: '< 8ms' },
      ],
      image: projectImage,
      featured: true,
      published: true,
      publicationDate: '2026-10',
    };

    cms.addProject(newProject);
    setProjectTitleEn('');
    setProjectTitleAr('');
    setProjectSummaryEn('');
    setProjectSummaryAr('');
    setProjectClient('');
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    soundscape.playClickTone();

    const newTool: ToolItem = {
      id: `tool-${Date.now()}`,
      name: toolName || 'Shaheen Sovereign Utility',
      slug: toolSlug || (toolName || 'tool').toLowerCase().replace(/\s+/g, '-'),
      category: toolCategory,
      version: toolVersion,
      description: {
        en: toolDescEn || 'Proprietary developer tooling.',
        ar: toolDescAr || 'أداة تطوير حصرية.',
      },
      icon: 'Terminal',
      installationInstructions: {
        en: toolInstallEn,
        ar: toolInstallEn,
      },
      compatibility: ['Linux', 'macOS', 'Android'],
      tags: ['CLI', 'Security'],
      status: 'stable',
      published: true,
    };

    cms.addTool(newTool);
    setToolName('');
    setToolSlug('');
    setToolDescEn('');
    setToolDescAr('');
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameEn) return;
    soundscape.playClickTone();

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: { en: newCatNameEn, ar: newCatNameAr || newCatNameEn },
      slug: newCatNameEn.toLowerCase().replace(/\s+/g, '-'),
      type: newCatType,
      color: newCatColor,
      count: 0,
    };

    cms.addCategory(newCat);
    setNewCatNameEn('');
    setNewCatNameAr('');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newUserEmail) return;
    soundscape.playClickTone();

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      username: newUsername,
      email: newUserEmail,
      role: newUserRole,
      lastLogin: new Date().toISOString(),
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
    };

    cms.addUser(newUser);
    setNewUsername('');
    setNewUserEmail('');
  };

  const handleGenerateAi = async () => {
    if (!aiPrompt) return;
    soundscape.playClickTone();
    setAiGenerating(true);
    setAiResult(null);

    const res = await requestAiContent({
      task: aiTask,
      prompt: aiPrompt,
      targetLang: aiTargetLang,
    });
    setAiGenerating(false);

    if (res.content) {
      setAiResult(res.content);
    }
  };

  // If not authenticated, show luxury terminal lock screen
  if (!cms.isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#090b0f]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#12151c] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e0a21b] to-transparent" />
          
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#e0a21b]/20 to-[#181b24] p-3 border border-[#e0a21b]/40 flex items-center justify-center shadow-[0_0_25px_rgba(224,162,27,0.3)]">
              <Lock className="w-8 h-8 text-[#e0a21b]" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">
              SHAHEEN COMMAND CONSOLE
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Yousef@Shaheen:~# Access Restricted to Mastermind Vault
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                {isArabic ? 'كلمة المرور المشفرة' : 'Executive Master Key'}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#e0a21b] transition-colors"
                autoFocus
              />
              <p className="text-[10px] text-slate-500 font-mono mt-1">Default credential: <span className="text-[#e0a21b]">shaheen2026</span></p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{isArabic ? 'كلمة المرور غير صحيحة.' : 'Access Denied: Invalid credentials.'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_25px_rgba(224,162,27,0.5)] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Unlock className="w-4 h-4" />}
              <span>{isArabic ? 'مصادقة ودخول المنظومة' : 'Authenticate & Enter'}</span>
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/5 text-center">
            <button
              onClick={onExit}
              className="text-xs text-slate-500 hover:text-white transition-colors uppercase font-mono"
            >
              ← {isArabic ? 'العودة للمنصة العامة' : 'Return to Public Platform'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 15 Tabs Configuration
  const tabs: Array<{ id: TabType; label: string; icon: any }> = [
    { id: 'overview', label: isArabic ? 'نظرة عامة' : 'Overview', icon: Database },
    { id: 'projects', label: isArabic ? 'المشاريع' : 'Projects', icon: Layers },
    { id: 'tools', label: isArabic ? 'الأدوات' : 'Tools', icon: Terminal },
    { id: 'extensions', label: isArabic ? 'الإضافات' : 'Extensions', icon: Cpu },
    { id: 'services', label: isArabic ? 'الخدمات' : 'Services', icon: Shield },
    { id: 'categories', label: isArabic ? 'التصنيفات' : 'Categories', icon: Tag },
    { id: 'media', label: isArabic ? 'الوسائط' : 'Media Library', icon: ImageIcon },
    { id: 'developer', label: isArabic ? 'الهوية الشخصية' : 'Developer ID', icon: User },
    { id: 'socials', label: isArabic ? 'التواصل الاجتماعي' : 'Social Hub', icon: Share2 },
    { id: 'navigation', label: isArabic ? 'القوائم والروابط' : 'Navigation', icon: Globe },
    { id: 'blocks', label: isArabic ? 'ترتيب الأقسام' : 'Page Blocks', icon: Sliders },
    { id: 'seo', label: isArabic ? 'محركات البحث' : 'SEO Engine', icon: Search },
    { id: 'users', label: isArabic ? 'المستخدمين' : 'Admin Roles', icon: Key },
    { id: 'audit', label: isArabic ? 'سجل الأمان' : 'Audit Logs', icon: AlertTriangle },
    { id: 'settings', label: isArabic ? 'إعدادات النظام' : 'System Settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-[#090b0f] text-white">
      {/* Top Admin Sticky Command Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0e12]/95 border-b border-white/10 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e0a21b]/20 border border-[#e0a21b]/40 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#e0a21b]" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
              <span>SHAHEEN COMMAND VAULT</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                ONLINE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono">Headquarters: Amman, Jordan</p>
          </div>
        </div>

        {/* Global Save to Server & Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePersistToServer}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(224,162,27,0.5)] cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isArabic ? 'حفظ دائم في السيرفر' : 'Commit to Server'}</span>
          </button>

          <button
            onClick={() => {
              soundscape.playClickTone();
              cms.logout();
            }}
            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-mono cursor-pointer"
          >
            {isArabic ? 'تسجيل خروج' : 'Logout'}
          </button>

          <button
            onClick={() => {
              soundscape.playClickTone();
              onExit();
            }}
            className="px-3 py-2 rounded-lg bg-[#181b24] hover:bg-[#202532] border border-white/10 text-xs text-slate-300 font-mono cursor-pointer"
          >
            {isArabic ? 'عرض المنصة' : 'Exit to Site'}
          </button>
        </div>
      </header>

      {/* Notifications Toast */}
      {saveSuccessMessage && (
        <div className="max-w-xl mx-auto my-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {saveError && (
        <div className="max-w-xl mx-auto my-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{isArabic ? 'فشلت المزامنة مع الخادم. تم الاحتفاظ بالبيانات محلياً.' : 'Server persistence failed. Changes cached locally.'}</span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: 15-Tab Navigation Menu (3 cols) */}
        <aside className="lg:col-span-3 space-y-1">
          <div className="p-3 rounded-2xl bg-[#12151c] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-1.5 block">
              15 CONTROL DOMAINS
            </span>
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundscape.playClickTone();
                    setActiveTab(t.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left rtl:text-right cursor-pointer ${
                    isActive
                      ? 'bg-[#e0a21b] text-black font-bold shadow-[0_0_15px_rgba(224,162,27,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#e0a21b]'}`} />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick System Telemetry Card */}
          <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10 text-xs font-mono space-y-2 text-slate-400">
            <div className="flex justify-between items-center text-white font-bold">
              <span>STORAGE ENGINE</span>
              <span className="text-[#e0a21b]">DURABLE</span>
            </div>
            <div className="text-[11px] space-y-1">
              <p>Target: <span className="text-slate-200">data/cms-db.json</span></p>
              <p>Sync: <span className="text-emerald-400 uppercase">{cms.serverSyncStatus}</span></p>
              {cms.lastSavedAt && <p>Last Commit: {cms.lastSavedAt}</p>}
            </div>
          </div>
        </aside>

        {/* Right Side: Active Tab View (9 cols) */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Central Operations Overview</h2>
                  <p className="text-xs text-slate-400 font-mono">Real-time status of SHAHEEN GROUP digital infrastructure.</p>
                </div>
                <button
                  onClick={handlePersistToServer}
                  className="px-4 py-2 rounded-xl bg-[#e0a21b] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Sync Server Database</span>
                </button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10">
                  <span className="text-slate-500 text-[10px] font-mono block uppercase">Projects</span>
                  <span className="text-2xl font-bold text-[#e0a21b]">{cms.projects.length}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10">
                  <span className="text-slate-500 text-[10px] font-mono block uppercase">Tools Suite</span>
                  <span className="text-2xl font-bold text-[#e0a21b]">{cms.tools.length}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10">
                  <span className="text-slate-500 text-[10px] font-mono block uppercase">Media Assets</span>
                  <span className="text-2xl font-bold text-[#e0a21b]">{cms.media.length}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#12151c] border border-white/10">
                  <span className="text-slate-500 text-[10px] font-mono block uppercase">Admin Users</span>
                  <span className="text-2xl font-bold text-[#e0a21b]">{cms.users.length}</span>
                </div>
              </div>

              {/* Recent Audit Logs Quick Glance */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Recent System Activities</h3>
                <div className="divide-y divide-white/5 font-mono text-xs">
                  {cms.auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[#e0a21b] font-semibold">{log.action}</span>
                        <p className="text-slate-400 text-[11px]">{log.details}</p>
                      </div>
                      <span className="text-slate-500 text-[10px] shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                  {cms.auditLogs.length === 0 && (
                    <p className="py-4 text-slate-500">No recent audit records retrieved.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-5">
                <h3 className="text-lg font-bold text-white">Create New Flagship Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={projectTitleEn}
                        onChange={(e) => setProjectTitleEn(e.target.value)}
                        placeholder="Project Name..."
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        value={projectTitleAr}
                        onChange={(e) => setProjectTitleAr(e.target.value)}
                        placeholder="عنوان المشروع بالعربية..."
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select
                        value={projectCategory}
                        onChange={(e) => setProjectCategory(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      >
                        <option value="ai">Artificial Intelligence</option>
                        <option value="fintech">Fintech</option>
                        <option value="aerospace">Aerospace</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Client</label>
                      <input
                        type="text"
                        value={projectClient}
                        onChange={(e) => setProjectClient(e.target.value)}
                        placeholder="Client name"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Year</label>
                      <input
                        type="text"
                        value={projectYear}
                        onChange={(e) => setProjectYear(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Summary (EN)</label>
                    <textarea
                      value={projectSummaryEn}
                      onChange={(e) => setProjectSummaryEn(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#e0a21b] text-black font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add Project
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className="space-y-3">
                {cms.projects.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-[#12151c] border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title.en} className="w-12 h-12 rounded-lg object-cover bg-black" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{p.title.en}</h4>
                        <p className="text-xs text-slate-400 font-mono">{p.client} · {p.year} · {p.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => cms.updateProject(p.id, { published: !p.published })}
                        className={`px-3 py-1 rounded text-xs font-mono ${p.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </button>
                      <button
                        onClick={() => cms.deleteProject(p.id)}
                        className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TOOLS */}
          {activeTab === 'tools' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Register Developer CLI Tool</h3>
                <form onSubmit={handleAddTool} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Tool Name</label>
                      <input
                        type="text"
                        value={toolName}
                        onChange={(e) => setToolName(e.target.value)}
                        placeholder="shaheen-core"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Version</label>
                      <input
                        type="text"
                        value={toolVersion}
                        onChange={(e) => setToolVersion(e.target.value)}
                        placeholder="2.4.0"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={toolCategory}
                        onChange={(e) => setToolCategory(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Installation Command</label>
                    <input
                      type="text"
                      value={toolInstallEn}
                      onChange={(e) => setToolInstallEn(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 font-mono text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#e0a21b] text-black font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add Tool
                  </button>
                </form>
              </div>

              <div className="space-y-3">
                {cms.tools.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-[#12151c] border border-white/10 flex items-center justify-between gap-4 text-xs font-mono">
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.name} <span className="text-[#e0a21b]">v{t.version}</span></h4>
                      <p className="text-slate-400">{t.installationInstructions.en}</p>
                    </div>
                    <button
                      onClick={() => cms.deleteTool(t.id)}
                      className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXTENSIONS */}
          {activeTab === 'extensions' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Active IDE & Editor Extensions</h3>
                <div className="space-y-3">
                  {cms.extensions.map((ext) => (
                    <div key={ext.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <h4 className="font-bold text-white text-sm">{ext.name} (v{ext.version})</h4>
                        <p className="text-slate-400">{ext.description[lang]}</p>
                        <p className="font-mono text-[11px] text-[#e0a21b] mt-1">{ext.installationInstructions.en}</p>
                      </div>
                      <button
                        onClick={() => cms.deleteExtension(ext.id)}
                        className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Strategic Architectural Pillars</h3>
                <div className="space-y-4">
                  {cms.services.map((svc) => (
                    <div key={svc.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span className="text-[#e0a21b] font-mono">{svc.number}</span>
                        <span>{svc.title[lang]}</span>
                      </div>
                      <p className="text-slate-400">{svc.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Name (EN)</label>
                      <input
                        type="text"
                        value={newCatNameEn}
                        onChange={(e) => setNewCatNameEn(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Name (AR)</label>
                      <input
                        type="text"
                        value={newCatNameAr}
                        onChange={(e) => setNewCatNameAr(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Scope</label>
                      <select
                        value={newCatType}
                        onChange={(e) => setNewCatType(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      >
                        <option value="project">Project</option>
                        <option value="tool">Tool</option>
                        <option value="extension">Extension</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Badge Color</label>
                      <input
                        type="color"
                        value={newCatColor}
                        onChange={(e) => setNewCatColor(e.target.value)}
                        className="w-full h-10 p-1 rounded-lg bg-black/40 border border-white/10"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#e0a21b] text-black font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cms.categories.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-[#12151c] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <div>
                        <span className="font-bold text-white">{c.name.en}</span>
                        <p className="text-slate-500 font-mono">{c.name.ar} · {c.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => cms.deleteCategory(c.id)}
                      className="p-1 rounded hover:text-red-400 text-slate-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Asset & Media Vault</h3>
                  <p className="text-xs text-slate-400">Upload images, icons, and diagrams to durable storage (/public/uploads).</p>
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingMedia}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploadingMedia ? 'Uploading...' : 'Upload Asset'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cms.media.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-[#12151c] border border-white/10 space-y-2 group">
                    <div className="h-32 rounded-lg bg-black/60 overflow-hidden flex items-center justify-center">
                      <img src={m.url} alt={m.filename} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 space-y-1">
                      <p className="truncate text-white font-semibold">{m.filename}</p>
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(m.url);
                            setCopiedUrl(m.id);
                            setTimeout(() => setCopiedUrl(null), 2000);
                          }}
                          className="text-[#e0a21b] hover:underline"
                        >
                          {copiedUrl === m.id ? 'Copied URL!' : 'Copy URL'}
                        </button>
                        <button
                          onClick={() => cms.deleteMedia(m.id)}
                          className="text-slate-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: DEVELOPER IDENTITY */}
          {activeTab === 'developer' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Yousef A. Shaheen Identity Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={cms.developerProfile.displayName}
                      onChange={(e) => cms.updateDeveloperProfile({ displayName: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Terminal Signature</label>
                    <input
                      type="text"
                      value={cms.developerProfile.terminalPrompt}
                      onChange={(e) => cms.updateDeveloperProfile({ terminalPrompt: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-[#e0a21b] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Location (EN)</label>
                    <input
                      type="text"
                      value={cms.developerProfile.location.en}
                      onChange={(e) => cms.updateDeveloperProfile({ location: { ...cms.developerProfile.location, en: e.target.value } })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Location (AR)</label>
                    <input
                      type="text"
                      value={cms.developerProfile.location.ar}
                      onChange={(e) => cms.updateDeveloperProfile({ location: { ...cms.developerProfile.location, ar: e.target.value } })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SOCIAL PROFILES */}
          {activeTab === 'socials' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">External Network Channels (8 Profiles)</h3>
                <div className="space-y-3">
                  {cms.socialProfiles.map((soc) => (
                    <div key={soc.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#e0a21b]">
                          {soc.platform[0]}
                        </span>
                        <div>
                          <h4 className="font-bold text-white">{soc.label}</h4>
                          <input
                            type="text"
                            value={soc.url}
                            onChange={(e) => cms.updateSocialProfile(soc.id, { url: e.target.value })}
                            className="font-mono text-slate-400 bg-transparent border-b border-white/10 focus:border-[#e0a21b] outline-none text-[11px] w-64 sm:w-80"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => cms.updateSocialProfile(soc.id, { enabled: !soc.enabled })}
                        className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                          soc.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {soc.enabled ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: NAVIGATION ARCHITECTURE */}
          {activeTab === 'navigation' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Platform Navigation Routes</h3>
                <p className="text-xs text-slate-400">Routes exposed in the 3-Zone Sticky Navigation.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  {['home', 'projects', 'tools', 'extensions', 'services', 'about', 'android', 'contact'].map((view) => (
                    <div key={view} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <span className="text-white uppercase">{view}</span>
                      <span className="text-emerald-400 text-[10px]">ENABLED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PAGE BLOCKS */}
          {activeTab === 'blocks' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Homepage Section Sequencing</h3>
                <div className="space-y-2">
                  {cms.settings.homepageBlocks.map((blk, idx) => (
                    <div key={blk} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-[#e0a21b] font-bold">#{idx + 1}</span>
                        <span className="text-white uppercase">{blk}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => {
                            const newArr = [...cms.settings.homepageBlocks];
                            const temp = newArr[idx];
                            newArr[idx] = newArr[idx - 1];
                            newArr[idx - 1] = temp;
                            cms.reorderBlocks(newArr);
                          }}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === cms.settings.homepageBlocks.length - 1}
                          onClick={() => {
                            const newArr = [...cms.settings.homepageBlocks];
                            const temp = newArr[idx];
                            newArr[idx] = newArr[idx + 1];
                            newArr[idx + 1] = temp;
                            cms.reorderBlocks(newArr);
                          }}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SEO ENGINE */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">SEO Engine & OpenGraph Protocol</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Global Brand Statement (EN)</label>
                    <input
                      type="text"
                      value={cms.settings.primaryStatement.en}
                      onChange={(e) => cms.updateSettings({ primaryStatement: { ...cms.settings.primaryStatement, en: e.target.value } })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Global Brand Statement (AR)</label>
                    <input
                      type="text"
                      value={cms.settings.primaryStatement.ar}
                      onChange={(e) => cms.updateSettings({ primaryStatement: { ...cms.settings.primaryStatement, ar: e.target.value } })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Google Site Verification Code</label>
                    <input
                      type="text"
                      value={cms.settings.googleSiteVerification || 'shaheen-verification-token-amman-hq'}
                      onChange={(e) => cms.updateSettings({ googleSiteVerification: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 font-mono text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white">Authorize New Administrator</h3>
                <form onSubmit={handleAddUser} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Username</label>
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Operator Name"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="admin@shaheen-group.com"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Role</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      >
                        <option value="superadmin">Superadmin</option>
                        <option value="editor">Editor</option>
                        <option value="auditor">Auditor</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#e0a21b] text-black font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Add User
                  </button>
                </form>
              </div>

              <div className="space-y-3">
                {cms.users.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl bg-[#12151c] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-white">{u.username}</h4>
                      <p className="text-slate-400 font-mono">{u.email} · Role: <span className="text-[#e0a21b] uppercase">{u.role}</span></p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: SECURITY & AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Audit Trail & Forensic Logs</h3>
                  <button
                    onClick={() => cms.fetchAuditLogs()}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-white/5 font-mono text-xs overflow-x-auto">
                  {cms.auditLogs.map((log) => (
                    <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#e0a21b] font-bold">{log.action}</span>
                          <span className="text-slate-500">[{log.actor}]</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{log.details}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 text-right shrink-0">
                        <p>{log.ip}</p>
                        <p>{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  {cms.auditLogs.length === 0 && (
                    <p className="py-8 text-center text-slate-500">No audit log entries found.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: SYSTEM SETTINGS & GEMINI ASSISTANT */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* AI Content Architect */}
              <div className="p-6 rounded-2xl bg-[#12151c] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Sparkles className="w-5 h-5 text-[#e0a21b]" />
                  <span>AI Content Assistant (Server-Side Gemini Engine)</span>
                </div>
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Task</label>
                      <select
                        value={aiTask}
                        onChange={(e) => setAiTask(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      >
                        <option value="draft_project">Draft Project Case Study</option>
                        <option value="draft_article">Draft Architecture Article</option>
                        <option value="translate">High-Fidelity Arabic/English Translation</option>
                        <option value="seo_optimize">Generate SEO Keywords & Meta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Target Language</label>
                      <select
                        value={aiTargetLang}
                        onChange={(e) => setAiTargetLang(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                      >
                        <option value="ar">Arabic (العربية)</option>
                        <option value="en">English (US)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Prompt / Scope</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Sovereign AI autonomous cluster architecture..."
                      rows={3}
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                    />
                  </div>

                  <button
                    onClick={handleGenerateAi}
                    disabled={aiGenerating}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#e0a21b] to-[#c78d14] text-black font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {aiGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>{aiGenerating ? 'Generating...' : 'Generate with Gemini'}</span>
                  </button>

                  {aiResult && (
                    <div className="p-4 rounded-xl bg-black/50 border border-[#e0a21b]/30 space-y-2">
                      <span className="text-[#e0a21b] font-bold font-mono">Generated Output:</span>
                      <pre className="text-slate-300 whitespace-pre-wrap font-sans text-xs leading-relaxed">{aiResult}</pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">Factory Reset CMS State</h4>
                  <p className="text-slate-400">Reverts all project and tool customizations back to original defaults.</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset CMS state to defaults?')) {
                      cms.resetToFactory();
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-bold uppercase tracking-wider cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
