import React, { useState, useEffect } from 'react';
import { Language, NavView, Project } from './types';
import { useCmsStore } from './store/useCmsStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ToolsSection } from './components/ToolsSection';
import { ExtensionsSection } from './components/ExtensionsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { MetricsSection } from './components/MetricsSection';
import { JournalSection } from './components/JournalSection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { AdminPortal } from './components/AdminPortal';
import { DeveloperModal } from './components/DeveloperModal';
import { ParityChecklistModal } from './components/ParityChecklistModal';
import { AndroidDownloadSection } from './components/AndroidDownloadSection';
import { CinematicIntro } from './components/CinematicIntro';
import { PageTransitionOverlay } from './components/PageTransitionOverlay';
import { Footer } from './components/Footer';
import { useDocumentSeo } from './hooks/useDocumentSeo';
import { initLenis, destroyLenis, scrollToTarget } from './services/lenisScroll';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isParityOpen, setIsParityOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingView, setPendingView] = useState<NavView | null>(null);

  // Cinematic Intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('shaheen_intro_seen');
    }
    return false;
  });

  const cms = useCmsStore();

  // Dynamic SEO metadata & Schema.org JSON-LD synchronization
  useDocumentSeo({ currentView, selectedProject, lang });

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Sync HTML lang and dir attributes for true RTL/LTR support
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleNavigate = (view: NavView) => {
    if (view === currentView) {
      scrollToTarget(0);
      return;
    }
    setPendingView(view);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
      scrollToTarget(0, { immediate: true });
    }
    setIsTransitioning(false);
  };

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('shaheen_intro_seen', 'true');
    }
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Render individual sections based on key
  const renderHomepageBlock = (blockKey: string) => {
    switch (blockKey) {
      case 'hero':
        return (
          <Hero
            key="hero"
            lang={lang}
            onNavigate={handleNavigate}
          />
        );
      case 'about':
        return (
          <AboutSection
            key="about"
            lang={lang}
            onExploreProjects={() => handleNavigate('projects')}
          />
        );
      case 'metrics':
        return (
          <MetricsSection
            key="metrics"
            metrics={cms.metrics}
            lang={lang}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            key="projects"
            projects={cms.projects}
            lang={lang}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        );
      case 'tools':
        return (
          <ToolsSection
            key="tools"
            tools={cms.tools}
            lang={lang}
          />
        );
      case 'extensions':
        return (
          <ExtensionsSection
            key="extensions"
            extensions={cms.extensions}
            lang={lang}
          />
        );
      case 'services':
        return (
          <ServicesSection
            key="services"
            services={cms.services}
            lang={lang}
            onContactClick={() => handleNavigate('contact')}
          />
        );
      case 'android':
        return (
          <AndroidDownloadSection
            key="android"
            lang={lang}
          />
        );
      case 'journal':
        return (
          <JournalSection
            key="journal"
            articles={cms.articles}
            lang={lang}
          />
        );
      case 'social':
        return (
          <SocialSection
            key="social"
            socials={cms.socialProfiles}
            lang={lang}
          />
        );
      case 'contact':
        return (
          <ContactSection
            key="contact"
            lang={lang}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-white flex flex-col font-sans selection:bg-[#e0a21b]/30 selection:text-[#e0a21b]">
      
      {/* Full Cinematic Intro Sequence */}
      {showIntro && (
        <CinematicIntro
          lang={lang}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Cinematic Route Transition Curtain */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* 3-Zone Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenParity={() => setIsParityOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {cms.settings.homepageBlocks.map((blockKey) => renderHomepageBlock(blockKey))}
            {/* Guarantee Android showcase presence on home if not specifically listed in custom block sequence */}
            {!cms.settings.homepageBlocks.includes('android') && (
              <AndroidDownloadSection lang={lang} />
            )}
          </div>
        )}

        {currentView === 'projects' && (
          <div className="py-6">
            <ProjectsSection
              projects={cms.projects}
              lang={lang}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          </div>
        )}

        {currentView === 'tools' && (
          <div className="py-6">
            <ToolsSection
              tools={cms.tools}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'extensions' && (
          <div className="py-6">
            <ExtensionsSection
              extensions={cms.extensions}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'services' && (
          <div className="py-6">
            <ServicesSection
              services={cms.services}
              lang={lang}
              onContactClick={() => handleNavigate('contact')}
            />
          </div>
        )}

        {currentView === 'android' && (
          <div className="py-6">
            <AndroidDownloadSection
              lang={lang}
            />
          </div>
        )}

        {currentView === 'about' && (
          <div className="py-6">
            <AboutSection
              lang={lang}
              onExploreProjects={() => handleNavigate('projects')}
            />
          </div>
        )}

        {currentView === 'journal' && (
          <div className="py-6">
            <JournalSection
              articles={cms.articles}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'social' && (
          <div className="py-6">
            <SocialSection
              socials={cms.socialProfiles}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="py-6">
            <ContactSection
              lang={lang}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <AdminPortal
            lang={lang}
            onExit={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Flagship Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenParity={() => setIsParityOpen(true)}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        onToggleLang={toggleLanguage}
        socials={cms.socialProfiles}
      />

      {/* Case Study Full Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        onSelectRelated={(p) => setSelectedProject(p)}
        allProjects={cms.projects}
      />

      {/* Developer Identity Card Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        developer={cms.developerProfile}
        socials={cms.socialProfiles}
        lang={lang}
      />

      {/* Reference Parity & Audit Modal */}
      <ParityChecklistModal
        isOpen={isParityOpen}
        onClose={() => setIsParityOpen(false)}
        lang={lang}
      />
    </div>
  );
}
