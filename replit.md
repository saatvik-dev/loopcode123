# CodeCraft Web Development Platform

## Overview

This is a modern web development service platform built with React and optimized for frontend-only deployment. It serves as a professional showcase for web development services, featuring an interactive pricing calculator, portfolio showcase, blog system, and terms & conditions. The platform is designed to attract and convert potential clients for web development services with automatic currency detection for the Indian and US markets.

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

### 5. WhatsApp Integration
- Direct messaging via WhatsApp Business API
- Project inquiry and consultation routing
- Automatic currency and project information sharing

## Data Flow

### Frontend Data Flow
1. User interactions trigger component state updates
2. Currency detection automatically sets pricing display
3. WhatsApp integration handles project inquiries
4. Pricing calculator provides real-time cost estimates
5. Framer Motion handles smooth page transitions and animations

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Remix Icons for consistent iconography
- **Fonts**: Inter font family from Google Fonts
- **Animations**: Framer Motion for smooth transitions

### Third-party Integrations
- **WhatsApp Business API**: Direct messaging integration
- **Netlify**: Static site hosting and deployment
- **IP Geolocation APIs**: Automatic currency detection (ipapi.co, ipinfo.io, freegeoip.app, db-ip.com)

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server (will be updated to port 5173)
- **Hot Reload**: Vite HMR for instant feedback
- **Form Testing**: Netlify Forms integration

### Production Environment
- **Build Process**: Vite builds static assets
- **Hosting**: Netlify static hosting
- **Forms**: Netlify Forms for contact submissions
- **Asset Optimization**: Automatic bundling and minification via Vite

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
- June 16, 2025. Complete conversion to frontend-only architecture:
  - Removed all backend dependencies and Express.js server
  - Eliminated contact form in favor of WhatsApp integration
  - Optimized for Netlify deployment with proper caching headers
  - Fixed unhandled promise rejections in currency detection
  - Added comprehensive error handling for IP geolocation APIs
  - Configured frontend-only routing with client-side fallbacks