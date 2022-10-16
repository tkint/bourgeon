import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootStackParamList } from '../../types';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { SettingsModalScreen } from '../screens/SettingsModalScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FunctionComponent<{ user: Parse.User | null }> = (props) => {
  return (
    <Stack.Navigator initialRouteName={props.user ? 'Root' : 'SignIn'}>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="SettingsModal" options={{ title: 'Settings' }} component={SettingsModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
