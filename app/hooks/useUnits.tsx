import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import configureMeasurements, { allMeasures, AllMeasuresUnits, UnitDescription } from 'convert-units';
import React, { useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@bourgeon/units';

const convert = configureMeasurements(allMeasures);

type UnitSystem = 'metric' | 'imperial';

type UnitSystemContextState = {
  unitSystem: UnitSystem;
};

type UnitSystemContextFunctions = {
  setUnitSystem: (newUnitSystem: UnitSystem) => void;
};

type UnitSystemContextValue = UnitSystemContextState & UnitSystemContextFunctions;

type UnitSystemState = UnitSystemContextState & {};

type UseUnitsReturn = UnitSystemState &
  UnitSystemContextFunctions & {
    convert: typeof convert;
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
  };

const UnitSystemContext = React.createContext<UnitSystemContextValue>(null as any);

export const useUnitSystem = (): UseUnitsReturn => {
  const { unitSystem, setUnitSystem } = useContext(UnitSystemContext);

  const autoConvert: UseUnitsReturn['autoConvert'] = (value, { source = 'metric', units }) => {
    return convert(value).from(units[source]).to(units[unitSystem]);
  };

  const autoFormat: UseUnitsReturn['autoFormat'] = (value, { source, units, precision = 2, transform }) => {
    const convertedValue = autoConvert(value, { source, units });
    const targetUnit = units[unitSystem];

    if (transform) {
      return transform(convertedValue, targetUnit);
    }

    return `${convertedValue.toFixed(precision)} ${targetUnit}`;
  };

  return {
    unitSystem,
    setUnitSystem,
    convert,
    autoConvert,
    autoFormat,
  };
};

export const UnitsContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage(STORAGE_KEY);

  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const setUnitSystemAndPersist = async (newValue: UnitSystem) => {
    setUnitSystem(newValue);
    if (newValue) setItem(newValue);
    else removeItem();
  };

  useEffect(() => {
    const load = async () => {
      try {
        const value = await getItem();

        switch (value) {
          case 'metric':
          case 'imperial':
            await setUnitSystemAndPersist(value);
            break;
          default:
            await setUnitSystemAndPersist('metric');
            break;
        }
      } catch (e) {}
    };

    load();
  }, []);

  return (
    <UnitSystemContext.Provider value={{ unitSystem, setUnitSystem: setUnitSystemAndPersist }}>
      {children}
    </UnitSystemContext.Provider>
  );
};
