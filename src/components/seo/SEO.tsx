import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    image?: string;
    jsonLd?: Record<string, any>;
}

const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl = window.location.href,
    image = '/og-image.jpg',
    jsonLd
}: SEOProps) => {

    useEffect(() => {
        // 1. Update Title
        const siteTitle = 'Jhamf Group';
        document.title = `${title} | ${siteTitle}`;

        // 2. Helper to update/create meta tags
        const updateMeta = (name: string, content: string, attribute = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // 3. Update Standard Meta Tags
        updateMeta('description', description);
        if (keywords) updateMeta('keywords', keywords);

        // 4. Update Canonical URL
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', canonicalUrl);

        // 5. Update Open Graph Tags
        updateMeta('og:type', 'website', 'property');
        updateMeta('og:url', canonicalUrl, 'property');
        updateMeta('og:title', `${title} | ${siteTitle}`, 'property');
        updateMeta('og:description', description, 'property');
        updateMeta('og:image', image, 'property');

        // Twitter
        updateMeta('twitter:card', 'summary_large_image', 'name');
        updateMeta('twitter:url', canonicalUrl, 'name');
        updateMeta('twitter:title', `${title} | ${siteTitle}`, 'name');
        updateMeta('twitter:description', description, 'name');
        updateMeta('twitter:image', image, 'name');

        // 6. JSON-LD Structured Data
        if (jsonLd) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.innerHTML = JSON.stringify(jsonLd);
        }

    }, [title, description, keywords, canonicalUrl, image, jsonLd]);

    return null; // This component renders nothing
};

export default SEO;
