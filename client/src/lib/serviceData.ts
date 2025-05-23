export interface Service {
  icon: string;
  title: string;
  description: string;
  price: number;
  pages: number;
}

export const services: Service[] = [
  {
    icon: "ri-layout-2-line",
    title: "Static Websites",
    description: "Perfect for small businesses, portfolios or informational pages where content doesn't change frequently.",
    price: 7000,
    pages: 5
  },
  {
    icon: "ri-code-line",
    title: "Dynamic Websites",
    description: "Websites with content that updates dynamically based on user interactions or backend data changes.",
    price: 12000,
    pages: 5
  },
  {
    icon: "ri-building-line",
    title: "Business Websites",
    description: "Professional websites for companies with service pages, about sections, contact forms and more.",
    price: 15000,
    pages: 7
  },
  {
    icon: "ri-gallery-line",
    title: "Portfolio Websites",
    description: "Showcase your work with beautiful, responsive portfolio sites designed to highlight your projects.",
    price: 6000,
    pages: 4
  },
  {
    icon: "ri-article-line",
    title: "Blog Websites",
    description: "Content-focused websites with article management, categories, and search functionality.",
    price: 10000,
    pages: 5
  },
  {
    icon: "ri-shopping-cart-line",
    title: "E-commerce Websites",
    description: "Online stores with product listings, shopping cart, and secure checkout functionality.",
    price: 20000,
    pages: 7
  }
];
