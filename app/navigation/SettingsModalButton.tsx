import { FontAwesome } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable } from 'react-native';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { useAppTheme } from '../hooks/useAppTheme';

export const SettingsModalButton: FC<RootTabScreenProps<keyof RootTabParamList>['navigation']> = (navigation) => {
  const { getColor } = useAppTheme();
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
