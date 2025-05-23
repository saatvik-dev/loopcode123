import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const WhatsAppButton = () => {
  const { toast } = useToast();
  
  const handleWhatsAppClick = () => {
    const whatsappNumber = "917093764745";
    const message = encodeURIComponent("Hi there! I'm interested in your web development services. Can we discuss my project?");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you to our chat support...",
      duration: 3000,
    });
  };

  // Bounce animation that repeats
  const bounceAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-xl z-50 flex items-center justify-center"
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={[
        { opacity: 1, y: 0 },
        bounceAnimation
      ]}
      transition={{ 
        duration: 0.5,
        delay: 0.5
      }}
      aria-label="Contact on WhatsApp"
    >
      <i className="ri-whatsapp-line text-3xl"></i>
    </motion.button>
  );
};

export default WhatsAppButton;
