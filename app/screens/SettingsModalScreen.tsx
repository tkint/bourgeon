import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { makeRadioButton } from '../components/shared/RadioButton';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useTheme } from '../hooks/useTheme';

export const SettingsModalScreen: React.FunctionComponent = () => {
  const { theme, setTheme } = useTheme();

  const RadioButton = makeRadioButton(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* <Text>{theme}</Text> */}

      <RadioButton.Group onChange={setTheme}>
        <RadioButton.Button value={undefined} title="Auto"></RadioButton.Button>
        <RadioButton.Button value={'light'} title="Light"></RadioButton.Button>
        <RadioButton.Button value={'dark'} title="Dark"></RadioButton.Button>
      </RadioButton.Group>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  themeView: {
    flexDirection: 'row',
  },
});
