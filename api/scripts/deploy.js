const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function executeCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    process.exit(1);
  }
}

function checkRequiredFiles() {
  const required = [
    '../.env',
    '../config/firebase-service-account.json'
  ];

  for (const file of required) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing required file: ${file}`);
      process.exit(1);
    }
  }
}

function validateEnvVariables() {
  const required = [
    'NODE_ENV',
    'PORT',
    'API_KEY',
    'CORS_ORIGIN',
    'FIREBASE_PROJECT_ID',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'SENTRY_DSN',
    'REDIS_URL',
    'SESSION_SECRET'
  ];

  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = Object.fromEntries(
    envContent
      .split('\n')
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('='))
  );

  const missing = required.filter(key => !envVars[key]);
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing.join(', '));
    process.exit(1);
  }
}

async function deploy() {
  console.log('Starting deployment process...');

  // Check required files
  console.log('Checking required files...');
  checkRequiredFiles();

  // Validate environment variables
  console.log('Validating environment variables...');
  validateEnvVariables();

  // Install dependencies
  console.log('Installing dependencies...');
  executeCommand('npm ci --production');

  // Run tests
  console.log('Running tests...');
  executeCommand('npm test');

  // Build application (if needed)
  console.log('Building application...');
  executeCommand('npm run build');

  console.log(`
Deployment Checklist:

1. Database Migration:
   - Backup your database
   - Run migrations if needed
   - Verify data integrity

2. Redis Setup:
   - Ensure Redis is running and accessible
   - Verify connection string in .env
   - Test cache operations

3. Monitoring Setup:
   - Verify Sentry is receiving events
   - Check logging configuration
   - Set up monitoring alerts

4. Security:
   - Verify SSL certificates
   - Check API key restrictions
   - Review CORS settings
   - Test rate limiting

5. Load Testing:
   - Run performance tests
   - Check memory usage
   - Verify error handling

6. Backup:
   - Create deployment backup
   - Document rollback procedure
   - Test restore process

7. Documentation:
   - Update API documentation
   - Document new features
   - Update changelog

Please complete these steps before proceeding with the deployment.
  `);
}

deploy().catch(console.error);
