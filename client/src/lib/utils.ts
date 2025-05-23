import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A reliable cross-browser, cross-device scrolling utility
export function scrollToElement(elementId: string, offset: number = -80): void {
  // Make sure we're running in the browser
  if (typeof window === 'undefined') return;
  
  // Give the browser a moment to ensure all elements are rendered
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get the element's position
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;
    
    // Scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // For mobile devices, sometimes a double scroll with a delay works better
    setTimeout(() => {
      const currentPos = element.getBoundingClientRect().top;
      if (Math.abs(currentPos) > 10) { // If we're not quite there yet
        window.scrollTo({
          top: window.pageYOffset + currentPos + offset,
          behavior: 'smooth'
        });
      }
    }, 500);
  }, 100);
}
