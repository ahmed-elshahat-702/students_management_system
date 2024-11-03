"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    // Set initial value
    setIsMobile(media.matches);

    // Create event listener
    const listener = () => setIsMobile(media.matches);

    // Add listener
    media.addEventListener("change", listener);

    // Clean up
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}
