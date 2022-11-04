import { FontAwesome } from '@expo/vector-icons';
import { ComponentProps, FC } from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export const TabBarIcon: FC<{
  name: ComponentProps<typeof FontAwesome>['name'];
  color: string;
}> = (props) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};
