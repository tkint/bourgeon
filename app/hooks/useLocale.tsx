import * as Localization from 'expo-localization';
import i18n, { TFunction } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useAuthentication } from './useAuthentication';

const namespaces = ['translation'] as const;
type Namespaces = typeof namespaces[number];
type DefaultNamespace = typeof namespaces[0];

const resources: Record<Locale, Record<Namespaces, object>> = {
  en: {
    translation: require('../assets/locales/en/translation.json'),
  },
  fr: {
    translation: require('../assets/locales/fr/translation.json'),
  },
};

export const supportedLocales = ['en', 'fr'] as const;

export type Locale = typeof supportedLocales[number];
export type LocaleOrAuto = Locale | 'auto';
export const defaultLocale = supportedLocales[0];

let initialized = false;
export const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,

    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });
  initialized = true;
};

export type UseLocaleReturn<Namespace extends Namespaces = DefaultNamespace> = {
  rawLocale: LocaleOrAuto;
  setRawLocale: (newValue: LocaleOrAuto) => void;
  locale: Locale;
  t: TFunction<Namespace>;
};

/**
 * Return the user locale based on :
 *  - their preferences if connected
 *  - their OS settings if not
 * @returns
 */
export const useLocale = <Namespace extends Namespaces = DefaultNamespace>(
  namespace?: Namespace
): UseLocaleReturn<Namespace> => {
  if (!initialized) Alert.alert('I18n not initialized');

  const { currentUser, setPreference } = useAuthentication();

  const rawLocale: LocaleOrAuto = currentUser?.preferences?.locale ?? 'auto';

  const locale: Locale = resolveLocaleOrAuto(rawLocale);

  const { t, i18n } = useTranslation(namespace);

  return {
    rawLocale,
    setRawLocale: (newValue) => {
      setPreference('locale', newValue);
      i18n.changeLanguage(resolveLocaleOrAuto(newValue));
    },
    locale,
    t,
  };
};

const resolveLocaleOrAuto = (localeOrAuto: LocaleOrAuto): Locale => {
  let userLocale = Localization.locale as Locale;
  if (!supportedLocales.includes(userLocale)) userLocale = defaultLocale;

  return localeOrAuto === 'auto' ? userLocale : localeOrAuto;
};
