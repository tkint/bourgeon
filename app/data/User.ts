import Parse from 'parse/react-native';
import { Alert } from 'react-native';

export type User = Parse.User<{}>;

export const getCurrentUser = async (): Promise<User | null> => {
  const currentUser = await Parse.User.currentAsync();
  return currentUser;
};

export const registerUser = async (input: { username: string; password: string }): Promise<boolean> => {
  try {
    await Parse.User.signUp(input.username, input.password, {});

    // Alert.alert('Success!', `User ${response.getUsername()} was successfully created!`);

    return true;
  } catch (error: any) {
    Alert.alert('Error!', error.message);
    return false;
  }
};

export const loginUser = async (input: { username: string; password: string }): Promise<boolean> => {
  try {
    await Parse.User.logIn(input.username, input.password, {});

    getCurrentUser();

    return true;
  } catch (error: any) {
    Alert.alert('Error!', error.message);
    return false;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await Parse.User.logOut();

    return true;
  } catch (error: any) {
    Alert.alert('Error!', error.message);
    return false;
  }
};
