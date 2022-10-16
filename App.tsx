import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initBack4App } from './app/constants/Back4App';
import { getCurrentUser, User } from './app/data/User';
import { PreferencesProvider } from './app/hooks/usePreferences';
import { Navigation } from './app/navigation/Navigation';

initBack4App();

export const App: React.FunctionComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
        <PreferencesProvider
          children={({ invertedTheme }) => {
            return (
              <>
                <Navigation user={currentUser} />
                <StatusBar style={invertedTheme} />
              </>
            );
          }}></PreferencesProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
