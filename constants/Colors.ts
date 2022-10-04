import { ColorSchemeName as DefaultColorSchemeName } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type ColorSchemeName = Exclude<DefaultColorSchemeName, null | undefined>;

export type ColorScheme = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

type ColorSchemes = Record<ColorSchemeName, ColorScheme>;

export const Colors: ColorSchemes = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
