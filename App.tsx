import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useCachedResources } from './app/hooks/useCachedResources';
import { PreferencesProvider } from './app/hooks/usePreferences';
import { Navigation } from './app/navigation/Navigation';

export const App: React.FunctionComponent = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PreferencesProvider
          children={({ invertedTheme }) => {
            return (
              <>
                <Navigation />
                <StatusBar style={invertedTheme} />
              </>
            );
          }}></PreferencesProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
