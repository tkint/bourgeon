import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable } from 'react-native';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { usePreference } from '../hooks/usePreferences';

export const SettingsModalButton: React.FunctionComponent<RootTabScreenProps<keyof RootTabParamList>['navigation']> = (
  navigation
) => {
  const { getColor } = usePreference('theme');
  const color = getColor('text');

  return (
    <Pressable
      onPress={() => navigation.navigate('SettingsModal')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <FontAwesome name="user" size={25} color={color} style={{ marginRight: 15 }} />
    </Pressable>
  );
};
