import { useState, useEffect, useCallback } from 'react';
import { 
  Project, 
  Service, 
  JournalArticle, 
  MetricItem, 
  SiteSettings, 
  ToolItem, 
  ExtensionItem, 
  SocialProfile, 
  DeveloperProfile,
  CategoryItem,
  MediaItem,
  AdminUser,
  AuditLogEntry
} from '../types';
import { 
  initialProjects, 
  initialServices, 
  initialJournalArticles, 
  initialMetrics, 
  initialSiteSettings, 
  initialTools, 
  initialExtensions, 
  initialSocialProfiles, 
  initialDeveloperProfile 
} from './initialData';

export const initialCategories: CategoryItem[] = [
  { id: 'cat-ai', name: { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' }, slug: 'ai', type: 'project', color: '#e0a21b', count: 2 },
  { id: 'cat-fintech', name: { en: 'Fintech & Sovereign Finance', ar: 'التقنية المالية والسيادة الرقمية' }, slug: 'fintech', type: 'project', color: '#10b981', count: 1 },
  { id: 'cat-aerospace', name: { en: 'Aerospace & Autonomous', ar: 'الملاحة الجوية والأنظمة المستقلة' }, slug: 'aerospace', type: 'project', color: '#38bdf8', count: 1 },
  { id: 'cat-enterprise', name: { en: 'Enterprise Architecture', ar: 'معمارية المؤسسات الكبرى' }, slug: 'enterprise', type: 'project', color: '#a855f7', count: 1 },
  { id: 'cat-tools-cli', name: { en: 'DevOps & CLI Utilities', ar: 'أدوات الطرفية والتشغيل' }, slug: 'cli', type: 'tool', color: '#e0a21b', count: 2 },
  { id: 'cat-ext-ide', name: { en: 'IDE & Editor Extensions', ar: 'إضافات بيئات التطوير' }, slug: 'ide', type: 'extension', color: '#6366f1', count: 2 }
];

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    filename: 'shaheen-icon-transparent.png',
    originalName: 'shaheen-icon-transparent.png',
    url: import.meta.env.BASE_URL + 'assets/brand/shaheen-icon-transparent.png',
    mimeType: 'image/png',
    size: 42100,
    uploadDate: '2026-10-22T00:00:00.000Z',
    altText: { en: 'SHAHEEN GROUP Emblem', ar: 'شعار مجموعة شاهين الذهبي' }
  },
  {
    id: 'med-2',
    filename: 'shaheen-hero-subject.png',
    originalName: 'shaheen-hero-subject.png',
    url: import.meta.env.BASE_URL + 'assets/cinematic/shaheen-hero-subject.png',
    mimeType: 'image/png',
    size: 184500,
    uploadDate: '2026-10-22T00:00:00.000Z',
    altText: { en: 'Mastermind Yousef A. Shaheen', ar: 'العقل المدبر يوسف شاهين' }
  },
  {
    id: 'med-3',
    filename: 'yousef-shaheen.jpg',
    originalName: 'yousef-shaheen.jpg',
    url: import.meta.env.BASE_URL + 'assets/developer/yousef-shaheen.jpg',
    mimeType: 'image/jpeg',
    size: 95200,
    uploadDate: '2026-10-22T00:00:00.000Z',
    altText: { en: 'Yousef A. Shaheen Portrait', ar: 'صورة يوسف شاهين الشخصية' }
  }
];

export const initialUsers: AdminUser[] = [
  {
    id: 'usr-1',
    username: 'Yousef A. Shaheen',
    email: 'yousef@shaheen-group.com',
    role: 'superadmin',
    lastLogin: '2026-10-22T08:15:00.000Z',
    status: 'active',
    createdDate: '2026-01-01'
  },
  {
    id: 'usr-2',
    username: 'Systems Auditor',
    email: 'audit@shaheen-group.com',
    role: 'auditor',
    lastLogin: '2026-10-21T14:30:00.000Z',
    status: 'active',
    createdDate: '2026-02-15'
  }
];

interface CmsState {
  projects: Project[];
  tools: ToolItem[];
  extensions: ExtensionItem[];
  services: Service[];
  articles: JournalArticle[];
  metrics: MetricItem[];
  socialProfiles: SocialProfile[];
  developerProfile: DeveloperProfile;
  settings: SiteSettings;
  categories: CategoryItem[];
  media: MediaItem[];
  users: AdminUser[];
  auditLogs: AuditLogEntry[];
  isAuthenticated: boolean;
  authToken: string | null;
  serverSyncStatus: 'synced' | 'local_only' | 'error' | 'syncing';
  lastSavedAt: string | null;
}

