import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { Colors } from '../constants/Colors';
import { useTheme } from '../hooks/useTheme';
import { GardenScreen } from '../screens/GardenScreen';
import { RemindersScreen } from '../screens/RemindersScreen';
import { SettingsModalButton } from './SettingsModalButton';
import { TabBarIcon } from './TabBarIcon';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator: React.FunctionComponent = () => {
  const { theme: safeTheme } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Reminders"
      screenOptions={{
        tabBarActiveTintColor: Colors[safeTheme].primary,
      }}>
      <BottomTab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={({ navigation }: RootTabScreenProps<'Reminders'>) => ({
          title: 'Reminders',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-o" color={color} />,
          headerRight: () => SettingsModalButton(navigation),
        })}
      />
      <BottomTab.Screen
        name="Garden"
        component={GardenScreen}
        options={({ navigation }: RootTabScreenProps<'Garden'>) => ({
          title: 'Garden',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
          headerRight: () => SettingsModalButton(navigation),
        })}
      />
    </BottomTab.Navigator>
  );
};
