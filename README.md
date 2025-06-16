# CodeCraft Web Development Platform

A modern, frontend-only web development service platform optimized for Netlify deployment.

## Features

- **Interactive Pricing Calculator** - Real-time project cost estimation
- **Portfolio Showcase** - Dynamic project filtering and display
- **Blog System** - Content-rich blog with category filtering
- **Automatic Currency Detection** - INR/USD pricing based on user location
- **WhatsApp Integration** - Direct client communication
- **Responsive Design** - Mobile-first approach with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with shadcn/ui components
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **Vite** for development and building

## Deployment to Netlify

### Prerequisites
- Node.js 18+
- npm or yarn
- Netlify account

### Build Commands
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Netlify Configuration

The project includes optimized `netlify.toml` configuration with:
- Asset caching for optimal performance
- Security headers
- Client-side routing fallbacks
- Build optimization settings

### Environment Variables
No environment variables required - fully frontend-only deployment.

### Deployment Steps

1. **Via Netlify Dashboard:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy

2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Development

```bash
# Start development server
npm run dev

# Type checking
npm run check
```

## Performance Optimizations

- **Lazy Loading** - Components and routes load on demand
- **Image Optimization** - Responsive images with proper sizing
- **Code Splitting** - Automatic bundle splitting for optimal loading
- **Caching Strategy** - Long-term caching for static assets
- **Minification** - CSS and JavaScript optimization

## SEO Features

- Meta tags for social sharing
- Structured data markup
- Semantic HTML structure
- Fast loading times
- Mobile-responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.