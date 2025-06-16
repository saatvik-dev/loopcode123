import { Currency, services as pricingServices } from './pricingData';

export interface Service {
  icon: string;
  title: string;
  description: string;
  serviceType: keyof typeof pricingServices;
}

export const serviceDisplayData: Service[] = [
  {
    icon: "ri-layout-2-line",
    title: "Static Websites",
    description: "Perfect for small businesses, portfolios or informational pages where content doesn't change frequently.",
    serviceType: "static"
  },
  {
    icon: "ri-code-line",
    title: "Dynamic Websites",
    description: "Websites with content that updates dynamically based on user interactions or backend data changes.",
    serviceType: "dynamic"
  },
  {
    icon: "ri-building-line",
    title: "Business Websites",
    description: "Professional websites for companies with service pages, about sections, contact forms and more.",
    serviceType: "business"
  },
  {
    icon: "ri-gallery-line",
    title: "Portfolio Websites",
    description: "Showcase your work with beautiful, responsive portfolio sites designed to highlight your projects.",
    serviceType: "portfolio"
  },
  {
    icon: "ri-article-line",
    title: "Blog Websites",
    description: "Content-focused websites with article management, categories, and search functionality.",
    serviceType: "blog"
  },
  {
    icon: "ri-shopping-cart-line",
    title: "E-commerce Websites",
    description: "Online stores with product listings, shopping cart, and secure checkout functionality.",
    serviceType: "ecommerce-basic"
  }
];

export const getServiceWithPricing = (service: Service, currency: Currency) => {
  const pricingData = pricingServices[service.serviceType][currency];
  return {
    ...service,
    price: pricingData.base,
    pages: pricingData.pages,
    currency
  };
};
