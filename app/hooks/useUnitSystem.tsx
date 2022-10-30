import configureMeasurements, { allMeasures, AllMeasuresUnits } from 'convert-units';
import * as Localization from 'expo-localization';
import { useAuthentication } from './useAuthentication';

const convertUnits = configureMeasurements(allMeasures);

export type UnitSystem = 'metric' | 'imperial';
export type UnitSystemOrAuto = UnitSystem | 'auto';

export type UseUnitsReturn = {
  rawUnitSystem: UnitSystemOrAuto;
  setRawUnitSystem: (newValue: UnitSystemOrAuto) => void;
  unitSystem: UnitSystem;
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
 * Return the user unit system based on :
 *  - their preferences if connected
 *  - their OS settings if not
 * @returns
 */
export const useUnitSystem = (): UseUnitsReturn => {
  const { currentUser, setPreference } = useAuthentication();
  const userUnitSystem: UnitSystem = Localization.isMetric ? 'metric' : 'imperial';

  const rawUnitSystem: UnitSystemOrAuto = currentUser?.preferences?.unitSystem ?? 'auto';

  const unitSystem: UnitSystem = rawUnitSystem === 'auto' ? userUnitSystem : rawUnitSystem;

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
    rawUnitSystem,
    setRawUnitSystem: (newValue) => {
      setPreference('unitSystem', newValue);
    },
    unitSystem,
    convert: convertUnits,
    autoConvert,
    autoFormat,
  };
};
