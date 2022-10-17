import configureMeasurements, { allMeasures, AllMeasuresUnits } from 'convert-units';
import { useAuthentication } from './useAuthentication';

const convertUnits = configureMeasurements(allMeasures);

export type UnitSystem = 'metric' | 'imperial';

export type UseUnitsReturn = {
  system: UnitSystem;
  setSystem: (newValue: UnitSystem) => void;
  convert: typeof convertUnits;
  autoConvert: (value: number, options: { source?: UnitSystem; units: Record<UnitSystem, AllMeasuresUnits> }) => number;
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

/**
 * Return the user theme based on :
 *  - their preferences if connected
 *  - their OS settings if not
 * @returns
 */
export const useUnits = (): UseUnitsReturn => {
  const { currentUser, setPreference } = useAuthentication();

  const unitSystem = currentUser?.preferences?.unitSystem ?? 'metric';

  const autoConvert: UseUnitsReturn['autoConvert'] = (value, { source = 'metric', units }) => {
    return convertUnits(value).from(units[source]).to(units[unitSystem]);
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
    system: unitSystem,
    setSystem: (newValue) => {
      setPreference('unitSystem', newValue);
    },
    convert: convertUnits,
    autoConvert,
    autoFormat,
  };
};
