export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Working with this developer was a fantastic experience. They took the time to understand our business needs and delivered a website that perfectly represents our brand. The pricing calculator feature was a game-changer for our clients.",
    author: "Rahul Kapoor",
    company: "Artisan Crafts",
    rating: 5,
    initials: "RK"
  },
  {
    quote: "The e-commerce website built for our business exceeded our expectations. The developer was professional, responsive, and delivered on time. The site is user-friendly and our sales have increased significantly since launch.",
    author: "Ananya Patel",
    company: "Brews & Bites",
    rating: 5,
    initials: "AP"
  },
  {
    quote: "We needed a complex web application for our event management business, and this developer delivered exactly what we needed. The platform is robust, secure, and our customers love the user experience. Highly recommended!",
    author: "Vikram Singh",
    company: "Tixor Events",
    rating: 4.5,
    initials: "VS"
  }
];
