require('dotenv').config({ path: '.env.local' });

module.exports = {
    "type": "service_account",
    "project_id": process.env.VITE_FIREBASE_PROJECT_ID,
    "private_key_id": process.env.VITE_FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.VITE_PRIVATE_KEY,
    "client_email": "firebase-adminsdk-fbsvc@metrogo-ff75f.iam.gserviceaccount.com",
    "client_id": "104544725587927264614",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40metrogo-ff75f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  