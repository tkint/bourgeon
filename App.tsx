import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useCachedResources } from './app/hooks/useCachedResources';
import { ThemeContextProvider } from './app/hooks/useTheme';
import { Navigation } from './app/navigation/Navigation';

export const App: React.FunctionComponent = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeContextProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ThemeContextProvider>
    );
  }
};

export default App;
