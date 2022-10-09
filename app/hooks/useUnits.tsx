import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@bourgeon/units';

type UnitSystem = 'metric' | 'imperial';
type UnitType = 'meters';

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
    format: (value: number, unit: UnitType) => string;
  };

const UnitSystemContext = React.createContext<UnitSystemContextValue>(null as any);

export const useUnitSystem = (): UseUnitsReturn => {
  const { unitSystem, setUnitSystem } = useContext(UnitSystemContext);

  return {
    unitSystem,
    setUnitSystem,
    format: (value, unit) => {
      switch (unitSystem) {
        case 'metric':
          switch (unit) {
            case 'meters':
              return `${value}m`;
          }
        case 'imperial':
          switch (unit) {
            case 'meters':
              return `${value}ft`;
          }
      }
    },
  };
};

export const UnitsContextProvider: React.FunctionComponent<{
  children: React.ReactNode | ((state: UnitSystemState) => React.ReactNode);
}> = ({ children }) => {
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

  const unitSystemState = makeUnitSystemState(unitSystem);

  return (
    <UnitSystemContext.Provider value={{ ...unitSystemState, setUnitSystem: setUnitSystemAndPersist }}>
      {typeof children === 'function' ? children(unitSystemState) : children}
    </UnitSystemContext.Provider>
  );
};

const makeUnitSystemState = (units: UnitSystem): UnitSystemState => {
  return {
    unitSystem: units,
  };
};
