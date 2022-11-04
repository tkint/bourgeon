import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { AppText } from '../components/shared/AppText';
import { AppView } from '../components/shared/AppView';

export const GardenScreen: FC<RootTabScreenProps<'Garden'>> = () => {
  return (
    <AppView style={styles.container}>
      <AppText style={styles.title}>Garden</AppText>
      <AppView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </AppView>
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
});
