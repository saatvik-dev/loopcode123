import { motion } from 'framer-motion';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  rating: number;
  initials: string;
  delay?: number;
}

const TestimonialCard = ({ quote, author, company, rating, initials, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-neutral-100 rounded-xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-center mb-4">
        <div className="text-amber-400 flex">
          {[...Array(5)].map((_, index) => (
            <i 
              key={index} 
              className={`ri-star-${index < rating ? 'fill' : index === Math.floor(rating) && rating % 1 !== 0 ? 'half-fill' : 'line'}`}
            ></i>
          ))}
        </div>
      </div>
      <p className="text-neutral-700 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="bg-neutral-300 w-10 h-10 rounded-full flex items-center justify-center font-medium text-neutral-600 mr-3">
          {initials}
        </div>
        <div>
          <h4 className="font-medium text-neutral-900">{author}</h4>
          <p className="text-sm text-neutral-500">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
