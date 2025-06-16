# CodeCraft Web Development Platform

## Overview

This is a modern web development service platform built with React and Express.js. It serves as a professional showcase for web development services, featuring an interactive pricing calculator, portfolio showcase, blog system, and contact form functionality. The platform is designed to attract and convert potential clients for web development services in the Indian market.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight React router)
- **Animation**: Framer Motion for smooth animations
- **Form Handling**: React Hook Form with Zod validation, Netlify Forms
- **Build Tool**: Vite for fast development and optimized builds

### Deployment Architecture
- **Hosting**: Netlify (frontend-only)
- **Forms**: Netlify Forms for contact form handling
- **Asset Optimization**: Automatic bundling and minification via Vite
- **Routing**: Client-side routing with fallback to index.html

## Key Components

### 1. Service Showcase System
- Interactive service cards displaying different web development offerings
- Pricing information with page count indicators
- Service categories: Static, Dynamic, Business, Portfolio, Blog, E-commerce

### 2. Interactive Pricing Calculator
- Real-time price calculation based on user selections
- Multi-currency support (INR/USD) with automatic region detection
- Service type selection with complexity multipliers
- Additional features: hosting, backend integration, extra revisions
- WhatsApp integration for instant communication

### 3. Portfolio Management
- Project showcase with category filtering
- Technology stack display for each project
- External link integration to live projects
- Responsive image galleries

### 4. Blog System
- Content-rich blog posts with category filtering
- SEO-optimized post structure
- Read time estimation
- Tag-based categorization
- Social sharing optimization

### 5. Contact Form System
- Zod-validated contact form submissions
- Netlify Forms for serverless form handling
- Real-time form validation
- Toast notifications for user feedback

## Data Flow

### Frontend Data Flow
1. User interactions trigger React Hook Form handlers
2. Form data is validated using Zod schemas
3. TanStack Query manages API calls and caching
4. Toast notifications provide user feedback
5. Framer Motion handles page transitions and animations

### Backend Data Flow
1. Express middleware validates incoming requests
2. Zod schemas ensure data integrity
3. Drizzle ORM handles database operations
4. Error handling middleware provides consistent responses
5. Session management tracks user interactions

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Remix Icons for consistent iconography
- **Fonts**: Inter font family from Google Fonts
- **Animations**: Framer Motion for smooth transitions

### Backend Dependencies
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Store**: PostgreSQL session storage
- **Validation**: Zod for runtime type checking

### Third-party Integrations
- **WhatsApp Business API**: Direct messaging integration
- **Neon Database**: Serverless PostgreSQL hosting
- **Netlify**: Static site hosting and deployment

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server on port 5000
- **Database**: PostgreSQL with Drizzle migrations
- **Hot Reload**: Vite HMR for instant feedback

### Production Environment
- **Build Process**: Vite builds client assets, esbuild bundles server
- **Hosting**: Replit for development, Netlify for production
- **Database**: Neon serverless PostgreSQL
- **Asset Optimization**: Automatic bundling and minification

### Database Schema
```sql
-- Users table for authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 16, 2025. Initial setup
- June 16, 2025. Enhanced pricing calculator with dual currency support:
  - Added manual currency switcher with INR/USD toggle buttons
  - Implemented "Show both currencies" option for simultaneous price display
  - Enhanced location detection with debug panel and re-test functionality
  - Improved WhatsApp integration with detailed project information
  - Added comprehensive detection debugging for VPN scenarios