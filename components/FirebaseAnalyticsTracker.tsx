"use client";

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseApp } from "@/libs/firebase";

export default function FirebaseAnalyticsTracker() {
  useEffect(() => {
    isSupported().then((supported) => {
      if (supported) {
        getAnalytics(firebaseApp);
      }
    });
  }, []);

  return null;
}