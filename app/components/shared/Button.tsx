import { Button as DefaultButton } from 'react-native';
import { ThemeProps } from '../../constants/Colors';
import { useTheme } from '../../hooks/useTheme';

export type ButtonProps = ThemeProps & DefaultButton['props'];

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { getColor } = useTheme();

  const { lightColor, darkColor, ...otherProps } = props;
  const color = getColor('background', { light: lightColor, dark: darkColor });

  return <DefaultButton color={color} {...otherProps} />;
};
