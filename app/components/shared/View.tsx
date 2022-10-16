import { View as DefaultView } from 'react-native';
import { usePreference } from '../../hooks/usePreferences';
import { ThemeProps } from '../../constants/Colors';

export type ViewProps = ThemeProps & DefaultView['props'];

export const View: React.FunctionComponent<ViewProps> = (props) => {
  const { getColor } = usePreference('theme');

  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = getColor('background', { light: lightColor, dark: darkColor });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
