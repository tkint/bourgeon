import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import configureMeasurements, { allMeasures, AllMeasuresUnits } from 'convert-units';
import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeName } from '../constants/Colors';

const convertUnits = configureMeasurements(allMeasures);

const STORAGE_KEY = '@bourgeon/preferences';

type ThemeNameOrAuto = ThemeName | 'auto';
type UnitSystem = 'metric' | 'imperial';

type PreferencesState = {
  theme: ThemeNameOrAuto;
  unitSystem: UnitSystem;
};

type PreferencesContextValue = {
  preferences: PreferencesState;
  setPreferences: (newValue: PreferencesState) => void;
};

type ThemeInformations = {
  theme: ThemeName;
  invertedTheme: ThemeName;
  rawTheme: ThemeNameOrAuto;
};

export interface UsePreferencesReturn {
  theme: UsePreferencesReturn.Theme;
  units: UsePreferencesReturn.Units;
}

export namespace UsePreferencesReturn {
  export interface Theme {
    rawTheme: ThemeNameOrAuto;
    setRawTheme: (newValue: ThemeNameOrAuto) => void;
    theme: ThemeName;
    invertedTheme: ThemeName;
    scheme: ColorScheme;
    invertedScheme: ColorScheme;
    getColor: (name: keyof ColorScheme, props?: Partial<Record<ThemeName, string>>) => string;
  }

  export interface Units {
    system: UnitSystem;
    setSystem: (newValue: UnitSystem) => void;
    convert: typeof convertUnits;
    autoConvert: (
      value: number,
      options: { source?: UnitSystem; units: Record<UnitSystem, AllMeasuresUnits> }
    ) => number;
    autoFormat: (
      value: number,
      options: {
        source?: UnitSystem;
        units: Record<UnitSystem, AllMeasuresUnits>;
        precision?: number;
        transform?: (value: number, unit: AllMeasuresUnits) => string;
      }
    ) => string;
  }
}

const PreferencesContext = React.createContext<PreferencesContextValue>(null as any);

export const usePreferences = (): UsePreferencesReturn => {
  const { preferences, setPreferences } = useContext(PreferencesContext);

  const theme: UsePreferencesReturn.Theme = (() => {
    const { rawTheme, theme, invertedTheme } = getThemeInformations(preferences.theme);

    const scheme = Colors[theme];
    const invertedScheme = Colors[invertedTheme];

    return {
      rawTheme,
      setRawTheme: (newValue) => {
        setPreferences({ ...preferences, theme: newValue });
      },
      theme,
      invertedTheme,
      scheme,
      invertedScheme,
      getColor: (name, props) => props?.[theme] ?? scheme[name],
    };
  })();

  const units = ((): UsePreferencesReturn.Units => {
    const { unitSystem } = preferences;

    const autoConvert: UsePreferencesReturn.Units['autoConvert'] = (value, { source = 'metric', units }) => {
      return convertUnits(value).from(units[source]).to(units[unitSystem]);
    };

    const autoFormat: UsePreferencesReturn.Units['autoFormat'] = (
      value,
      { source, units, precision = 2, transform }
    ) => {
      const convertedValue = autoConvert(value, { source, units });
      const targetUnit = units[unitSystem];

      if (transform) {
        return transform(convertedValue, targetUnit);
      }

      return `${convertedValue.toFixed(precision)} ${targetUnit}`;
    };

    return {
      system: unitSystem,
      setSystem: (newValue) => {
        setPreferences({ ...preferences, unitSystem: newValue });
      },
      convert: convertUnits,
      autoConvert,
      autoFormat,
    };
  })();

  return {
    theme,
    units,
  };
};

export const usePreference = <T extends keyof UsePreferencesReturn>(preference: T): UsePreferencesReturn[T] =>
  usePreferences()[preference];

export const PreferencesProvider: React.FunctionComponent<{
  children: React.ReactNode | ((informations: ThemeInformations) => React.ReactNode);
}> = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage(STORAGE_KEY);

  const [preferences, setPreferences] = useState<PreferencesState>({ theme: 'auto', unitSystem: 'metric' });

  const setPreferencesAndPersist = async (newValue: PreferencesState) => {
    setPreferences(newValue);
    if (newValue) await setItem(JSON.stringify(newValue));
    else await removeItem();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const value = await getItem();
        if (value) {
          setPreferences(JSON.parse(value));
        } else {
          await setPreferencesAndPersist({ theme: 'auto', unitSystem: 'metric' });
        }
      } catch (e) {}
    };

    load();
  }, []);

  const themeInformations = getThemeInformations(preferences.theme);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences: setPreferencesAndPersist }}>
      {typeof children === 'function' ? children(themeInformations) : children}
    </PreferencesContext.Provider>
  );
};

const getThemeInformations = (rawTheme: ThemeNameOrAuto): ThemeInformations => {
  const userTheme = useColorScheme() as ThemeName;

  const theme = !rawTheme || rawTheme === 'auto' ? userTheme : rawTheme;
  const invertedTheme = theme === 'dark' ? 'light' : 'dark';

  return {
    theme,
    invertedTheme,
    rawTheme,
  };
};
