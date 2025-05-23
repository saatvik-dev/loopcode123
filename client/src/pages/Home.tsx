import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

import ClassyHero from '@/components/ui/classy-hero';
import Footer from '@/components/Footer';
import PricingCalculator from '@/components/PricingCalculator';
import ServiceCard from '@/components/ServiceCard';
import PortfolioCard from '@/components/PortfolioCard';
import TestimonialCard from '@/components/TestimonialCard';
import BlogSectionPreview from '@/components/BlogSectionPreview';

import { services } from '@/lib/serviceData';
import { portfolioProjects } from '@/lib/portfolioData';
import { testimonials } from '@/lib/testimonialData';
import { pricingTableData } from '@/lib/pricingData';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { toast } = useToast();

  // Contact form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Mutation for contact form submission
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

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
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Services Offered
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Comprehensive web development solutions to help your business establish a strong online presence
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (index * 0.1),
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  transition: { duration: 0.2 } 
                }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  pages={service.pages}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <motion.a 
              href="#calculator"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Calculate project cost <i className="ri-arrow-right-line ml-1"></i>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="pricing" className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Clear and upfront pricing for all web development services with no hidden fees
            </motion.p>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <table className="w-full min-w-[800px] border-collapse bg-background rounded-lg shadow-sm border">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="px-4 py-5 text-left font-semibold">Service Type</th>
                  <th className="px-4 py-5 text-center font-semibold">Base Price (₹)</th>
                  <th className="px-4 py-5 text-center font-semibold">Pages Included</th>
                  <th className="px-4 py-5 text-center font-semibold">Extra Page (₹)</th>
                  <th className="px-4 py-5 text-center font-semibold">Delivery Time</th>
                  <th className="px-4 py-5 text-center font-semibold">Included Revisions</th>
                  <th className="px-4 py-5 text-center font-semibold">Extra Revision (₹)</th>
                </tr>
              </thead>
              <tbody>
                {pricingTableData.map((item, index) => (
                  <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="px-4 py-4 font-medium">{item.serviceType}</td>
                    <td className="px-4 py-4 text-center">{item.basePrice}</td>
                    <td className="px-4 py-4 text-center">{item.pagesIncluded}</td>
                    <td className="px-4 py-4 text-center">{item.extraPageCharge}</td>
                    <td className="px-4 py-4 text-center">{item.deliveryTime}</td>
                    <td className="px-4 py-4 text-center">{item.includedRevisions}</td>
                    <td className="px-4 py-4 text-center">{item.extraRevisionCharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div 
            className="bg-white p-6 mt-8 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-neutral-900">Notes on Hosting, Domain & Database</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mt-1 mr-2"></i>
                <span>Domain purchase is client's responsibility; I assist with setup for a fee</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mt-1 mr-2"></i>
                <span>Hosting is client-provided or managed by me for an extra fee</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mt-1 mr-2"></i>
                <span>Database usage limited to free tiers; paid tiers or upgrades billed to client</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mt-1 mr-2"></i>
                <span>Email IDs can be created based on hosting capabilities (client to specify)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="calculator" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Pricing Calculator
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get an instant estimate for your web development project
              </motion.p>
            </motion.div>

            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What's Included
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              A detailed breakdown of what's included and excluded in my services
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <motion.div 
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center text-neutral-900">
                <i className="ri-checkbox-circle-fill text-success mr-2"></i> Inclusions
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Responsive Design</span>
                    <p className="text-sm text-neutral-700 mt-1">Your website will look great on all devices - desktops, tablets, and mobile phones.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">SEO Basics</span>
                    <p className="text-sm text-neutral-700 mt-1">Basic search engine optimization to help your site rank better on Google.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Contact Form</span>
                    <p className="text-sm text-neutral-700 mt-1">A functional contact form for visitors to reach out to you.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Social Media Integration</span>
                    <p className="text-sm text-neutral-700 mt-1">Links to your social media profiles and sharing capabilities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Google Analytics Setup</span>
                    <p className="text-sm text-neutral-700 mt-1">Basic analytics setup to monitor your website traffic.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Basic Content Management</span>
                    <p className="text-sm text-neutral-700 mt-1">For dynamic websites, the ability to update basic content yourself.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-success mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Post-Launch Support</span>
                    <p className="text-sm text-neutral-700 mt-1">30 days of support after launch to address any issues.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Exclusions */}
            <motion.div 
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center text-neutral-900">
                <i className="ri-close-circle-fill text-error mr-2"></i> Exclusions
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Content Creation</span>
                    <p className="text-sm text-neutral-700 mt-1">You need to provide the text content, images, and other media for your website.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Domain Registration</span>
                    <p className="text-sm text-neutral-700 mt-1">Domain purchase is the client's responsibility, though I can assist with setup.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Hosting Costs</span>
                    <p className="text-sm text-neutral-700 mt-1">Monthly/annual hosting costs are not included in the development price.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Paid Stock Photos</span>
                    <p className="text-sm text-neutral-700 mt-1">Purchase of premium stock photos is not included, but I can recommend free alternatives.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Ongoing Maintenance</span>
                    <p className="text-sm text-neutral-700 mt-1">Regular maintenance beyond the 30-day support period requires a separate agreement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Advanced SEO Campaigns</span>
                    <p className="text-sm text-neutral-700 mt-1">Advanced SEO strategies and ongoing optimization are offered as separate services.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="ri-close-line text-error mt-1 mr-3"></i>
                  <div>
                    <span className="font-medium text-neutral-900">Third-Party Service Fees</span>
                    <p className="text-sm text-neutral-700 mt-1">Subscription fees for payment gateways, premium plugins, etc. are not included.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Project Requirements
              </motion.h2>
              <motion.p 
                className="text-lg text-neutral-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                What you need to provide for a smooth development process
              </motion.p>
            </div>

            <motion.div 
              className="bg-neutral-100 rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-file-text-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Content & Media</h3>
                    <p className="text-neutral-700">All text content, high-quality images, videos, and other media files that will be used on the website. Content should be well-organized and provided in editable formats (Word, Google Docs, etc.).</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-palette-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Brand Assets</h3>
                    <p className="text-neutral-700">Your logo (in vector format if possible), brand colors, fonts, and any brand guidelines to ensure the website aligns with your brand identity.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-global-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Domain & Hosting Information</h3>
                    <p className="text-neutral-700">If you already have a domain or hosting, provide the necessary access credentials. If not, I can guide you through purchasing and setting these up (additional fees may apply).</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-mail-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Email Requirements</h3>
                    <p className="text-neutral-700">Details of any email accounts that need to be set up, including desired email addresses and configurations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-layout-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Website Structure</h3>
                    <p className="text-neutral-700">An outline of the pages you want and how they should be organized. This can be a simple list or a more detailed sitemap.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-links-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Social Media & External Links</h3>
                    <p className="text-neutral-700">URLs for all social media profiles and any other external resources that need to be linked from your website.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 flex items-start">
                  <i className="ri-information-line text-amber-500 mt-1 mr-2 flex-shrink-0"></i>
                  <span><strong>Important:</strong> Providing complete and detailed requirements at the start of the project helps avoid delays and ensures we can meet the agreed timeline. Significant changes to requirements after development has begun may result in additional costs and extended timelines.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Check out some of my recent projects
            </motion.p>
          </div>

          {/* Portfolio Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {['All', 'Business', 'Web App'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-md shadow-sm border border-neutral-200 font-medium transition-colors ${
                  selectedFilter === filter 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-neutral-700 hover:bg-primary hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={index}
                image={project.image}
                title={project.title}
                category={project.category}
                description={project.description}
                technologies={project.technologies}
                website={project.website}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Removed "View More Projects" button since we only have two projects now */}
        </div>
      </section>

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
            >
              What my clients have to say about working with me
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                company={testimonial.company}
                rating={testimonial.rating}
                initials={testimonial.initials}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Have a project in mind? Let's discuss how I can help bring your vision to life.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Information */}
            <motion.div 
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-neutral-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <i className="ri-mail-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Email</p>
                    <a href="mailto:contact@codecraft.dev" className="text-primary hover:text-primary/80 transition-colors">contact@codecraft.dev</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <i className="ri-phone-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Phone</p>
                    <a href="tel:+919876543210" className="text-primary hover:text-primary/80 transition-colors">+91 98765 43210</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <i className="ri-map-pin-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Location</p>
                    <p className="text-neutral-700">Bangalore, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <i className="ri-time-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Working Hours</p>
                    <p className="text-neutral-700">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4 text-neutral-900">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-neutral-100 hover:bg-primary hover:text-white text-neutral-700 p-2 rounded-full transition-colors">
                    <i className="ri-linkedin-fill text-lg"></i>
                  </a>
                  <a href="#" className="bg-neutral-100 hover:bg-primary hover:text-white text-neutral-700 p-2 rounded-full transition-colors">
                    <i className="ri-github-fill text-lg"></i>
                  </a>
                  <a href="#" className="bg-neutral-100 hover:bg-primary hover:text-white text-neutral-700 p-2 rounded-full transition-colors">
                    <i className="ri-twitter-fill text-lg"></i>
                  </a>
                  <a href="#" className="bg-neutral-100 hover:bg-primary hover:text-white text-neutral-700 p-2 rounded-full transition-colors">
                    <i className="ri-instagram-fill text-lg"></i>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-neutral-900">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+91 98765 43210" 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell me about your project..." 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
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
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">1. Project Scope</h3>
                <p className="text-neutral-700">The project scope will be clearly defined in a separate agreement before work begins. Any requests that fall outside the agreed scope may require additional payment and timeline adjustments. Major changes to the project scope after development has begun may result in additional costs.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">2. Payment Terms</h3>
                <p className="text-neutral-700">A 50% non-refundable deposit is required before work begins. The remaining balance is due upon project completion and before the website is published. For larger projects, a payment schedule may be arranged. Delayed payments may result in project delays.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">3. Ownership & Rights</h3>
                <p className="text-neutral-700">Upon full payment, the client receives ownership of the website design and content. However, I retain the right to showcase the work in my portfolio unless otherwise agreed. Third-party elements (stock photos, plugins, etc.) are subject to their own licensing terms.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">4. Confidentiality</h3>
                <p className="text-neutral-700">I agree to keep all client information and project details confidential. Any information provided will only be used for the purposes of completing the project unless otherwise permitted by the client.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">5. Revision Policy</h3>
                <p className="text-neutral-700">Each service includes a specific number of revision rounds as outlined in the pricing table. Additional revisions will be charged at the rates specified. All revision requests should be consolidated and communicated clearly to avoid misunderstandings.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">6. Project Timeline</h3>
                <p className="text-neutral-700">Project timelines are estimates and depend on prompt client feedback and material provision. Delays in providing required content or feedback may extend the project timeline. The development process will start only after receiving the initial deposit and all required content.</p>
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
