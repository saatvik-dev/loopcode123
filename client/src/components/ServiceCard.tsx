import { motion } from 'framer-motion';
import { Currency, formatPrice } from '@/lib/pricingData';

export interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  price: number;
  pages: number;
  currency: Currency;
  delay?: number;
}

const ServiceCard = ({ icon, title, description, price, pages, currency, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div 
      className="bg-neutral-100 rounded-xl p-6 hover:shadow-lg transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="w-14 h-14 bg-black/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-black/20 transition-colors">
        <i className={`${icon} text-2xl text-black`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-neutral-900">{title}</h3>
      <p className="mb-4 text-neutral-700">{description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-neutral-900">From {formatPrice(price, currency)}</span>
        <span className="text-neutral-500">{pages} pages included</span>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
