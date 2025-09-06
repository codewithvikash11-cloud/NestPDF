import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

const MetaTags = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  canonical 
}: MetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | PDFNest - All-in-One PDF Tools`;
    }

    // Update meta description
    if (description) {
      updateMetaTag('description', description);
    }

    // Update meta keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    if (ogTitle || title) {
      updateMetaTag('og:title', ogTitle || title, 'property');
    }

    if (ogDescription || description) {
      updateMetaTag('og:description', ogDescription || description, 'property');
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }

    // Update canonical URL
    if (canonical) {
      updateCanonicalLink(canonical);
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    if (ogTitle || title) {
      updateMetaTag('twitter:title', ogTitle || title);
    }
    if (ogDescription || description) {
      updateMetaTag('twitter:description', ogDescription || description);
    }
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical, location]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const updateCanonicalLink = (href: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', href);
  };

  return null;
};

export default MetaTags;
