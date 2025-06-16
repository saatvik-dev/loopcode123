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
  const [showBothCurrencies, setShowBothCurrencies] = useState(true);
  const [detectionDetails, setDetectionDetails] = useState<{
    timezone?: string;
    detectionMethod?: string;
    ipData?: any;
    error?: string;
  }>({});
  
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

  // Helper function to calculate prices for both currencies
  const calculatePricesForBothCurrencies = () => {
    const results: Record<Currency, any> = {} as any;
    
    (['inr', 'usd'] as Currency[]).forEach(curr => {
      const service = services[serviceType][curr] as ServicePricing;
      const extraPages = Math.max(0, pagesCount - service.pages);
      const extraPageCost = extraPages * service.extraPage * complexityMultipliers[complexity];
      const hostingCost = hosting === 'developer' ? (curr === 'inr' ? 2000 : 24) : 0;
      const backendCost = backend === 'yes' ? (curr === 'inr' ? 5000 : 60) : 0;
      const extraRevisionsCost = revisions * service.extraRevision;
      
      results[curr] = {
        basePrice: service.base,
        extraPagesPrice: extraPageCost,
        hostingPrice: hostingCost,
        backendPrice: backendCost,
        revisionsPrice: extraRevisionsCost,
        totalPrice: service.base + extraPageCost + hostingCost + backendCost + extraRevisionsCost
      };
    });
    
    return results;
  };

  const bothCurrencyPrices = calculatePricesForBothCurrencies();

  // Auto-detect user's currency based on location
  useEffect(() => {
    if (!isLocationDetected) {
      console.log('Starting currency detection...');
      
      // IP-based detection only
      const detectCurrency = async () => {
        try {
          // Get timezone for debug info only (not for detection)
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          console.log('User timezone (debug only):', timezone);
          setDetectionDetails(prev => ({ ...prev, timezone }));

          // Try multiple IP detection services
          const ipServices = [
            'https://ipapi.co/json/',
            'https://api.ipgeolocation.io/ipgeo?apiKey=',
            'https://freegeoip.app/json/',
            'https://ipinfo.io/json',
            'https://api.db-ip.com/v2/free/self'
          ];

          for (const service of ipServices) {
            try {
              console.log('Trying IP service:', service);
              const response = await fetch(service);
              const data = await response.json();
              console.log('IP service response:', data);
              
              setDetectionDetails(prev => ({ ...prev, ipData: data }));
              
              // Normalize country detection across different API response formats
              const countryCode = data.country_code || data.countryCode || data.country_code2;
              const country = data.country || data.country_name || data.countryName;
              const continent = data.continent_code || data.continentCode;
              
              console.log('Detected country info:', { countryCode, country, continent });
              
              // Check for US/USD
              if (countryCode === 'US' || 
                  country === 'United States' || 
                  country === 'USA' ||
                  continent === 'NA') {
                console.log('Setting USD based on IP detection');
                setCurrency('usd');
                setDetectionDetails(prev => ({ ...prev, detectionMethod: `IP Location (US via ${service.split('/')[2]})` }));
                setIsLocationDetected(true);
                return;
              }
              
              // Check for India/INR
              if (countryCode === 'IN' || 
                  country === 'India') {
                console.log('Setting INR based on IP detection');
                setCurrency('inr');
                setDetectionDetails(prev => ({ ...prev, detectionMethod: `IP Location (India via ${service.split('/')[2]})` }));
                setIsLocationDetected(true);
                return;
              }
              
              // For other countries, continue trying other services
              console.log('Non-target location detected, trying next service:', { countryCode, country });
              setDetectionDetails(prev => ({ 
                ...prev, 
                detectionMethod: `Other location detected: ${country || countryCode || 'Unknown'}` 
              }));
            } catch (serviceError) {
              console.log('IP service failed:', service, serviceError);
              setDetectionDetails(prev => ({ 
                ...prev, 
                error: `IP service failed: ${serviceError instanceof Error ? serviceError.message : 'Unknown error'}` 
              }));
              continue;
            }
          }

          // No IP detection worked, use default
          console.log('IP detection failed, using default INR');
          setCurrency('inr');
          setDetectionDetails(prev => ({ ...prev, detectionMethod: 'Default (IP detection failed)' }));
          
        } catch (error) {
          console.log('All detection methods failed:', error);
          setDetectionDetails(prev => ({ 
            ...prev, 
            error: error instanceof Error ? error.message : 'Unknown error', 
            detectionMethod: 'Detection Failed' 
          }));
          setCurrency('inr'); // Keep default
        } finally {
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
    const currentTotal = bothCurrencyPrices[currency].totalPrice;
    const otherCurrency = currency === 'inr' ? 'usd' : 'inr';
    const otherTotal = bothCurrencyPrices[otherCurrency].totalPrice;
    
    let priceMessage = `${formatPrice(currentTotal, currency)}`;
    if (showBothCurrencies) {
      priceMessage += ` (${formatPrice(otherTotal, otherCurrency)})`;
    }
    
    const message = encodeURIComponent(
      `Hi there! I'm interested in your web development services.\n\n` +
      `Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Website\n` +
      `Pages: ${pagesCount}\n` +
      `Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}\n` +
      `Estimated Price: ${priceMessage}\n\n` +
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

          {/* Currency Switcher */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-neutral-700">
                Currency & Display Options
              </Label>
              {isLocationDetected && (
                <Badge variant="secondary" className="text-xs">
                  Auto-detected: {currency.toUpperCase()}
                </Badge>
              )}
            </div>
            
            {/* Currency Toggle Buttons */}
            <div className="flex gap-2 mb-3">
              <Button
                type="button"
                variant={currency === 'inr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrency('inr')}
                className="flex-1"
              >
                🇮🇳 INR (₹)
              </Button>
              <Button
                type="button"
                variant={currency === 'usd' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrency('usd')}
                className="flex-1"
              >
                🇺🇸 USD ($)
              </Button>
            </div>

            {/* Show Both Currencies Toggle */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="showBoth" 
                checked={showBothCurrencies}
                onChange={(e) => setShowBothCurrencies(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="showBoth" className="text-sm text-neutral-600 cursor-pointer">
                Show prices in both currencies
              </Label>
            </div>
            
            {!isLocationDetected && (
              <p className="text-xs text-neutral-500 mt-2">
                Using VPN? Currency auto-detection may be inaccurate.
              </p>
            )}
            
            {/* Debug Information Panel */}
            <div className="mt-3 p-3 bg-neutral-50 rounded-lg border text-xs space-y-2">
              <div className="font-medium text-neutral-700">Detection Details:</div>
              <div><span className="font-medium">Timezone:</span> {detectionDetails.timezone || 'Not detected'}</div>
              <div><span className="font-medium">Method:</span> {detectionDetails.detectionMethod || 'Detecting...'}</div>
              {detectionDetails.ipData && (
                <div>
                  <span className="font-medium">IP Data:</span> 
                  {detectionDetails.ipData.country && ` ${detectionDetails.ipData.country}`}
                  {detectionDetails.ipData.country_code && ` (${detectionDetails.ipData.country_code})`}
                  {detectionDetails.ipData.city && ` - ${detectionDetails.ipData.city}`}
                </div>
              )}
              {detectionDetails.error && (
                <div className="text-red-600">
                  <span className="font-medium">Error:</span> {detectionDetails.error}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsLocationDetected(false);
                    setDetectionDetails({});
                  }}
                  className="text-xs px-2 py-1"
                >
                  Re-test Detection
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(detectionDetails, null, 2));
                    toast({
                      title: "Debug info copied",
                      description: "Detection details copied to clipboard",
                      duration: 2000,
                    });
                  }}
                  className="text-xs px-2 py-1"
                >
                  Copy Debug Info
                </Button>
              </div>
            </div>
          </div>

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
            {/* Price Breakdown Components */}
            {[
              { label: 'Base Price', key: 'basePrice' },
              { label: 'Extra Pages', key: 'extraPagesPrice' },
              { label: 'Hosting & Domain Setup', key: 'hostingPrice' },
              { label: 'Backend & Database', key: 'backendPrice' },
              { label: 'Extra Revisions', key: 'revisionsPrice' }
            ].map(({ label, key }) => (
              <motion.div 
                className="flex justify-between items-center pb-2 border-b border-neutral-200"
                key={`${key}-${bothCurrencyPrices[currency][key]}`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-neutral-700">{label}</span>
                <div className="text-right">
                  <span className="font-medium text-neutral-900">
                    {formatPrice(bothCurrencyPrices[currency][key], currency)}
                  </span>
                  {showBothCurrencies && (
                    <div className="text-xs text-neutral-500 mt-1">
                      {currency === 'inr' 
                        ? formatPrice(bothCurrencyPrices.usd[key], 'usd')
                        : formatPrice(bothCurrencyPrices.inr[key], 'inr')
                      }
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex justify-between items-center py-4 border-t-2 border-neutral-200"
            key={`total-${bothCurrencyPrices[currency].totalPrice}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-semibold text-lg text-neutral-900">Total Estimate</span>
            <div className="text-right">
              <span className="font-bold text-2xl text-primary">
                {formatPrice(bothCurrencyPrices[currency].totalPrice, currency)}
              </span>
              {showBothCurrencies && (
                <div className="text-sm text-neutral-600 mt-1">
                  {currency === 'inr' 
                    ? formatPrice(bothCurrencyPrices.usd.totalPrice, 'usd')
                    : formatPrice(bothCurrencyPrices.inr.totalPrice, 'inr')
                  }
                </div>
              )}
            </div>
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