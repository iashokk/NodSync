"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Call the analytics API every time the pathname changes
    if (pathname) {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: pathname })
      }).catch((err) => console.error('Analytics error:', err));
    }
  }, [pathname]);
}