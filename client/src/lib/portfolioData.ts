export interface PortfolioProject {
  image: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Tixor",
    category: "Web App",
    description: "A modern event ticketing platform with real-time booking, secure payments, and QR code ticket generation.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Artisan Crafts",
    category: "E-commerce",
    description: "E-commerce store for handmade artisanal products with secure checkout and seller dashboard.",
    technologies: ["Shopify", "Liquid", "JavaScript", "TailwindCSS"]
  },
  {
    image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Justice Partners",
    category: "Business",
    description: "A professional website for a law firm with service information, attorney profiles, and appointment booking.",
    technologies: ["WordPress", "Elementor", "PHP", "CSS"]
  },
  {
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Lens Capture",
    category: "Portfolio",
    description: "A minimalist portfolio website for a professional photographer with gallery layouts and client testimonials.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"]
  },
  {
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "FitTrack",
    category: "Web App",
    description: "A fitness tracking web application with workout plans, progress visualization, and social sharing features.",
    technologies: ["Vue.js", "Firebase", "Chart.js", "Vuetify"]
  },
  {
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Brews & Bites",
    category: "Business",
    description: "A website for a local cafe featuring menu display, online ordering, and table reservation system.",
    technologies: ["WordPress", "WooCommerce", "JavaScript", "SCSS"]
  }
];
