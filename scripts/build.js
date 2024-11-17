import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

try {
  console.log('🚀 Starting production build process...');

  // Clean the dist directory
  console.log('📦 Cleaning dist directory...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // Run the build
  console.log('🛠 Building the application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create _redirects file for Netlify
  console.log('📝 Creating Netlify redirects...');
  fs.writeFileSync(
    path.join('dist', '_redirects'),
    `/*    /index.html   200\n`
  );

  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
