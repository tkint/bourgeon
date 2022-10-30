import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Button } from '../components/shared/Button';
import { makeRadioButton } from '../components/shared/RadioButton';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useAuthentication } from '../hooks/useAuthentication';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';
import { useUnitSystem } from '../hooks/useUnitSystem';

export const SettingsModalScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const { logout } = useAuthentication();

  const { rawLocale, setRawLocale, t } = useLocale();
  const LocaleRadio = makeRadioButton(rawLocale);

  const { rawTheme, setRawTheme, invertedTheme, getColor } = useTheme();
  const ThemeRadio = makeRadioButton(rawTheme);

  const { rawUnitSystem, setRawUnitSystem } = useUnitSystem();
  const SystemRadio = makeRadioButton(rawUnitSystem);

  const logoutUser = async () => {
    if (await logout()) {
      navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : invertedTheme} />

      <Text style={styles.settingTitle}>{t('preferences.language')}</Text>

      <View style={styles.settingContent}>
        <LocaleRadio.Group onChange={setRawLocale}>
          <LocaleRadio.Button value={'auto'} title="Auto"></LocaleRadio.Button>
          <LocaleRadio.Button value={'en'} title="English"></LocaleRadio.Button>
          <LocaleRadio.Button value={'fr'} title="Français"></LocaleRadio.Button>
        </LocaleRadio.Group>
      </View>

      <Text style={styles.settingTitle}>{t('preferences.theme')}</Text>

      <View style={styles.settingContent}>
        <ThemeRadio.Group onChange={setRawTheme}>
          <ThemeRadio.Button value={'auto'} title="Auto"></ThemeRadio.Button>
          <ThemeRadio.Button value={'dark'} title="Dark"></ThemeRadio.Button>
          <ThemeRadio.Button value={'light'} title="Light"></ThemeRadio.Button>
        </ThemeRadio.Group>
      </View>

      <Text style={styles.settingTitle}>{t('preferences.units')}</Text>

      <View style={styles.settingContent}>
        <SystemRadio.Group onChange={setRawUnitSystem}>
          <SystemRadio.Button value={'auto'} title="Auto"></SystemRadio.Button>
          <SystemRadio.Button value={'metric'} title="Metric System"></SystemRadio.Button>
          <SystemRadio.Button value={'imperial'} title="Imperial Units"></SystemRadio.Button>
        </SystemRadio.Group>
      </View>

      <View style={styles.settingContent}>
        <Button title="Log out" color={getColor('primary')} onPress={logoutUser}></Button>
      </View>
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
    paddingBottom: 20,
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
