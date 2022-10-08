import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable } from 'react-native';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { Colors } from '../constants/Colors';
import { useTheme } from '../hooks/useTheme';

export const SettingsModalButton: React.FunctionComponent<RootTabScreenProps<keyof RootTabParamList>['navigation']> = (
  navigation
) => {
  const { safeTheme } = useTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('SettingsModal')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <FontAwesome name="cog" size={25} color={Colors[safeTheme].text} style={{ marginRight: 15 }} />
    </Pressable>
  );
};
