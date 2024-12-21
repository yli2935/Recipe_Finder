// hooks/useResponsiveItemsPerPage.ts

import { useState, useEffect } from "react";

/**
 * Returns number of items to display per page depending on the
 * user's current screen width.
 */
export default function useResponsiveItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 640) {
        // MOBILE
        setItemsPerPage(6);
      } else if (width < 1024) {
        // TABLET
        setItemsPerPage(9);
      } else {
        // DESKTOP
        setItemsPerPage(12);
      }
    }

    // Listen for screen resize
    window.addEventListener("resize", handleResize);

    // Call once on mount to set initial value
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return itemsPerPage;
}
