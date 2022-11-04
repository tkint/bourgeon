import * as WebBrowser from 'expo-web-browser';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { AppText } from './shared/AppText';
import { AppView } from './shared/AppView';
import { MonoText } from './shared/StyledText';

export const EditScreenInfo: FC<{ path: string }> = ({ path }) => {
  return (
    <AppView>
      <AppView style={styles.getStartedContainer}>
        <AppText style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </AppText>

        <AppView
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </AppView>

        <AppText style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </AppText>
      </AppView>

      <AppView style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <AppText style={styles.helpLinkText} lightColor={Colors.light.primary}>
            Tap here if your app doesn't automatically update after making changes
          </AppText>
        </TouchableOpacity>
      </AppView>
    </AppView>
  );
};

const handleHelpPress = () => {
  WebBrowser.openBrowserAsync('https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet');
};

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
