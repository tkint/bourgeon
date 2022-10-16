import { ColorSchemeName as DefaultColorSchemeName } from 'react-native';

export type ThemeName = Exclude<DefaultColorSchemeName, null | undefined>;

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ColorScheme = {
  text: string;
  background: string;
  menu: string;
  primary: string;
  secondary: string;
};

type Themes = Record<ThemeName, ColorScheme>;

type MakeScheme = () => ColorScheme;

const makeLightScheme: MakeScheme = () => {
  return {
    text: '#121212',
    background: '#ffffff',
    menu: '#eeeeee',
    primary: '#339966',
    secondary: '#ffffff',
  };
};

const makeDarkScheme: MakeScheme = () => {
  return {
    text: '#ffffff',
    background: '#121212',
    menu: '#323232',
    primary: '#339966',
    secondary: '#121212',
  };
};

export const Colors: Themes = {
  light: makeLightScheme(),
  dark: makeDarkScheme(),
};
