import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ThemeProps } from '../../constants/Colors';
import { useTheme } from '../../hooks/useTheme';
import { Text } from './Text';
import { View, ViewProps } from './View';

type RadioButtonGroupProps<T> = ViewProps & {
  onChange: (value: T) => void;
};

type RadioButtonProps<T> = ThemeProps &
  PressableProps & {
    title: string;
    value: T;
  };

export const makeRadioButton = <T,>(value: T) => {
  const { scheme } = useTheme();

  const Context = React.createContext<{ value: T; onChange: (newValue: T) => void }>({ value } as any);

  return {
    Group: ({ onChange, children, ...props }: RadioButtonGroupProps<T>) => {
      const { style, ...otherProps } = props;

      const { menu } = scheme;

      return (
        <Context.Provider value={{ value, onChange }}>
          <View accessibilityRole="radiogroup" style={[styles.group, { backgroundColor: menu }, style]} {...otherProps}>
            {children}
          </View>
        </Context.Provider>
      );
    },
    Button: ({ value, onPress, ...props }: RadioButtonProps<T>) => {
      const { lightColor, darkColor, title, disabled, style, ...otherProps } = props;

      const { text, background, primary } = scheme;

      return (
        <Context.Consumer>
          {(context) => {
            const checked = value == context.value;
            const textColor = checked ? text : text;
            const backgroundColor = checked ? primary : background;

            return (
              <Pressable
                style={[styles.button, { backgroundColor }]}
                disabled={disabled}
                accessibilityState={{ disabled: !!disabled, checked }}
                onPress={(event) => {
                  context.onChange(value);
                  onPress?.(event);
                }}
                {...otherProps}>
                <Text style={{ color: textColor }}>{title}</Text>
              </Pressable>
            );
          }}
        </Context.Consumer>
      );
    },
  };
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
    elevation: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 6,
  },
  text: {},
});
