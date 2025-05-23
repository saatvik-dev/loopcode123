export interface PortfolioProject {
  image: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  website?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "Tixor",
    category: "Web App",
    description: "A modern event ticketing platform with real-time booking, secure payments, and QR code ticket generation.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    website: "https://tixor.in"
  },
  {
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    title: "M-kite Kitchens",
    category: "Business",
    description: "A professional website for a kitchen design and manufacturing company showcasing their portfolio, services, and contact information.",
    technologies: ["React", "Tailwind CSS", "Next.js", "Framer Motion"],
    website: "https://m-kite.in"
  }
];
