import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { AppButton } from '../components/shared/AppButton';
import { AppRadioButton, AppRadioGroup } from '../components/shared/AppRadioButton';
import { AppText } from '../components/shared/AppText';
import { AppView } from '../components/shared/AppView';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthentication } from '../hooks/useAuthentication';
import { useLocale } from '../hooks/useLocale';
import { useUnitSystem } from '../hooks/useUnitSystem';

export const SettingsModalScreen: FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuthentication();

  const { rawLocale, setRawLocale, t } = useLocale();

  const { rawTheme, setRawTheme, invertedTheme } = useAppTheme();

  const { rawUnitSystem, setRawUnitSystem } = useUnitSystem();

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
    <AppView style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : invertedTheme} />

      <AppText style={styles.settingTitle}>{t('preferences.locale.title')}</AppText>

      <AppView style={styles.settingContent}>
        <AppRadioGroup selectedValue={rawLocale} onChange={setRawLocale}>
          <AppRadioButton value="auto">{t('preferences.locale.auto')}</AppRadioButton>
          <AppRadioButton value="en">English</AppRadioButton>
          <AppRadioButton value="fr">Français</AppRadioButton>
        </AppRadioGroup>
      </AppView>

      <AppText style={styles.settingTitle}>{t('preferences.theme.title')}</AppText>

      <AppView style={styles.settingContent}>
        <AppRadioGroup selectedValue={rawTheme} onChange={setRawTheme}>
          <AppRadioButton value="auto">{t('preferences.theme.auto')}</AppRadioButton>
          <AppRadioButton value="dark">{t('preferences.theme.dark')}</AppRadioButton>
          <AppRadioButton value="light">{t('preferences.theme.light')}</AppRadioButton>
        </AppRadioGroup>
      </AppView>

      <AppText style={styles.settingTitle}>{t('preferences.units.title')}</AppText>

      <AppView style={styles.settingContent}>
        <AppRadioGroup selectedValue={rawUnitSystem} onChange={setRawUnitSystem}>
          <AppRadioButton value="auto">{t('preferences.units.auto')}</AppRadioButton>
          <AppRadioButton value="metric">{t('preferences.units.metric')}</AppRadioButton>
          <AppRadioButton value="imperial">{t('preferences.units.imperial')}</AppRadioButton>
        </AppRadioGroup>
      </AppView>

      <AppView style={styles.settingContent}>
        <AppButton onPress={logoutUser}>{t('auth.logout')}</AppButton>
      </AppView>
    </AppView>
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
