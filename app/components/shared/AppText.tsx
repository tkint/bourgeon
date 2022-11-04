import { Text, TextProps } from '@ui-kitten/components';
import { FC } from 'react';
import { ThemeProps } from '../../constants/Colors';
import { useAppTheme } from '../../hooks/useAppTheme';

export type AppTextProps = ThemeProps & TextProps;

export const AppText: FC<AppTextProps> = (props) => {
  const { getColor } = useAppTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = getColor('text', { light: lightColor, dark: darkColor });

  return <Text style={[{ color }, style]} {...otherProps} />;
};
