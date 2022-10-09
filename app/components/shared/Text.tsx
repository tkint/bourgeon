import { Text as DefaultText } from 'react-native';
import { ThemeProps, useTheme } from '../../hooks/useTheme';

export type TextProps = ThemeProps & DefaultText['props'];

export const Text: React.FunctionComponent<TextProps> = (props) => {
  const { getColor } = useTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = getColor('text', { light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
