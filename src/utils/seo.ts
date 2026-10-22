import {
  SeoMetadata,
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
  seoService,
} from '../services/seoService';

// Backward compatibility alias for legacy imports
export type SeoConfig = SeoMetadata;

export {
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
  seoService,
};

export default updateDocumentSeo;
