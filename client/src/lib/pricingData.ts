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

export const services: Record<ServiceType, ServicePricing> = {
  static: { base: 7000, pages: 5, extraPage: 1000, revisions: 2, extraRevision: 1000 },
  dynamic: { base: 12000, pages: 5, extraPage: 2000, revisions: 3, extraRevision: 1500 },
  business: { base: 15000, pages: 7, extraPage: 3000, revisions: 3, extraRevision: 2000 },
  portfolio: { base: 6000, pages: 4, extraPage: 1000, revisions: 2, extraRevision: 1000 },
  landing: { base: 4000, pages: 1, extraPage: 1000, revisions: 1, extraRevision: 1000 },
  blog: { base: 10000, pages: 5, extraPage: 1500, revisions: 3, extraRevision: 1500 },
  'ecommerce-basic': { base: 20000, pages: 7, extraPage: 3000, revisions: 3, extraRevision: 2000 },
  'ecommerce-payments': { base: 30000, pages: 10, extraPage: 4000, revisions: 4, extraRevision: 2500 },
  custom: { base: 40000, pages: 10, extraPage: 5000, revisions: 4, extraRevision: 3000 }
};

export interface PricingTableItem {
  serviceType: string;
  basePrice: string;
  pagesIncluded: string;
  extraPageCharge: string;
  deliveryTime: string;
  includedRevisions: string;
  extraRevisionCharge: string;
}

export const pricingTableData: PricingTableItem[] = [
  {
    serviceType: 'Static Website',
    basePrice: '7,000',
    pagesIncluded: '5',
    extraPageCharge: '1,000',
    deliveryTime: '7 days',
    includedRevisions: '2',
    extraRevisionCharge: '1,000'
  },
  {
    serviceType: 'Dynamic Website',
    basePrice: '12,000',
    pagesIncluded: '5',
    extraPageCharge: '2,000',
    deliveryTime: '14 days',
    includedRevisions: '3',
    extraRevisionCharge: '1,500'
  },
  {
    serviceType: 'Business Website',
    basePrice: '15,000',
    pagesIncluded: '7',
    extraPageCharge: '3,000',
    deliveryTime: '15 days',
    includedRevisions: '3',
    extraRevisionCharge: '2,000'
  },
  {
    serviceType: 'Portfolio Website',
    basePrice: '6,000',
    pagesIncluded: '4',
    extraPageCharge: '1,000',
    deliveryTime: '7 days',
    includedRevisions: '2',
    extraRevisionCharge: '1,000'
  },
  {
    serviceType: 'Landing Page',
    basePrice: '4,000',
    pagesIncluded: '1',
    extraPageCharge: '1,000',
    deliveryTime: '3 days',
    includedRevisions: '1',
    extraRevisionCharge: '1,000'
  },
  {
    serviceType: 'Blog Website',
    basePrice: '10,000',
    pagesIncluded: '5',
    extraPageCharge: '1,500',
    deliveryTime: '14 days',
    includedRevisions: '3',
    extraRevisionCharge: '1,500'
  },
  {
    serviceType: 'E-commerce Basic',
    basePrice: '20,000',
    pagesIncluded: '7',
    extraPageCharge: '3,000',
    deliveryTime: '21 days',
    includedRevisions: '3',
    extraRevisionCharge: '2,000'
  },
  {
    serviceType: 'E-commerce with Payments',
    basePrice: '30,000',
    pagesIncluded: '10',
    extraPageCharge: '4,000',
    deliveryTime: '30 days',
    includedRevisions: '4',
    extraRevisionCharge: '2,500'
  },
  {
    serviceType: 'Custom Web Application',
    basePrice: '40,000+',
    pagesIncluded: 'Varies',
    extraPageCharge: '5,000',
    deliveryTime: '30+ days',
    includedRevisions: '4',
    extraRevisionCharge: '3,000'
  }
];
