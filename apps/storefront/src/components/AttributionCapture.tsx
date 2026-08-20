"use client";

import { useEffect } from "react";
import {
  ATTRIBUTION_STORAGE_KEY,
  captureAttribution,
  mergeAttribution,
  parseStoredAttribution
} from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    try {
      const nextTouch = captureAttribution({
        search: window.location.search,
        pathname: window.location.pathname,
        referrer: document.referrer,
        currentHost: window.location.host
      });

      if (!nextTouch) return;

      const existing = parseStoredAttribution(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
      const snapshot = mergeAttribution(existing, nextTouch);
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Attribution is optional convenience state. Never block shopping if storage is unavailable.
    }
  }, []);

  return null;
}
