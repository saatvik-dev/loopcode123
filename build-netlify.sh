#!/bin/bash

# Build script for Netlify deployment
echo "Building for Netlify deployment..."

# Create a simplified build using only Vite
cd client
npx vite build --outDir ../dist --emptyOutDir

# Copy netlify configuration
cp ../_redirects ../dist/

echo "Build complete! Files are in /dist directory"
echo "Ready for Netlify deployment"