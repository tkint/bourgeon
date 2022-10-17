import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable } from 'react-native';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { useTheme } from '../hooks/useTheme';

export const SettingsModalButton: React.FunctionComponent<RootTabScreenProps<keyof RootTabParamList>['navigation']> = (
  navigation
) => {
  const { getColor } = useTheme();
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
