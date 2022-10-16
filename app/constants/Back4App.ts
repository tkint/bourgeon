import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import Constants from 'expo-constants';

export const CONFIG = {
  serverUrl: Constants.expoConfig?.extra?.b4aServerUrl,
  applicationId: Constants.expoConfig?.extra?.b4aApplicationId,
  javascriptKey: Constants.expoConfig?.extra?.b4aJavascriptKey,
};

export const initBack4App = () => {
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(CONFIG.applicationId, CONFIG.javascriptKey);
  Parse.serverURL = CONFIG.serverUrl;
};
