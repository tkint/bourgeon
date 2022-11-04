import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../../types';
import { AppText } from '../components/shared/AppText';
import { AppView } from '../components/shared/AppView';

export const NotFoundScreen: FC<RootStackScreenProps<'NotFound'>> = ({ navigation }) => {
  return (
    <AppView style={styles.container}>
      <AppText style={styles.title}>This screen doesn't exist.</AppText>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <AppText style={styles.linkText}>Go to home screen!</AppText>
      </TouchableOpacity>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
