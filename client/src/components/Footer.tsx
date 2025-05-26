import { Link } from 'wouter';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
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
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Loopcode</h3>
            <p className="text-neutral-400 mb-4">Professional web development services for businesses in India. Delivering quality websites and web applications that help you grow your online presence.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="ri-github-fill text-lg"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('services')} className="text-neutral-400 hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="text-neutral-400 hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollToSection('calculator')} className="text-neutral-400 hover:text-white transition-colors">Calculator</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="text-neutral-400 hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-neutral-400 hover:text-white transition-colors">Contact</button></li>
              <li><button onClick={() => scrollToSection('terms')} className="text-neutral-400 hover:text-white transition-colors">Terms & Conditions</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Static Websites</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Dynamic Websites</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">E-commerce Development</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Custom Web Applications</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Website Maintenance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start">
                <i className="ri-mail-line mt-1 mr-3"></i>
                <a href="mailto:contact@loopcode.dev" className="hover:text-white transition-colors">contact@loopcode.dev</a>
              </li>
              <li className="flex items-start">
                <i className="ri-phone-line mt-1 mr-3"></i>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+917093764745, +919100198981</a>
              </li>
              <li className="flex items-start">
                <i className="ri-map-pin-line mt-1 mr-3"></i>
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Loopcode. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              <button onClick={() => scrollToSection('terms')} className="text-neutral-400 hover:text-white text-sm transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
