import { build } from 'vite';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Building frontend...');

try {
  // Build frontend
  await build({
    configFile: resolve(__dirname, 'vite.config.ts'),
    mode: 'production',
    logLevel: 'info'
  });
  
  console.log('Frontend build completed successfully!');
  
  // Build backend
  console.log('Building backend...');
  const esbuildProcess = spawn('npx', [
    'esbuild', 
    'server/index.ts', 
    '--platform=node', 
    '--packages=external', 
    '--bundle', 
    '--format=esm', 
    '--outdir=dist',
    '--minify'
  ], { stdio: 'inherit' });
  
  esbuildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Backend build completed successfully!');
      console.log('Production build ready for deployment!');
    } else {
      console.error('Backend build failed with code', code);
      process.exit(1);
    }
  });
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}