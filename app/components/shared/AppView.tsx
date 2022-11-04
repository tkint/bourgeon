import { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { ThemeProps } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export type AppViewProps = ThemeProps & ViewProps;

export const AppView: FC<AppViewProps> = (props) => {
  const { getColor } = useAppTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = getColor('background', { light: lightColor, dark: darkColor });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};
