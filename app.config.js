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
  android: {
    package: 'net.easydaisy',
    adaptiveIcon: {
      foregroundImage: './app/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    googleServicesFile: './google-services.json',
  },
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: './app/assets/images/favicon.png',
  },
  plugins: ['@react-native-firebase/app'],
  extra: {
    eas: {
      projectId: 'bf20f214-e27d-470b-91d0-c779563cf5de',
    },
  },
};
