import { useCallback } from 'react';

export function useScroll() {
  const scrollToSection = useCallback((id: string) => {
    // For mobile compatibility, we need a more robust approach
    try {
      const element = document.getElementById(id);
      if (!element) return;
      
      // Close mobile menu if open
      // This allows direct access to our scroll function from any component
      const mobileMenuButton = document.querySelector('[aria-label="Close Menu"]');
      if (mobileMenuButton) {
        (mobileMenuButton as HTMLButtonElement).click();
      }
      
      // Give the browser a moment to process
      setTimeout(() => {
        // Get element position with offset for fixed header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Scroll to element
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        
        // Add a secondary scroll for mobile compatibility
        setTimeout(() => {
          if (Math.abs(element.getBoundingClientRect().top) > 10) {
            window.scrollTo({
              top: window.pageYOffset + element.getBoundingClientRect().top - headerOffset,
              behavior: 'smooth',
            });
          }
        }, 500);
      }, 100);
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
  }, []);

  return { scrollToSection };
}
