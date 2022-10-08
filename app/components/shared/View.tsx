import { View as DefaultView } from 'react-native';
import { ThemeProps, useThemeColor } from '../../hooks/useTheme';

export type ViewProps = ThemeProps & DefaultView['props'];

export const View: React.FunctionComponent<ViewProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
