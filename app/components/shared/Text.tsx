import { Text as DefaultText } from 'react-native';
import { ThemeProps, useThemeColor } from '../../hooks/useTheme';

export type TextProps = ThemeProps & DefaultText['props'];

export const Text: React.FunctionComponent<TextProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
