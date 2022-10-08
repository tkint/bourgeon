import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootStackParamList } from '../../types';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { SettingsModalScreen } from '../screens/SettingsModalScreen';
import { BottomTabNavigator } from './BottomTab';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="SettingsModal" options={{ title: 'Settings' }} component={SettingsModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
