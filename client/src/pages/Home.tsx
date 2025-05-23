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

  // Contact form submission
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Contact form error:', error);
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                {...service} 
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Pricing Calculator
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get an instant quote for your project with our pricing calculator
            </motion.p>
          </motion.div>

          <PricingCalculator />
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Service Pricing Overview
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Transparent pricing for all web development services
            </motion.p>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <table className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Service Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Base Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Pages Included</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Extra Page</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Delivery Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Revisions</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Extra Revision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {pricingTableData.map((item, index) => (
                  <tr key={index} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">{item.serviceType}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.basePrice}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.pagesIncluded}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.extraPageCharge}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.deliveryTime}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.includedRevisions}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{item.extraRevisionCharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div 
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-neutral-900">Additional Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">What's Included</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                    Responsive design for all devices
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                    SEO optimization and meta tags
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                    Cross-browser compatibility
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                    SSL certificate and security setup
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                    Basic training and documentation
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-900 mb-3">Additional Costs</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start">
                    <div className="bg-amber-200 rounded-full p-1 mt-1 mr-3">
                      <i className="ri-external-link-line text-xs text-amber-600"></i>
                    </div>
                    <div>
                      <span className="font-medium text-amber-900">Domain & Hosting</span>
                      <p className="text-xs text-amber-700 mt-1">Annual domain registration and hosting fees are separate.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-200 rounded-full p-1 mt-1 mr-3">
                      <i className="ri-image-line text-xs text-amber-600"></i>
                    </div>
                    <div>
                      <span className="font-medium text-amber-900">Premium Assets</span>
                      <p className="text-xs text-amber-700 mt-1">Stock photos, premium fonts, or illustrations if needed.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-200 rounded-full p-1 mt-1 mr-3">
                      <i className="ri-service-line text-xs text-amber-600"></i>
                    </div>
                    <div>
                      <span className="font-medium text-amber-900">Third-Party Service Fees</span>
                      <p className="text-xs text-amber-700 mt-1">Subscription fees for payment gateways, premium plugins, etc. are not included.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
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
                What I Need to Get Started
              </motion.h2>
              <motion.p 
                className="text-lg text-neutral-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                To create the perfect website for you, please provide the following information
              </motion.p>
            </div>

            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-text text-lg text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Content & Copy</h3>
                    <p className="text-neutral-700">All text content for your website including headings, descriptions, about information, and any specific messaging you want to include.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-image-line text-lg text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Images & Media</h3>
                    <p className="text-neutral-700">High-quality images, logos, videos, or any visual content you want to feature on your website. I can also suggest stock photo options if needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-palette-line text-lg text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Brand Guidelines</h3>
                    <p className="text-neutral-700">Your brand colors, fonts, style preferences, and any existing brand guidelines. If you don't have these, I can help create a cohesive brand identity.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-function-line text-lg text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Functionality Requirements</h3>
                    <p className="text-neutral-700">Specific features you need such as contact forms, online booking, e-commerce capabilities, user accounts, or any custom functionality.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-layout-line text-lg text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-neutral-900">Website Structure</h3>
                    <p className="text-neutral-700">An outline of the pages you want and how they should be organized. This can be a simple list or a more detailed sitemap.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black/10 rounded-full p-2 mt-1 mr-4">
                    <i className="ri-links-line text-lg text-black"></i>
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
            {['All', 'E-commerce', 'Business', 'Portfolio', 'Landing Page'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
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
              What my clients say about working with me
            </motion.p>
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

      {/* Blog Section */}
      <BlogSectionPreview />

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
                    <p className="text-neutral-700">Available for remote work worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <i className="ri-time-line text-lg text-primary"></i>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Response Time</p>
                    <p className="text-neutral-700">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-neutral-600 mb-4">Follow me on social media</p>
                <div className="flex space-x-3">
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
                        <FormLabel className="text-sm font-medium text-neutral-700">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
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
                            placeholder="Tell me about your project..." 
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none" 
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
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">1. Project Scope & Changes</h3>
                <p className="text-neutral-700">The project scope will be clearly defined before work begins. Any changes or additions to the original scope may result in additional costs and extended timelines. All change requests must be approved in writing before implementation.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">2. Payment Terms</h3>
                <p className="text-neutral-700">A 50% deposit is required before project commencement, with the remaining balance due upon project completion. For projects over $2,000, payment can be split into milestone-based installments. Late payments may incur a 1.5% monthly fee.</p>
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