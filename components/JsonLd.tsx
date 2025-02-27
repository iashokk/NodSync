'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function JsonLd() {
  const pathname = usePathname();

  // Define your JSON‑LD data for the homepage vs. other pages
  const jsonData =
    pathname === '/'
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NodSync",
          "url": "https://www.nodsync.com/",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "reviewCount": "122"
          }
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "NodSync",
          "publisher": {
            "@type": "Organization",
            "name": "NodSync",
            "url": "https://www.nodsync.com/"
          }
        };

  return (
    <Script type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(jsonData)}
    </Script>
  );
}
