import { StatusBar as DefaultStatusBar, StatusBarProps } from 'expo-status-bar';
import { useTheme } from '../../hooks/useTheme';

export const StatusBar: React.FunctionComponent<StatusBarProps> = (props) => {
  const { style, ...rest } = props;
  const { invertedTheme } = useTheme();

  return <DefaultStatusBar style={invertedTheme} {...rest} />;
};
