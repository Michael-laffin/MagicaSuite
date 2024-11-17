const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setupSentry() {
  console.log(`
Sentry Setup Instructions:

1. Go to https://sentry.io/signup/ and create an account if you haven't already
2. Create a new project for Node.js
3. You'll receive a DSN (Data Source Name) that looks like:
   https://<key>@<organization>.ingest.sentry.io/<project>
4. Copy this DSN as we'll need it in the next step
  `);

  try {
    const dsn = await question('Please enter your Sentry DSN (or press enter to skip): ');
    
    if (dsn) {
      // Update .env file with Sentry DSN
      const envPath = path.join(__dirname, '..', '.env');
      let envContent = await fs.readFile(envPath, 'utf8');
      
      // Replace existing Sentry DSN or add new one
      if (envContent.includes('SENTRY_DSN=')) {
        envContent = envContent.replace(/SENTRY_DSN=.*/, `SENTRY_DSN=${dsn}`);
      } else {
        envContent += `\nSENTRY_DSN=${dsn}\n`;
      }
      
      await fs.writeFile(envPath, envContent);
      console.log('Sentry DSN has been added to your .env file');
    } else {
      console.log('Skipping Sentry DSN configuration');
    }

    console.log(`
Additional Sentry Setup Steps:

1. Configure Error Monitoring:
   - All unhandled exceptions will be automatically captured
   - Custom error tracking is available using Sentry.captureException()
   - Performance monitoring is enabled by default

2. Best Practices:
   - Use Sentry.setUser() to track user context
   - Add custom tags for better error filtering
   - Set up alert rules in the Sentry dashboard
   - Configure error grouping rules as needed

3. Environment Variables:
   - Make sure NODE_ENV is set correctly
   - Consider setting different Sentry DSNs for dev/prod

4. Dashboard Setup:
   - Set up team members and notifications
   - Configure integration with your issue tracker
   - Set up custom alerts and workflows
    `);

  } catch (error) {
    console.error('Error setting up Sentry:', error);
  } finally {
    rl.close();
  }
}

setupSentry();
