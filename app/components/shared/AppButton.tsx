import { Button, ButtonProps } from '@ui-kitten/components';
import { FC } from 'react';

export type AppButtonProps = ButtonProps & {
  children: string | null;
};

export const AppButton: FC<AppButtonProps> = (props) => {
  return <Button {...props} />;
};
