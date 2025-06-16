import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PricingCard } from '@/components/ui/dark-gradient-pricing';

import ClassyHero from '@/components/ui/classy-hero';
import Footer from '@/components/Footer';
import PricingCalculator from '@/components/PricingCalculator';
import ServiceCard from '@/components/ServiceCard';
import PortfolioCard from '@/components/PortfolioCard';
import TestimonialCard from '@/components/TestimonialCard';

import AboutSection from '@/components/AboutSection';

import { serviceDisplayData, getServiceWithPricing } from '@/lib/serviceData';
import { portfolioProjects } from '@/lib/portfolioData';
import { testimonials } from '@/lib/testimonialData';
import { Currency, formatPrice, services as pricingServices } from '@/lib/pricingData';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currency, setCurrency] = useState<Currency>('inr');
  const [isDetecting, setIsDetecting] = useState(true);

  // Auto-detect user's currency based on IP location
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const ipServices = [
          'https://ipapi.co/json/',
          'https://ipinfo.io/json',
          'https://freegeoip.app/json/',
          'https://api.db-ip.com/v2/free/self'
        ];

        // Helper function to fetch with timeout and proper error handling
        const fetchWithTimeout = async (url: string, timeout = 5000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, {
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
              }
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
          } catch (error) {
            clearTimeout(timeoutId);
            throw error;
          }
        };

        for (const service of ipServices) {
          try {
            const data = await fetchWithTimeout(service);
            
            const countryCode = data.country_code || data.countryCode || data.country_code2;
            const country = data.country || data.country_name || data.countryName;
            
            if (countryCode === 'US' || country === 'United States' || country === 'USA') {
              setCurrency('usd');
              setIsDetecting(false);
              return;
            }
            
            if (countryCode === 'IN' || country === 'India') {
              setCurrency('inr');
              setIsDetecting(false);
              return;
            }
            
            if (countryCode) {
              setCurrency('usd');
              setIsDetecting(false);
              return;
            }
          } catch (serviceError) {
            // Silently continue to next service
            continue;
          }
        }

        // Default to INR if no service worked
        setCurrency('inr');
        setIsDetecting(false);
      } catch (error) {
        // Fallback to INR on any error
        setCurrency('inr');
        setIsDetecting(false);
      }
    };

    // Use a safer approach to handle the async function
    let isMounted = true;
    
    detectCurrency()
      .then(() => {
        // Success case is handled in the function
      })
      .catch((error) => {
        // Final fallback if promise is rejected
        if (isMounted) {
          setCurrency('inr');
          setIsDetecting(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter portfolio projects
  const filteredProjects = selectedFilter === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedFilter);

  return (
    <div className="font-sans bg-background text-foreground overflow-x-hidden">
      <ClassyHero />
      {/* Services Overview Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our Web Development Services
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              From simple landing pages to complex e-commerce solutions, we craft digital experiences that drive results
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviceDisplayData.map((service, index) => {
              const serviceWithPricing = getServiceWithPricing(service, currency);
              return (
                <ServiceCard 
                  key={index} 
                  {...serviceWithPricing} 
                  currency={currency}
                  delay={index * 0.1}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Pricing Plans Section */}
      <section className="py-16 md:py-24 bg-[#ffffff] text-[#0c0a09]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-[#0c0a09]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >Choose the plan that fits your business needs</motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              tier="Starter"
              price={formatPrice(pricingServices.static[currency].base, currency)}
              bestFor="Best for small businesses"
              CTA="Get started"
              benefits={[
                { text: "Responsive design", checked: true },
                { text: "Up to 5 pages", checked: true },
                { text: "Contact form", checked: true },
                { text: "SEO optimization", checked: true },
                { text: "CMS integration", checked: false },
                { text: "E-commerce functionality", checked: false },
              ]}
            />
            <PricingCard
              tier="Pro"
              price={formatPrice(pricingServices.business[currency].base, currency)}
              bestFor="Best for growing businesses"
              CTA="Most popular"
              benefits={[
                { text: "Responsive design", checked: true },
                { text: "Up to 10 pages", checked: true },
                { text: "Contact form", checked: true },
                { text: "SEO optimization", checked: true },
                { text: "CMS integration", checked: true },
                { text: "Basic e-commerce (up to 20 products)", checked: true },
              ]}
            />
            <PricingCard
              tier="Enterprise"
              price="Custom"
              bestFor="Best for large businesses"
              CTA="Contact us"
              benefits={[
                { text: "Responsive design", checked: true },
                { text: "Unlimited pages", checked: true },
                { text: "Advanced forms & user accounts", checked: true },
                { text: "Advanced SEO strategy", checked: true },
                { text: "Full CMS integration", checked: true },
                { text: "Complete e-commerce solution", checked: true },
              ]}
            />
          </div>
        </div>
      </section>
      {/* Interactive Pricing Calculator Section */}
      <section id="calculator" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Calculate Your Project Cost
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >Get an instant estimate for your web development project with our interactive pricing calculator</motion.p>
          </div>
          
          <PricingCalculator />
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Portfolio
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >Discover our latest projects and see how we've helped businesses succeed online</motion.p>
          </div>

          {/* Filter buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {['All', 'E-commerce', 'Business', 'Portfolio'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={index} {...project} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* About Us Section */}
      <AboutSection />
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Client Testimonials
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >What our clients say about working with us</motion.p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* Terms & Conditions Section */}
      <section id="terms" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Terms & Conditions
              </motion.h2>
              <motion.p 
                className="text-lg text-neutral-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Please review the following terms for all web development projects
              </motion.p>
            </div>

            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">1. Project Scope & Changes</h3>
                <p className="text-neutral-700">The project scope will be clearly defined before work begins. Any changes or additions to the original scope may result in additional costs and extended timelines. All change requests must be approved in writing before implementation.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">2. Payment Terms</h3>
                <p className="text-neutral-700">A 50% deposit is required before project commencement, with the remaining balance due upon project completion. For projects over 40,000, payment can be split into milestone-based installments. Late payments may incur a 1.5% monthly fee.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">3. Timeline & Delivery</h3>
                <p className="text-neutral-700">Project timelines will be agreed upon before work begins and are contingent upon timely provision of content and feedback from the client. Delays in client feedback or content provision may result in extended delivery dates.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">4. Revisions & Feedback</h3>
                <p className="text-neutral-700">Each project includes the specified number of revision rounds. Additional revisions beyond the included amount will be charged at the rates outlined in the pricing table. Feedback should be consolidated and provided within 7 days of receiving deliverables.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">5. Content & Materials</h3>
                <p className="text-neutral-700">The client is responsible for providing all content, images, and materials needed for the website. I can assist with content creation and sourcing at additional cost. The client must ensure they have the rights to use all provided materials.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">6. Intellectual Property</h3>
                <p className="text-neutral-700">Upon full payment, the client will own the rights to the final website design and custom code. However, I retain the right to use the work in my portfolio and may reuse general techniques and methodologies in future projects.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">7. Warranties & Liabilities</h3>
                <p className="text-neutral-700">I guarantee the website will function as specified for 30 days after completion. This warranty does not cover issues caused by client modifications, third-party services, or hosting problems. My liability is limited to the amount paid for the project.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">8. Termination</h3>
                <p className="text-neutral-700">Either party may terminate the agreement with written notice. If the client terminates the project, payment is required for work completed up to that point. If I terminate the project due to circumstances beyond my control, a refund may be provided for incomplete work.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;