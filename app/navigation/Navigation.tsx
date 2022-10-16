/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import * as React from 'react';
import { RootStackParamList } from '../../types';
import { usePreference } from '../hooks/usePreferences';
import { RootNavigator } from './RootNavigator';

export const Navigation: React.FunctionComponent<{ user: Parse.User | null }> = (props) => {
  const { theme } = usePreference('theme');

  return (
    <NavigationContainer linking={Linking} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator user={props.user} />
    </NavigationContainer>
  );
};

const Linking: LinkingOptions<RootStackParamList> = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      SignIn: 'signin',
      SignUp: 'signup',
      Root: {
        screens: {
          Reminders: {
            screens: {
              RemindersScreen: 'reminders',
            },
          },
          Garden: {
            screens: {
              GardenScreen: 'garden',
            },
          },
        },
      },
      SettingsModal: 'settings',
      NotFound: '*',
    },
  },
};
