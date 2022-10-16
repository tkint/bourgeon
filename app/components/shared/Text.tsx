import { Text as DefaultText } from 'react-native';
import { usePreference } from '../../hooks/usePreferences';
import { ThemeProps } from '../../constants/Colors';

export type TextProps = ThemeProps & DefaultText['props'];

export const Text: React.FunctionComponent<TextProps> = (props) => {
  const { getColor } = usePreference('theme');

  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = getColor('text', { light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
