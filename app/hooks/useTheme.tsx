import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeName } from '../constants/Colors';

const STORAGE_SCHEME_KEY = '@bourgeon/scheme';

type ThemeNameOrAuto = ThemeName | 'auto';

type ThemeContextState = {
  rawTheme: ThemeNameOrAuto;
};

type ThemeContextFunctions = {
  setRawTheme: (newTheme: ThemeNameOrAuto) => void;
};

type ThemeContextValue = ThemeContextState & ThemeContextFunctions;

type ThemeState = ThemeContextState & {
  theme: ThemeName;
  invertedTheme: ThemeName;
};

type UseThemeReturn = ThemeState &
  ThemeContextFunctions & {
    scheme: ColorScheme;
    invertedScheme: ColorScheme;
    getColor: (name: keyof ColorScheme, props?: Partial<Record<ThemeName, string>>) => string;
  };

const ThemeContext = React.createContext<ThemeContextValue>(null as any);

export const useTheme = (): UseThemeReturn => {
  const { rawTheme, setRawTheme } = useContext(ThemeContext);

  const { theme, invertedTheme } = makeThemeState(rawTheme);
  const scheme = Colors[theme];
  const invertedScheme = Colors[invertedTheme];

  return {
    theme,
    invertedTheme,
    rawTheme,
    setRawTheme,
    scheme,
    invertedScheme,
    getColor: (name, props) => props?.[theme] ?? scheme[name],
  };
};

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export const ThemeContextProvider: React.FunctionComponent<{
  children: React.ReactNode | ((state: ThemeState) => React.ReactNode);
}> = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage(STORAGE_SCHEME_KEY);

  const [rawTheme, setRawTheme] = useState<ThemeNameOrAuto>('auto');

  const setRawThemeAndPersist = async (newValue: ThemeNameOrAuto) => {
    setRawTheme(newValue);
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
          case 'auto':
            await setRawThemeAndPersist(value);
            break;
          default:
            await setRawThemeAndPersist('auto');
            break;
        }
      } catch (e) {}
    };

    load();
  }, []);

  const themeState = makeThemeState(rawTheme);

  return (
    <ThemeContext.Provider value={{ ...themeState, setRawTheme: setRawThemeAndPersist }}>
      {typeof children === 'function' ? children(themeState) : children}
    </ThemeContext.Provider>
  );
};

const makeThemeState = (rawTheme: ThemeNameOrAuto): ThemeState => {
  const userTheme = useColorScheme() as ThemeName;

  const theme = !rawTheme || rawTheme === 'auto' ? userTheme : rawTheme;
  const invertedTheme = theme === 'dark' ? 'light' : 'dark';

  return {
    theme,
    invertedTheme,
    rawTheme,
  };
};
