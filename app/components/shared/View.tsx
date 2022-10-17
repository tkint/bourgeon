import { View as DefaultView } from 'react-native';
import { ThemeProps } from '../../constants/Colors';
import { useTheme } from '../../hooks/useTheme';

export type ViewProps = ThemeProps & DefaultView['props'];

export const View: React.FunctionComponent<ViewProps> = (props) => {
  const { getColor } = useTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = getColor('background', { light: lightColor, dark: darkColor });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
