import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ThemeProps, useThemeColors } from '../../hooks/useTheme';
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
  const Context = React.createContext<{ value: T; onChange: (newValue: T) => void }>({ value: value } as any);

  return {
    Group: ({ onChange, children, ...props }: RadioButtonGroupProps<T>) => {
      const { style, ...otherProps } = props;

      return (
        <Context.Provider value={{ value, onChange }}>
          <View accessibilityRole="radiogroup" style={[style, styles.group]} {...otherProps}>
            {children}
          </View>
        </Context.Provider>
      );
    },
    Button: ({ value, onPress, ...props }: RadioButtonProps<T>) => {
      const { lightColor, darkColor, title, disabled, style, ...otherProps } = props;
      const { radioDefaultText, radioDefaultBackground, radioSelectedText, radioSelectedBackground } = useThemeColors();

      return (
        <Context.Consumer>
          {(context) => {
            const checked = context.value == value;
            const textColor = checked ? radioSelectedText : radioDefaultText;
            const backgroundColor = checked ? radioSelectedBackground : radioDefaultBackground;

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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {},
});
