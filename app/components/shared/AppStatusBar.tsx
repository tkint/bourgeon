import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { FC } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';

export const AppStatusBar: FC<StatusBarProps> = (props) => {
  const { style, ...rest } = props;
  const { invertedTheme } = useAppTheme();

  return <StatusBar style={invertedTheme} {...rest} />;
};
