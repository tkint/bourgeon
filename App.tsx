import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from './app/components/shared/StatusBar';
import './app/firebase';
import { AuthenticationProvider, getCurrentUser, User } from './app/hooks/useAuthentication';
import { initI18n } from './app/hooks/useLocale';
import { Navigation } from './app/navigation/Navigation';

initI18n();

export const App: React.FunctionComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const loadData = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        await Promise.all([
          Font.loadAsync({
            ...FontAwesome.font,
            'space-mono': require('./app/assets/fonts/SpaceMono-Regular.ttf'),
          }),
          getCurrentUser().then((user) => setCurrentUser(user)),
        ]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoaded(true);
        SplashScreen.hideAsync();
      }
    };

    loadData();
  }, []);

  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthenticationProvider initialValue={currentUser}>
          <Navigation />
          <StatusBar />
        </AuthenticationProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
