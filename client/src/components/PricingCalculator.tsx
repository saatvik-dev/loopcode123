import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';
import { services, ServiceType } from '@/lib/pricingData';
import { useToast } from '@/hooks/use-toast';

const PricingCalculator = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('static');
  const [pagesCount, setPagesCount] = useState(5);
  const [complexity, setComplexity] = useState('simple');
  const [hosting, setHosting] = useState('client');
  const [backend, setBackend] = useState('no');
  const [revisions, setRevisions] = useState(0);
  const { toast } = useToast();

  // Calculated prices
  const [basePrice, setBasePrice] = useState(7000);
  const [extraPagesPrice, setExtraPagesPrice] = useState(0);
  const [hostingPrice, setHostingPrice] = useState(0);
  const [backendPrice, setBackendPrice] = useState(0);
  const [revisionsPrice, setRevisionsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(7000);

  // Complexity multipliers
  const complexityMultipliers: Record<string, number> = {
    simple: 1,
    medium: 1.5,
    complex: 2
  };

  useEffect(() => {
    // Update included pages and revisions when service type changes
    const service = services[serviceType];
    setPagesCount(service.pages);
  }, [serviceType]);

  useEffect(() => {
    // Recalculate prices whenever inputs change
    const service = services[serviceType];
    const extraPages = Math.max(0, pagesCount - service.pages);
    const extraPageCost = extraPages * service.extraPage * complexityMultipliers[complexity];
    const hostingCost = hosting === 'developer' ? 2000 : 0;
    const backendCost = backend === 'yes' ? 5000 : 0;
    const extraRevisionsCost = revisions * service.extraRevision;
    
    setBasePrice(service.base);
    setExtraPagesPrice(extraPageCost);
    setHostingPrice(hostingCost);
    setBackendPrice(backendCost);
    setRevisionsPrice(extraRevisionsCost);
    
    setTotalPrice(service.base + extraPageCost + hostingCost + backendCost + extraRevisionsCost);
  }, [serviceType, pagesCount, complexity, hosting, backend, revisions]);

  const handleContactClick = () => {
    const whatsappNumber = "917093764745";
    const message = encodeURIComponent(`Hi there! I'm interested in your web development services. My project estimate is ₹${totalPrice.toLocaleString()}. Can we discuss this further?`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you with our consultant...",
      duration: 3000,
    });
  };

  return (
    <div className="bg-neutral-100 rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-neutral-900">Your Requirements</h3>
          
          {/* Service Type */}
          <div className="mb-6">
            <Label htmlFor="serviceType" className="text-sm font-medium mb-2 text-neutral-700">Service Type</Label>
            <Select 
              value={serviceType} 
              onValueChange={(value) => setServiceType(value as ServiceType)}
            >
              <SelectTrigger id="serviceType" className="w-full px-4 py-3 rounded-lg border border-neutral-300">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="static">Static Website (₹7,000)</SelectItem>
                <SelectItem value="dynamic">Dynamic Website (₹12,000)</SelectItem>
                <SelectItem value="business">Business Website (₹15,000)</SelectItem>
                <SelectItem value="portfolio">Portfolio Website (₹6,000)</SelectItem>
                <SelectItem value="landing">Landing Page (₹4,000)</SelectItem>
                <SelectItem value="blog">Blog Website (₹10,000)</SelectItem>
                <SelectItem value="ecommerce-basic">E-commerce Basic (₹20,000)</SelectItem>
                <SelectItem value="ecommerce-payments">E-commerce with Payments (₹30,000)</SelectItem>
                <SelectItem value="custom">Custom Web Application (₹40,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Number of Pages */}
          <div className="mb-6">
            <Label htmlFor="pagesCount" className="text-sm font-medium mb-2 text-neutral-700">Number of Pages</Label>
            <div className="flex items-center">
              <Input
                type="number"
                id="pagesCount"
                min="0"
                value={pagesCount}
                onChange={(e) => {
                  // Handle empty string and numbers properly
                  const value = e.target.value;
                  if (value === '') {
                    setPagesCount(0);
                  } else {
                    setPagesCount(parseInt(value));
                  }
                }}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300"
              />
              <span className="ml-2 text-sm text-neutral-500">
                {services[serviceType].pages} included
              </span>
            </div>
          </div>
          
          {/* Complexity Level */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 text-neutral-700">Complexity Level</Label>
            <RadioGroup
              value={complexity}
              onValueChange={setComplexity}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="simple" id="complexity-simple" className="radio-primary" />
                <Label htmlFor="complexity-simple" className="cursor-pointer">Simple</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="complexity-medium" className="radio-primary" />
                <Label htmlFor="complexity-medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complex" id="complexity-complex" className="radio-primary" />
                <Label htmlFor="complexity-complex" className="cursor-pointer">Complex</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Hosting & Domain Setup */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 text-neutral-700">Hosting & Domain Setup</Label>
            <RadioGroup
              value={hosting}
              onValueChange={setHosting}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="hosting-client" className="radio-primary" />
                <Label htmlFor="hosting-client" className="cursor-pointer">Client-provided (₹0)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="developer" id="hosting-developer" className="radio-primary" />
                <Label htmlFor="hosting-developer" className="cursor-pointer">Developer-managed (₹2,000)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Backend & Database */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 text-neutral-700">Backend & Database Setup</Label>
            <RadioGroup
              value={backend}
              onValueChange={setBackend}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="backend-no" className="radio-primary" />
                <Label htmlFor="backend-no" className="cursor-pointer">Not required (₹0)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="backend-yes" className="radio-primary" />
                <Label htmlFor="backend-yes" className="cursor-pointer">Required (₹5,000)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Extra Revisions */}
          <div className="mb-6">
            <Label htmlFor="revisions" className="text-sm font-medium mb-2 text-neutral-700">Extra Revisions</Label>
            <div className="flex items-center">
              <Input
                type="number"
                id="revisions"
                min="0"
                value={revisions}
                onChange={(e) => {
                  // Handle empty string and numbers properly
                  const value = e.target.value;
                  if (value === '') {
                    setRevisions(0);
                  } else {
                    setRevisions(parseInt(value));
                  }
                }}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300"
              />
              <span className="ml-2 text-sm text-neutral-500">
                {services[serviceType].revisions} included
              </span>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-neutral-900">Your Estimate</h3>
          
          <div className="space-y-4 mb-8">
            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`base-${basePrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Base Price</span>
              <span className="font-medium text-neutral-900">₹{basePrice.toLocaleString()}</span>
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`pages-${extraPagesPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Extra Pages</span>
              <span className="font-medium text-neutral-900">₹{extraPagesPrice.toLocaleString()}</span>
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`hosting-${hostingPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Hosting & Domain Setup</span>
              <span className="font-medium text-neutral-900">₹{hostingPrice.toLocaleString()}</span>
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`backend-${backendPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Backend & Database</span>
              <span className="font-medium text-neutral-900">₹{backendPrice.toLocaleString()}</span>
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`revisions-${revisionsPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Extra Revisions</span>
              <span className="font-medium text-neutral-900">₹{revisionsPrice.toLocaleString()}</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-between items-center py-4 border-t-2 border-neutral-200"
            key={`total-${totalPrice}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-semibold text-lg text-neutral-900">Total Estimate</span>
            <span className="font-bold text-2xl text-primary">₹{totalPrice.toLocaleString()}</span>
          </motion.div>
          
          <div className="mt-8">
            <Button 
              onClick={handleContactClick}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
            >
              Contact Me With This Quote
            </Button>
            <p className="text-sm text-neutral-500 mt-4 text-center">This is an estimate. Final price may vary based on specific requirements.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCalculator;
