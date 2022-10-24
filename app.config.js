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
      projectId: '476ab687-21cd-4e92-a058-4c1c927a72d4',
    },
    b4aServerUrl: process.env.B4A_SERVER_URL,
    b4aApplicationId: process.env.B4A_APPLICATION_ID,
    b4aJavascriptKey: process.env.B4A_JAVASCRIPT_KEY,
  },
};
