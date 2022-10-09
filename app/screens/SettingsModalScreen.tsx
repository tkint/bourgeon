import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { makeRadioButton } from '../components/shared/RadioButton';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useTheme } from '../hooks/useTheme';
import { useUnitSystem } from '../hooks/useUnits';

export const SettingsModalScreen: React.FunctionComponent = () => {
  const { invertedTheme, rawTheme, setRawTheme } = useTheme();
  const ThemeRadio = makeRadioButton(rawTheme);

  const { unitSystem: units, setUnitSystem: setUnits } = useUnitSystem();
  const UnitsRadio = makeRadioButton(units);

  return (
    <View style={styles.container}>
      <Text style={styles.settingTitle}>Theme</Text>

      <View style={styles.settingContent}>
        <ThemeRadio.Group onChange={setRawTheme}>
          <ThemeRadio.Button value={'auto'} title="Auto"></ThemeRadio.Button>
          <ThemeRadio.Button value={'light'} title="Light"></ThemeRadio.Button>
          <ThemeRadio.Button value={'dark'} title="Dark"></ThemeRadio.Button>
        </ThemeRadio.Group>
      </View>

      <Text style={styles.settingTitle}>Units</Text>

      <View style={styles.settingContent}>
        <UnitsRadio.Group onChange={setUnits}>
          <UnitsRadio.Button value={'metric'} title="Metric System"></UnitsRadio.Button>
          <UnitsRadio.Button value={'imperial'} title="Imperial Units"></UnitsRadio.Button>
        </UnitsRadio.Group>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : invertedTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  settingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  settingContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 50,
  },

  themeRow: {
    flexDirection: 'row',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
