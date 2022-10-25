if (!process.env.EAS_BUILD) {
  require('dotenv').config();
}

export default {
  name: 'EasyDaisy',
  slug: 'easy-daisy',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './app/assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './app/assets/images/splash_1.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './app/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'net.easydaisy',
  },
  web: {
    favicon: './app/assets/images/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'bf20f214-e27d-470b-91d0-c779563cf5de',
    },
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
};
