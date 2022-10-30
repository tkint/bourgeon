import firestore from '@react-native-firebase/firestore';

export const cols = {
  users: firestore().collection('users'),
};
