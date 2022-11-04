import { FC } from 'react';
import { AppText, AppTextProps } from './AppText';

export const MonoText: FC<AppTextProps> = (props) => {
  return <AppText {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
};
