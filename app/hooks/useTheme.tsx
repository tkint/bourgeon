import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeName } from '../constants/Colors';

const STORAGE_SCHEME_KEY = '@bourgeon/scheme';

const ThemeContext = React.createContext<{
  theme: ThemeName | undefined;
  safeTheme: ThemeName;
  setTheme: (newValue: ThemeName | undefined) => void;
}>(null as any);

export const useTheme = () => useContext(ThemeContext);

export const useThemeColor = (props: Partial<Record<ThemeName, string>>, colorName: keyof ColorScheme): string => {
  const { safeTheme } = useTheme();
  const colorFromProps = props[safeTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[safeTheme][colorName];
  }
};

export const useThemeColors = (): ColorScheme => {
  const { safeTheme } = useTheme();

  return Colors[safeTheme];
};

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export const ThemeContextProvider: React.FunctionComponent<{ children?: React.ReactNode | undefined }> = ({
  children,
}) => {
  const userColorScheme = useColorScheme();

  const [localTheme, setLocalTheme] = useState<ThemeName>();
  const { getItem, setItem, removeItem } = useAsyncStorage(STORAGE_SCHEME_KEY);

  const setTheme = async (newValue: ThemeName | undefined) => {
    setLocalTheme(newValue);
    if (newValue) setItem(newValue);
    else removeItem();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const value = await getItem();

        switch (value) {
          case 'light':
          case 'dark':
            setLocalTheme(value);
            break;
          default:
            await removeItem();
            break;
        }
      } catch (e) {}
    };

    load();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: localTheme,
        safeTheme: localTheme ?? userColorScheme ?? 'light',
        setTheme: setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
