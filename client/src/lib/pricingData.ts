export type ServiceType = 
  | 'static' 
  | 'dynamic' 
  | 'business' 
  | 'portfolio' 
  | 'landing' 
  | 'blog' 
  | 'ecommerce-basic' 
  | 'ecommerce-payments' 
  | 'custom';

export interface ServicePricing {
  base: number;
  pages: number;
  extraPage: number;
  revisions: number;
  extraRevision: number;
}

export interface CurrencyPricing {
  inr: ServicePricing;
  usd: ServicePricing;
}

export const services: Record<ServiceType, CurrencyPricing> = {
  static: { 
    inr: { base: 7000, pages: 5, extraPage: 1000, revisions: 2, extraRevision: 1000 },
    usd: { base: 149, pages: 5, extraPage: 23, revisions: 2, extraRevision: 23 }
  },
  dynamic: { 
    inr: { base: 12000, pages: 5, extraPage: 2000, revisions: 3, extraRevision: 1500 },
    usd: { base: 299, pages: 5, extraPage: 45, revisions: 3, extraRevision: 38 }
  },
  business: { 
    inr: { base: 15000, pages: 7, extraPage: 3000, revisions: 3, extraRevision: 2000 },
    usd: { base: 449, pages: 7, extraPage: 68, revisions: 3, extraRevision: 53 }
  },
  portfolio: { 
    inr: { base: 6000, pages: 4, extraPage: 1000, revisions: 2, extraRevision: 1000 },
    usd: { base: 119, pages: 4, extraPage: 23, revisions: 2, extraRevision: 23 }
  },
  landing: { 
    inr: { base: 4000, pages: 1, extraPage: 1000, revisions: 1, extraRevision: 1000 },
    usd: { base: 59, pages: 1, extraPage: 15, revisions: 1, extraRevision: 15 }
  },
  blog: { 
    inr: { base: 10000, pages: 5, extraPage: 1500, revisions: 3, extraRevision: 1500 },
    usd: { base: 239, pages: 5, extraPage: 38, revisions: 3, extraRevision: 38 }
  },
  'ecommerce-basic': { 
    inr: { base: 20000, pages: 7, extraPage: 3000, revisions: 3, extraRevision: 2000 },
    usd: { base: 599, pages: 7, extraPage: 75, revisions: 3, extraRevision: 53 }
  },
  'ecommerce-payments': { 
    inr: { base: 30000, pages: 10, extraPage: 4000, revisions: 4, extraRevision: 2500 },
    usd: { base: 899, pages: 10, extraPage: 113, revisions: 4, extraRevision: 68 }
  },
  custom: { 
    inr: { base: 40000, pages: 10, extraPage: 5000, revisions: 4, extraRevision: 3000 },
    usd: { base: 1199, pages: 10, extraPage: 150, revisions: 4, extraRevision: 98 }
  }
};

export type Currency = 'inr' | 'usd';

export interface PricingTableItem {
  serviceType: string;
  basePrice: string;
  pagesIncluded: string;
  extraPageCharge: string;
  deliveryTime: string;
  includedRevisions: string;
  extraRevisionCharge: string;
}

export const currencySymbols: Record<Currency, string> = {
  inr: '₹',
  usd: '$'
};

export const formatPrice = (price: number, currency: Currency): string => {
  const symbol = currencySymbols[currency];
  return currency === 'inr' 
    ? `${symbol}${price.toLocaleString('en-IN')}` 
    : `${symbol}${price.toLocaleString('en-US')}`;
};

export const getPricingTableData = (currency: Currency): PricingTableItem[] => [
  {
    serviceType: 'Static Website',
    basePrice: formatPrice(services.static[currency].base, currency),
    pagesIncluded: '5',
    extraPageCharge: formatPrice(services.static[currency].extraPage, currency),
    deliveryTime: '7 days',
    includedRevisions: '2',
    extraRevisionCharge: formatPrice(services.static[currency].extraRevision, currency)
  },
  {
    serviceType: 'Dynamic Website',
    basePrice: formatPrice(services.dynamic[currency].base, currency),
    pagesIncluded: '5',
    extraPageCharge: formatPrice(services.dynamic[currency].extraPage, currency),
    deliveryTime: '14 days',
    includedRevisions: '3',
    extraRevisionCharge: formatPrice(services.dynamic[currency].extraRevision, currency)
  },
  {
    serviceType: 'Business Website',
    basePrice: formatPrice(services.business[currency].base, currency),
    pagesIncluded: '7',
    extraPageCharge: formatPrice(services.business[currency].extraPage, currency),
    deliveryTime: '15 days',
    includedRevisions: '3',
    extraRevisionCharge: formatPrice(services.business[currency].extraRevision, currency)
  },
  {
    serviceType: 'Portfolio Website',
    basePrice: formatPrice(services.portfolio[currency].base, currency),
    pagesIncluded: '4',
    extraPageCharge: formatPrice(services.portfolio[currency].extraPage, currency),
    deliveryTime: '7 days',
    includedRevisions: '2',
    extraRevisionCharge: formatPrice(services.portfolio[currency].extraRevision, currency)
  },
  {
    serviceType: 'Landing Page',
    basePrice: formatPrice(services.landing[currency].base, currency),
    pagesIncluded: '1',
    extraPageCharge: formatPrice(services.landing[currency].extraPage, currency),
    deliveryTime: '3 days',
    includedRevisions: '1',
    extraRevisionCharge: formatPrice(services.landing[currency].extraRevision, currency)
  },
  {
    serviceType: 'Blog Website',
    basePrice: formatPrice(services.blog[currency].base, currency),
    pagesIncluded: '5',
    extraPageCharge: formatPrice(services.blog[currency].extraPage, currency),
    deliveryTime: '14 days',
    includedRevisions: '3',
    extraRevisionCharge: formatPrice(services.blog[currency].extraRevision, currency)
  },
  {
    serviceType: 'E-commerce Basic',
    basePrice: formatPrice(services['ecommerce-basic'][currency].base, currency),
    pagesIncluded: '7',
    extraPageCharge: formatPrice(services['ecommerce-basic'][currency].extraPage, currency),
    deliveryTime: '21 days',
    includedRevisions: '3',
    extraRevisionCharge: formatPrice(services['ecommerce-basic'][currency].extraRevision, currency)
  },
  {
    serviceType: 'E-commerce with Payments',
    basePrice: formatPrice(services['ecommerce-payments'][currency].base, currency),
    pagesIncluded: '10',
    extraPageCharge: formatPrice(services['ecommerce-payments'][currency].extraPage, currency),
    deliveryTime: '30 days',
    includedRevisions: '4',
    extraRevisionCharge: formatPrice(services['ecommerce-payments'][currency].extraRevision, currency)
  },
  {
    serviceType: 'Custom Web Application',
    basePrice: `${formatPrice(services.custom[currency].base, currency)}+`,
    pagesIncluded: 'Varies',
    extraPageCharge: formatPrice(services.custom[currency].extraPage, currency),
    deliveryTime: '30+ days',
    includedRevisions: '4',
    extraRevisionCharge: formatPrice(services.custom[currency].extraRevision, currency)
  }
];
