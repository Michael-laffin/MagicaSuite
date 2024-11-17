const fs = require('fs').promises;
const path = require('path');

async function setupFirebase() {
  const configDir = path.join(__dirname, '..', 'config');
  const serviceAccountPath = path.join(configDir, 'firebase-service-account.json');

  try {
    // Create config directory if it doesn't exist
    await fs.mkdir(configDir, { recursive: true });

    // Check if service account file exists
    try {
      await fs.access(serviceAccountPath);
      console.log('Firebase service account file already exists');
    } catch {
      // Create a template service account file
      const templateServiceAccount = {
        "type": "service_account",
        "project_id": "magicasuite",
        "private_key_id": "your-private-key-id",
        "private_key": "your-private-key",
        "client_email": "firebase-adminsdk-xxxxx@magicasuite.iam.gserviceaccount.com",
        "client_id": "your-client-id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40magicasuite.iam.gserviceaccount.com"
      };

      await fs.writeFile(
        serviceAccountPath,
        JSON.stringify(templateServiceAccount, null, 2)
      );

      console.log(`
Firebase setup instructions:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: magicasuite
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Copy the contents of the downloaded file
6. Replace the contents of ${serviceAccountPath} with the copied content

Note: Keep your service account key secure and never commit it to version control!
      `);
    }

    // Create .gitignore if it doesn't exist
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    try {
      const gitignore = await fs.readFile(gitignorePath, 'utf8');
      if (!gitignore.includes('config/firebase-service-account.json')) {
        await fs.appendFile(gitignorePath, '\n# Firebase\nconfig/firebase-service-account.json\n');
      }
    } catch {
      await fs.writeFile(gitignorePath, '# Firebase\nconfig/firebase-service-account.json\n');
    }

    console.log('Firebase setup completed successfully!');
  } catch (error) {
    console.error('Error setting up Firebase:', error);
    process.exit(1);
  }
}

setupFirebase();
