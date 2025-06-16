import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { services, ServiceType, Currency, ServicePricing, formatPrice, currencySymbols } from '@/lib/pricingData';

const PricingCalculator = () => {
  // Currency state with automatic detection
  const [currency, setCurrency] = useState<Currency>('inr');
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  
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

  // Auto-detect user's currency based on IP location
  useEffect(() => {
    if (!isLocationDetected) {
      const detectCurrency = async () => {
        try {
          // Try multiple IP detection services
          const ipServices = [
            'https://ipapi.co/json/',
            'https://ipinfo.io/json',
            'https://freegeoip.app/json/',
            'https://api.db-ip.com/v2/free/self'
          ];

          for (const service of ipServices) {
            try {
              const response = await fetch(service);
              const data = await response.json();
              
              // Normalize country detection across different API response formats
              const countryCode = data.country_code || data.countryCode || data.country_code2;
              const country = data.country || data.country_name || data.countryName;
              
              // Check for US/USD
              if (countryCode === 'US' || 
                  country === 'United States' || 
                  country === 'USA') {
                setCurrency('usd');
                setIsLocationDetected(true);
                return;
              }
              
              // Check for India/INR
              if (countryCode === 'IN' || 
                  country === 'India') {
                setCurrency('inr');
                setIsLocationDetected(true);
                return;
              }
              
              // For other countries, default to USD
              if (countryCode) {
                setCurrency('usd');
                setIsLocationDetected(true);
                return;
              }
            } catch (serviceError) {
              continue;
            }
          }

          // Default fallback
          setCurrency('inr');
          setIsLocationDetected(true);
        } catch (error) {
          setCurrency('inr');
          setIsLocationDetected(true);
        }
      };

      detectCurrency();
    }
  }, [isLocationDetected]);

  useEffect(() => {
    // Update included pages and revisions when service type changes
    const service = services[serviceType][currency] as ServicePricing;
    setPagesCount(service.pages);
  }, [serviceType, currency]);

  useEffect(() => {
    // Recalculate prices whenever inputs change
    const service = services[serviceType][currency] as ServicePricing;
    const extraPages = Math.max(0, pagesCount - service.pages);
    const extraPageCost = extraPages * service.extraPage * complexityMultipliers[complexity];
    const hostingCost = hosting === 'developer' ? (currency === 'inr' ? 2000 : 24) : 0;
    const backendCost = backend === 'yes' ? (currency === 'inr' ? 5000 : 60) : 0;
    const extraRevisionsCost = revisions * service.extraRevision;

    setBasePrice(service.base);
    setExtraPagesPrice(extraPageCost);
    setHostingPrice(hostingCost);
    setBackendPrice(backendCost);
    setRevisionsPrice(extraRevisionsCost);

    setTotalPrice(service.base + extraPageCost + hostingCost + backendCost + extraRevisionsCost);
  }, [serviceType, pagesCount, complexity, hosting, backend, revisions, currency]);

  const handleContactClick = () => {
    const whatsappNumber = "917093764745";
    const message = encodeURIComponent(
      `Hi there! I'm interested in your web development services.\n\n` +
      `Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Website\n` +
      `Pages: ${pagesCount}\n` +
      `Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}\n` +
      `Estimated Price: ${formatPrice(totalPrice, currency)}\n\n` +
      `Can we discuss this project further?`
    );
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
                <SelectItem value="static">Static Website</SelectItem>
                <SelectItem value="dynamic">Dynamic Website</SelectItem>
                <SelectItem value="business">Business Website</SelectItem>
                <SelectItem value="portfolio">Portfolio Website</SelectItem>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="blog">Blog Website</SelectItem>
                <SelectItem value="ecommerce-basic">E-commerce Basic</SelectItem>
                <SelectItem value="ecommerce-payments">E-commerce with Payments</SelectItem>
                <SelectItem value="custom">Custom Web Application</SelectItem>
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
                {(services[serviceType][currency] as ServicePricing).pages} included
              </span>
            </div>
          </div>

          {/* Complexity Level */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 text-neutral-700">Complexity Level</Label>
            <RadioGroup
              value={complexity}
              onValueChange={setComplexity}
              className="gap-2 flex flex-col space-y-2 mt-[9px] mb-[9px]"
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
              className="gap-2 flex flex-col space-y-2 mt-[9px] mb-[9px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="hosting-client" className="radio-primary" />
                <Label htmlFor="hosting-client" className="cursor-pointer">Client-provided ({formatPrice(0, currency)})</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="developer" id="hosting-developer" className="radio-primary" />
                <Label htmlFor="hosting-developer" className="cursor-pointer">Developer-managed ({formatPrice(currency === 'inr' ? 2000 : 24, currency)})</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Backend & Database */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 text-neutral-700">Backend & Database Setup</Label>
            <RadioGroup
              value={backend}
              onValueChange={setBackend}
              className="gap-2 flex flex-col space-y-2 mt-[9px] mb-[9px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="backend-no" className="radio-primary" />
                <Label htmlFor="backend-no" className="cursor-pointer">Not required ({formatPrice(0, currency)})</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="backend-yes" className="radio-primary" />
                <Label htmlFor="backend-yes" className="cursor-pointer">Required ({formatPrice(currency === 'inr' ? 5000 : 60, currency)})</Label>
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
                {(services[serviceType][currency] as ServicePricing).revisions} included
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
              <span className="font-medium text-neutral-900">{formatPrice(basePrice, currency)}</span>
            </motion.div>

            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`pages-${extraPagesPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Extra Pages</span>
              <span className="font-medium text-neutral-900">{formatPrice(extraPagesPrice, currency)}</span>
            </motion.div>

            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`hosting-${hostingPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Hosting & Domain Setup</span>
              <span className="font-medium text-neutral-900">{formatPrice(hostingPrice, currency)}</span>
            </motion.div>

            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`backend-${backendPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Backend & Database</span>
              <span className="font-medium text-neutral-900">{formatPrice(backendPrice, currency)}</span>
            </motion.div>

            <motion.div 
              className="flex justify-between items-center pb-2 border-b border-neutral-200"
              key={`revisions-${revisionsPrice}`}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-700">Extra Revisions</span>
              <span className="font-medium text-neutral-900">{formatPrice(revisionsPrice, currency)}</span>
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
            <span className="font-bold text-2xl text-primary">{formatPrice(totalPrice, currency)}</span>
          </motion.div>

          <div className="mt-8">
            <Button 
              onClick={handleContactClick}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
            >Contact Us With This Quote</Button>
            <p className="text-sm text-neutral-500 mt-4 text-center">This is an estimate. Final price may vary based on specific requirements.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCalculator;