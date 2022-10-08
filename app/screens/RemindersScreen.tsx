import { StyleSheet } from 'react-native';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { RootTabScreenProps } from '../../types';

export const RemindersScreen: React.FunctionComponent<RootTabScreenProps<'Reminders'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
});
