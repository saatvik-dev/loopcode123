#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Starting production build test...');

try {
  // Clean previous build
  if (existsSync('dist')) {
    console.log('Cleaning previous build...');
    execSync('rm -rf dist', { stdio: 'inherit' });
  }

  // Build frontend only (faster test)
  console.log('Building frontend...');
  execSync('NODE_ENV=production npx vite build --mode production --logLevel warn', { 
    stdio: 'inherit',
    timeout: 120000 // 2 minutes timeout
  });

  console.log('Frontend build completed successfully!');
  
  // Check if build output exists
  if (!existsSync('dist/public')) {
    throw new Error('Build output directory not found');
  }
  
  if (!existsSync('dist/public/index.html')) {
    throw new Error('index.html not found in build output');
  }
  
  console.log('Build test passed! Ready for Netlify deployment.');
  
} catch (error) {
  console.error('Build test failed:', error.message);
  process.exit(1);
}