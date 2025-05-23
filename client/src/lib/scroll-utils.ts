/**
 * Utility function to reliably scroll to any element by ID
 * Works on all devices and browsers
 */
export function scrollToSection(sectionId: string): void {
  try {
    // Make sure we're in the browser
    if (typeof window === 'undefined' || !document) return;
    
    // Find the element
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`Section with ID '${sectionId}' not found`);
      return;
    }
    
    // Get the position with offset for fixed header
    const headerOffset = 80;
    // Force layout calculation to ensure accurate positioning
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + sectionPosition - headerOffset;

    // Perform the scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Force focus on the element for accessibility
    setTimeout(() => {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }, 1000);
  } catch (error) {
    console.error('Error scrolling to section:', error);
  }
}