const STORAGE_KEY = 'shaheen_group_cms_v2';
const AUTH_KEY = 'shaheen_admin_session';
const TOKEN_KEY = 'shaheen_token';

export function useCmsStore() {
  const [state, setState] = useState<CmsState>(() => {
    let savedData: any = null;
    const isAuth = typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === 'true';
    const storedToken = typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_KEY) : null;

    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) savedData = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse CMS from local storage', e);
    }

    return {
      projects: savedData?.projects || initialProjects,
      tools: savedData?.tools || initialTools,
      extensions: savedData?.extensions || initialExtensions,
      services: savedData?.services || initialServices,
      articles: savedData?.articles || initialJournalArticles,
      metrics: savedData?.metrics || initialMetrics,
      socialProfiles: savedData?.socialProfiles || initialSocialProfiles,
      developerProfile: savedData?.developerProfile || initialDeveloperProfile,
      settings: savedData?.settings || initialSiteSettings,
      categories: savedData?.categories || initialCategories,
      media: savedData?.media || initialMedia,
      users: savedData?.users || initialUsers,
      auditLogs: [],
      isAuthenticated: isAuth,
      authToken: storedToken,
      serverSyncStatus: 'synced',
      lastSavedAt: null,
    };
  });

  // Background sync with server on mount
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/cms/data');
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setState((prev) => ({
              ...prev,
              projects: result.data.projects || prev.projects,
              tools: result.data.tools || prev.tools,
              extensions: result.data.extensions || prev.extensions,
              services: result.data.services || prev.services,
              articles: result.data.articles || prev.articles,
              metrics: result.data.metrics || prev.metrics,
              socialProfiles: result.data.socialProfiles || prev.socialProfiles,
              developerProfile: result.data.developerProfile || prev.developerProfile,
              settings: result.data.settings || prev.settings,
              categories: result.data.categories || prev.categories,
              media: result.data.media || prev.media,
              users: result.data.users || prev.users,
              serverSyncStatus: 'synced',
            }));
          }
        }
      } catch (err) {
        console.warn('Server CMS DB offline or initializing; using local storage:', err);
      }
    };

    fetchServerData();
  }, []);

  // Sync state to localStorage whenever core data changes
  useEffect(() => {
    try {
      const dataToSave = {
        projects: state.projects,
        tools: state.tools,
        extensions: state.extensions,
        services: state.services,
        articles: state.articles,
        metrics: state.metrics,
        socialProfiles: state.socialProfiles,
        developerProfile: state.developerProfile,
        settings: state.settings,
        categories: state.categories,
        media: state.media,
        users: state.users,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to persist CMS data to localStorage', e);
    }
  }, [
    state.projects, 
    state.tools, 
    state.extensions, 
    state.services, 
    state.articles, 
    state.metrics, 
    state.socialProfiles, 
    state.developerProfile, 
    state.settings,
    state.categories,
    state.media,
    state.users
  ]);

  // Real server persistence method
  const persistToServer = async (): Promise<boolean> => {
    setState((prev) => ({ ...prev, serverSyncStatus: 'syncing' }));
    try {
      const payload = {
        projects: state.projects,
        tools: state.tools,
        extensions: state.extensions,
        services: state.services,
        articles: state.articles,
        metrics: state.metrics,
        socialProfiles: state.socialProfiles,
        developerProfile: state.developerProfile,
        settings: state.settings,
        categories: state.categories,
        media: state.media,
        users: state.users,
        lastSaved: new Date().toISOString(),
      };

      const res = await fetch('/api/cms/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(state.authToken ? { Authorization: `Bearer ${state.authToken}` } : {}),
        },
        body: JSON.stringify({ data: payload }),
      });

      if (res.ok) {
        const timeNow = new Date().toLocaleTimeString();
        setState((prev) => ({
          ...prev,
          serverSyncStatus: 'synced',
          lastSavedAt: timeNow,
        }));
        fetchAuditLogs();
        return true;
      } else {
        setState((prev) => ({ ...prev, serverSyncStatus: 'error' }));
        return false;
      }
    } catch (e) {
      console.error('Failed to commit CMS data to server:', e);
      setState((prev) => ({ ...prev, serverSyncStatus: 'error' }));
      return false;
    }
  };

  const fetchAuditLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.logs)) {
          setState((prev) => ({ ...prev, auditLogs: json.logs }));
        }
      }
    } catch (err) {
      console.error('Failed fetching audit logs:', err);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, username: 'Yousef A. Shaheen' }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem(TOKEN_KEY, data.token || 'authenticated');
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          authToken: data.token,
        }));
        fetchAuditLogs();
        return true;
      }
    } catch (err) {
      console.warn('Backend login endpoint unavailable, trying local fallback:', err);
    }

    // Local fallback for offline mode
    if (password === 'shaheen2026' || password === 'admin' || password === 'shaheen') {
      sessionStorage.setItem(AUTH_KEY, 'true');
      sessionStorage.setItem(TOKEN_KEY, 'local_fallback_token');
      setState((prev) => ({ ...prev, isAuthenticated: true, authToken: 'local_fallback_token' }));
      return true;
    }

    return false;
  };

  const logout = async () => {
    try {
      if (state.authToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${state.authToken}` },
        });
      }
    } catch (e) {
      // Ignore network error on logout
    }

    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setState((prev) => ({ ...prev, isAuthenticated: false, authToken: null }));
  };

  // Projects CRUD
  const addProject = (project: Project) => {
    setState((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Tools CRUD
  const addTool = (tool: ToolItem) => {
    setState((prev) => ({
      ...prev,
      tools: [tool, ...prev.tools],
    }));
  };

  const updateTool = (id: string, updated: Partial<ToolItem>) => {
    setState((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  };

  const deleteTool = (id: string) => {
    setState((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id),
    }));
  };

  // Extensions CRUD
  const addExtension = (ext: ExtensionItem) => {
    setState((prev) => ({
      ...prev,
      extensions: [ext, ...prev.extensions],
    }));
  };

  const updateExtension = (id: string, updated: Partial<ExtensionItem>) => {
    setState((prev) => ({
      ...prev,
      extensions: prev.extensions.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  };

  const deleteExtension = (id: string) => {
    setState((prev) => ({
      ...prev,
      extensions: prev.extensions.filter((e) => e.id !== id),
    }));
  };

  // Categories CRUD
  const addCategory = (cat: CategoryItem) => {
    setState((prev) => ({
      ...prev,
      categories: [...prev.categories, cat],
    }));
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
  };

  const deleteCategory = (id: string) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }));
  };

  // Media CRUD
  const addMedia = (item: MediaItem) => {
    setState((prev) => ({
      ...prev,
      media: [item, ...prev.media],
    }));
  };

  const deleteMedia = (id: string) => {
    setState((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== id),
    }));
  };

  // Users CRUD
  const addUser = (user: AdminUser) => {
    setState((prev) => ({
      ...prev,
      users: [...prev.users, user],
    }));
  };

  const updateUser = (id: string, updated: Partial<AdminUser>) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === id ? { ...u, ...updated } : u)),
    }));
  };

  const deleteUser = (id: string) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.filter((u) => u.id !== id),
    }));
  };

  // Social Profiles CRUD
  const updateSocialProfile = (id: string, updated: Partial<SocialProfile>) => {
    setState((prev) => ({
      ...prev,
      socialProfiles: prev.socialProfiles.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  // Developer Profile update
  const updateDeveloperProfile = (updated: Partial<DeveloperProfile>) => {
    setState((prev) => ({
      ...prev,
      developerProfile: {
        ...prev.developerProfile,
        ...updated,
      },
    }));
  };

  // Articles CRUD
  const addArticle = (article: JournalArticle) => {
    setState((prev) => ({
      ...prev,
      articles: [article, ...prev.articles],
    }));
  };

  const updateArticle = (id: string, updated: Partial<JournalArticle>) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  const deleteArticle = (id: string) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id),
    }));
  };

  // Services
  const updateService = (id: string, updated: Partial<Service>) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  // Layout & Settings
  const reorderBlocks = (newOrder: string[]) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        homepageBlocks: newOrder,
      },
    }));
  };

  const updateSettings = (updated: Partial<SiteSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updated,
      },
    }));
  };

  const resetToFactory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState((prev) => ({
      ...prev,
      projects: initialProjects,
      tools: initialTools,
      extensions: initialExtensions,
      services: initialServices,
      articles: initialJournalArticles,
      metrics: initialMetrics,
      socialProfiles: initialSocialProfiles,
      developerProfile: initialDeveloperProfile,
      settings: initialSiteSettings,
      categories: initialCategories,
      media: initialMedia,
      users: initialUsers,
    }));
  };

  return {
    ...state,
    login,
    logout,
    persistToServer,
    fetchAuditLogs,
    addProject,
    updateProject,
    deleteProject,
    addTool,
    updateTool,
    deleteTool,
    addExtension,
    updateExtension,
    deleteExtension,
    addCategory,
    updateCategory,
    deleteCategory,
    addMedia,
    deleteMedia,
    addUser,
    updateUser,
    deleteUser,
    updateSocialProfile,
    updateDeveloperProfile,
    addArticle,
    updateArticle,
    deleteArticle,
    updateService,
    reorderBlocks,
    updateSettings,
    resetToFactory,
  };
}
