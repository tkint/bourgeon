import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeName } from '../constants/Colors';
import { useAuthentication } from './useAuthentication';

export type ThemeNameOrAuto = ThemeName | 'auto';

export type UseThemeReturn = {
  userTheme: ThemeName;
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

  const theme: ThemeName = rawTheme === 'auto' ? userTheme : rawTheme;
  const invertedTheme: ThemeName = theme === 'dark' ? 'light' : 'dark';

  const scheme: ColorScheme = Colors[theme];
  const invertedScheme: ColorScheme = Colors[invertedTheme];

  return {
    userTheme,
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
