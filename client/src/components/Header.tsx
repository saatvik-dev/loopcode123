import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`sticky top-0 bg-white z-50 transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className="text-primary text-2xl font-bold">CodeCraft</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('services')} className="font-medium hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection('pricing')} className="font-medium hover:text-primary transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('calculator')} className="font-medium hover:text-primary transition-colors">Calculator</button>
            <button onClick={() => scrollToSection('portfolio')} className="font-medium hover:text-primary transition-colors">Portfolio</button>

            <button onClick={() => scrollToSection('about')} className="font-medium hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollToSection('contact')} className="font-medium hover:text-primary transition-colors">Contact</button>
            <button onClick={() => scrollToSection('terms')} className="font-medium hover:text-primary transition-colors">Terms</button>
          </nav>

          {/* Contact Button - Desktop */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block bg-primary hover:bg-primary/90 text-white"
          >
            Get a Quote
          </Button>

          {/* Mobile Menu Button */}
          <button
            id="menuButton"
            className="md:hidden text-neutral-700"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full border-t border-neutral-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="font-medium py-2 hover:text-primary transition-colors">Services</button>
              <button onClick={() => scrollToSection('pricing')} className="font-medium py-2 hover:text-primary transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('calculator')} className="font-medium py-2 hover:text-primary transition-colors">Calculator</button>
              <button onClick={() => scrollToSection('portfolio')} className="font-medium py-2 hover:text-primary transition-colors">Portfolio</button>

              <button onClick={() => scrollToSection('about')} className="font-medium py-2 hover:text-primary transition-colors">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="font-medium py-2 hover:text-primary transition-colors">Contact</button>
              <button onClick={() => scrollToSection('terms')} className="font-medium py-2 hover:text-primary transition-colors">Terms</button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md text-center transition-colors w-full"
              >
                Get a Quote
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
