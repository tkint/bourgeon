/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';

import { Colors, ColorSchemeName } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Garden } from '../screens/GardenScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { Reminders } from '../screens/RemindersScreen';
import { SettingsModalScreen as SettingsModal } from '../screens/SettingsModalScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export const Navigation: React.FunctionComponent<{
  colorScheme: ColorSchemeName;
}> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='SettingsModal'
          options={{ title: 'Settings' }}
          component={SettingsModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const SettingsModalButton: React.FunctionComponent<RootTabScreenProps<keyof RootTabParamList>['navigation']> = (
  navigation
) => {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('SettingsModal')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <FontAwesome
        name='cogs'
        size={25}
        color={Colors[colorScheme].text}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};

const BottomTabNavigator: React.FunctionComponent = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Reminders'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name='Reminders'
        component={Reminders}
        options={({ navigation }: RootTabScreenProps<'Reminders'>) => ({
          title: 'Reminders',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name='calendar-o'
              color={color}
            />
          ),
          headerRight: () => SettingsModalButton(navigation),
        })}
      />
      <BottomTab.Screen
        name='Garden'
        component={Garden}
        options={({ navigation }: RootTabScreenProps<'Garden'>) => ({
          title: 'Garden',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name='leaf'
              color={color}
            />
          ),
          headerRight: () => SettingsModalButton(navigation),
        })}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon: React.FunctionComponent<{
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}> = (props) => {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
};
