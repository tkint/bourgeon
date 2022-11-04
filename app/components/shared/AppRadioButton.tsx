import { ButtonGroup, ButtonGroupProps, StyleService, useStyleSheet } from '@ui-kitten/components';
import { Children, cloneElement, ReactElement } from 'react';
import { AppButton, AppButtonProps } from './AppButton';
import { AppText } from './AppText';

type AppRadioButtonProps<T> = AppButtonProps & {
  value: T;
};

export const AppRadioButton = <T,>(props: AppRadioButtonProps<T>) => {
  const { value, ...buttonProps } = props;

  return <AppButton {...buttonProps}></AppButton>;
};

type AppRadioGroupProps<T> = ButtonGroupProps & {
  selectedValue: T;
  children: ReactElement<AppRadioButtonProps<T>>[];
  onChange: (value: T) => void;
};

export const AppRadioGroup = <T,>(props: AppRadioGroupProps<T>) => {
  const styles = useStyleSheet(themedStyle);
  const { selectedValue, children, onChange, appearance, ...otherProps } = props;

  return (
    <ButtonGroup {...otherProps} appearance="outline">
      {props.children.map((button, index) => {
        const selected = button.props.value === selectedValue;

        return cloneElement(
          button,
          {
            key: index,
            style: selected ? styles.selectedButton : {},
            onPress: () => {
              onChange(button.props.value);
            },
          },
          Children.map(button.props.children, (content) => {
            return <AppText>{content}</AppText>;
          })
        );
      })}
    </ButtonGroup>
  );
};

const themedStyle = StyleService.create({
  button: {
    backgroundColor: 'color-primary-100',
  },

  selectedButton: {
    backgroundColor: 'color-primary-500',
  },

  selectedButtonText: {
    color: 'color-primary-800',
  },
});
