import { useEffect } from 'react';
import { Language, NavView, Project } from '../types';
import { seoService } from '../services/seoService';

interface UseDocumentSeoProps {
  currentView: NavView;
  selectedProject: Project | null;
  lang: Language;
}

/**
 * React hook that binds route state and active project data to the SEO Service,
 * automatically updating document.title, meta descriptions, OpenGraph, Twitter cards,
 * canonical links, and Schema.org JSON-LD whenever view, project, or language changes.
 */
export function useDocumentSeo({ currentView, selectedProject, lang }: UseDocumentSeoProps) {
  useEffect(() => {
    seoService.updateForView(currentView, lang, selectedProject);
  }, [currentView, selectedProject, lang]);
}

export default useDocumentSeo;
