import { Button as DefaultButton } from 'react-native';
import { ThemeProps, useThemeColor } from '../../hooks/useTheme';

export type ButtonProps = ThemeProps & DefaultButton['props'];

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultButton color={color} {...otherProps} />;
};
