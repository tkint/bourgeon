import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { cols } from '../constants/Firebase';
import { ThemeNameOrAuto } from './useTheme';
import { UnitSystem } from './useUnits';

type AuthUser = FirebaseAuthTypes.User;

export interface User {
  uid: string;
  email?: string;
  preferences?: User.Preferences;
}

export namespace User {
  export interface Preferences {
    theme?: ThemeNameOrAuto;
    unitSystem?: UnitSystem;
  }
}

interface FirebaseUser {
  preferences?: User.Preferences;
}

type AuthenticationContextValue = {
  currentUser?: User;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
};

const AuthenticationContext = createContext<AuthenticationContextValue>(null as any);

export const AuthenticationProvider: FC<{
  initialValue: User | undefined;
  children: ReactNode;
}> = (props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(props.initialValue);

  const contextValue: AuthenticationContextValue = {
    currentUser,
    setCurrentUser,
  };

  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>;
};

type UseAuthenticationReturn = {
  currentUser?: User;
  register: (input: { email: string; password: string }) => Promise<boolean>;
  login: (input: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setPreference: <T extends keyof User.Preferences>(key: T, value: User.Preferences[T]) => Promise<void>;
};

export const useAuthentication = (): UseAuthenticationReturn => {
  const { currentUser, setCurrentUser } = useContext(AuthenticationContext);

  const setAuthUser = async (auth: AuthUser) => {
    const user = await getFirebaseUser(auth.uid);
    setCurrentUser(mapFirebaseUser(auth, user));
  };

  return {
    currentUser,

    register: async (input) => {
      try {
        const { user: authUser } = await auth().createUserWithEmailAndPassword(input.email, input.password);

        await setAuthUser(authUser);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    login: async (input) => {
      try {
        const { user: authUser } = await auth().signInWithEmailAndPassword(input.email, input.password);

        await setAuthUser(authUser);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    logout: async () => {
      try {
        await auth().signOut();

        setCurrentUser(undefined);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    setPreference: async (key, value) => {
      if (currentUser) {
        try {
          const newPreferences = {
            ...currentUser.preferences,
            [key]: value,
          };
          setCurrentUser({
            ...currentUser,
            preferences: newPreferences,
          });

          await saveFirebaseUser(currentUser.uid, {
            preferences: newPreferences,
          });
        } catch (error: any) {
          Alert.alert('Error ! ', error.message);
        }
      } else {
        Alert.alert('Impossible to set preference when not logged in');
      }
    },
  };
};

export const getCurrentUser = async (): Promise<User | undefined> => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const metadata = await getFirebaseUser(currentUser.uid);
    return mapFirebaseUser(currentUser, metadata);
  }
  return undefined;
};

const saveFirebaseUser = async (uid: string, user: FirebaseUser): Promise<void> => {
  await cols.users.doc(uid).set(user);
};

const getFirebaseUser = async (uid: string): Promise<FirebaseUser | undefined> => {
  const docSnap = await cols.users.doc(uid).get();

  if (docSnap.exists) {
    return docSnap.data();
  }
  return undefined;
};

const mapFirebaseUser = (auth: AuthUser, firebaseUser: FirebaseUser | undefined): User => ({
  uid: auth.uid,
  email: auth.email || undefined,
  preferences: firebaseUser?.preferences,
});
