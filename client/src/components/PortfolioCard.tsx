import { motion } from 'framer-motion';

export interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  delay?: number;
}

const PortfolioCard = ({ image, title, category, description, technologies, delay = 0 }: PortfolioCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">{category}</span>
        </div>
        <p className="text-neutral-700 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">{tech}</span>
          ))}
        </div>
        <a href="#" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
          View Details <i className="ri-arrow-right-line ml-1"></i>
        </a>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
