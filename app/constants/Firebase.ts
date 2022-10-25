import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/react-native';
import { collection, getFirestore } from 'firebase/firestore';

const app = initializeApp({
  projectId: Constants.expoConfig?.extra?.projectId,
  appId: Constants.expoConfig?.extra?.appId,
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  measurementId: Constants.expoConfig?.extra?.measurementId,
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export const cols = {
  users: collection(db, 'users'),
};
