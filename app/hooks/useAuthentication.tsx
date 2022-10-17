import Parse from 'parse/react-native';
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { ThemeNameOrAuto } from './useTheme';
import { UnitSystem } from './useUnits';

export interface User {
  username?: string;
  preferences?: User.Preferences;
}

export namespace User {
  export interface Preferences {
    theme?: ThemeNameOrAuto;
    unitSystem?: UnitSystem;
  }
}

type ParseUser = Parse.User<{
  preferences?: User.Preferences;
}>;

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
  register: (input: { username: string; password: string }) => Promise<boolean>;
  login: (input: { username: string; password: string }) => Promise<boolean>;
  logout: () => Promise<boolean>;
  setPreference: <T extends keyof User.Preferences>(key: T, value: User.Preferences[T]) => Promise<void>;
};

export const useAuthentication = (): UseAuthenticationReturn => {
  const { currentUser, setCurrentUser } = useContext(AuthenticationContext);

  const setCurrentParseUser = (user: ParseUser) => setCurrentUser(mapParseUser(user));

  return {
    currentUser,

    register: async (input) => {
      try {
        const parseUser: ParseUser = await Parse.User.signUp(input.username, input.password, {});

        setCurrentParseUser(parseUser);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    login: async (input) => {
      try {
        const parseUser: ParseUser = await Parse.User.logIn(input.username, input.password, {});

        setCurrentParseUser(parseUser);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    logout: async () => {
      try {
        await Parse.User.logOut();

        setCurrentUser(undefined);

        return true;
      } catch (error: any) {
        Alert.alert('Error!', error.message);
        return false;
      }
    },

    setPreference: async (key, value) => {
      const parseUser = await getCurrentParseUser();
      if (parseUser) {
        try {
          parseUser.set('preferences', {
            ...parseUser.get('preferences'),
            [key]: value,
          });

          setCurrentParseUser(parseUser);

          parseUser.save();
        } catch (error: any) {
          Alert.alert('Error!', error.message);
        }
      } else {
        Alert.alert('Impossible to set preference when not logged in');
      }
    },
  };
};

export const getCurrentUser = async (): Promise<User | undefined> => {
  const currentUser = await getCurrentParseUser();
  return currentUser && mapParseUser(currentUser);
};

const getCurrentParseUser = async (): Promise<ParseUser | undefined> => {
  try {
    const currentUser: ParseUser | null = await Parse.User.currentAsync();
    return currentUser || undefined;
  } catch {
    return undefined;
  }
};

const mapParseUser = (user: ParseUser): User => ({
  username: user.getUsername(),
  preferences: user.get('preferences'),
});
