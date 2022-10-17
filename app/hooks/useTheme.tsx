import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeName } from '../constants/Colors';
import { useAuthentication } from './useAuthentication';

export type ThemeNameOrAuto = ThemeName | 'auto';

export type ThemeInformations = {
  theme: ThemeName;
  invertedTheme: ThemeName;
  rawTheme: ThemeNameOrAuto;
};

export type UseThemeReturn = {
  rawTheme: ThemeNameOrAuto;
  setRawTheme: (newValue: ThemeNameOrAuto) => void;
  theme: ThemeName;
  invertedTheme: ThemeName;
  scheme: ColorScheme;
  invertedScheme: ColorScheme;
  getColor: (name: keyof ColorScheme, props?: Partial<Record<ThemeName, string>>) => string;
};

/**
 * Return the user theme based on :
 *  - their preferences if connected
 *  - their OS settings if not
 * @returns
 */
export const useTheme = (): UseThemeReturn => {
  const { currentUser, setPreference } = useAuthentication();
  const userTheme = useColorScheme() as ThemeName;

  const rawTheme: ThemeNameOrAuto = currentUser?.preferences?.theme ?? 'auto';

  const theme = !rawTheme || rawTheme === 'auto' ? userTheme : rawTheme;
  const invertedTheme = theme === 'dark' ? 'light' : 'dark';

  const scheme = Colors[theme];
  const invertedScheme = Colors[invertedTheme];

  return {
    rawTheme,
    setRawTheme: (newValue) => {
      setPreference('theme', newValue);
    },
    theme,
    invertedTheme,
    scheme,
    invertedScheme,
    getColor: (name, props) => props?.[theme] ?? scheme[name],
  };
};

export const getThemeInformations = (rawTheme: ThemeNameOrAuto): ThemeInformations => {
  const userTheme = useColorScheme() as ThemeName;

  const theme = !rawTheme || rawTheme === 'auto' ? userTheme : rawTheme;
  const invertedTheme = theme === 'dark' ? 'light' : 'dark';

  return {
    theme,
    invertedTheme,
    rawTheme,
  };
};
