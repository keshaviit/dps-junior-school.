import { useEffect } from "react";

/**
 * Custom hook to dynamically update document title and meta description for SEO on route change.
 * @param {Object} options
 * @param {string} options.title - The document title
 * @param {string} options.description - Meta description text
 * @param {string} [options.canonical] - Optional canonical path (e.g. "/admissions")
 */
export function useSEO({ title, description, canonical }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);

      // Also update og:description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", description);
      }
    }

    // 3. Update Canonical Tag if path provided
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      const baseDomain = "https://www.dpsjuniorbaghpat.in";
      const fullUrl = `${baseDomain}${canonical.startsWith("/") ? canonical : "/" + canonical}`;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", fullUrl);
    }
  }, [title, description, canonical]);
}

export default useSEO;
