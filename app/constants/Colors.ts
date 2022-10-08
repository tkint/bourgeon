import { ColorSchemeName as DefaultColorSchemeName } from 'react-native';

export type ThemeName = Exclude<DefaultColorSchemeName, null | undefined>;

export type ColorScheme = {
  text: string;
  background: string;
  tint: string;
  radioDefaultText: string;
  radioDefaultBackground: string;
  radioSelectedText: string;
  radioSelectedBackground: string;
};

type Themes = Record<ThemeName, ColorScheme>;

type MakeScheme = () => ColorScheme;

const makeLightScheme: MakeScheme = () => {
  const textColor = '#000';
  const backgroundColor = '#fff';
  const tintColor = '#2f95dc';

  return {
    text: textColor,
    background: backgroundColor,
    tint: tintColor,
    radioDefaultText: textColor,
    radioDefaultBackground: backgroundColor,
    radioSelectedText: textColor,
    radioSelectedBackground: tintColor,
  };
};

const makeDarkScheme: MakeScheme = () => {
  const textColor = '#fff';
  const backgroundColor = '#000';
  const tintColor = '#fff';

  return {
    text: textColor,
    background: backgroundColor,
    tint: tintColor,
    radioDefaultText: textColor,
    radioDefaultBackground: backgroundColor,
    radioSelectedText: textColor,
    radioSelectedBackground: tintColor,
  };
};

export const Colors: Themes = {
  light: makeLightScheme(),
  dark: makeDarkScheme(),
};
