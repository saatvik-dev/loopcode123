import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const WhatsAppButton = () => {
  const { toast } = useToast();
  
  const handleWhatsAppClick = () => {
    const whatsappNumber = "919876543210";
    const message = encodeURIComponent("Hi there! I'm interested in your web development services. Can we discuss my project?");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you to our chat support...",
      duration: 3000,
    });
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label="Contact on WhatsApp"
    >
      <i className="ri-whatsapp-line text-2xl"></i>
    </motion.button>
  );
};

export default WhatsAppButton;
