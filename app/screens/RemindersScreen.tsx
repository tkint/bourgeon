import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useUnits } from '../hooks/useUnits';

export const RemindersScreen: React.FunctionComponent<RootTabScreenProps<'Reminders'>> = ({ navigation }) => {
  const { autoFormat } = useUnits();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>
        100 km ={' '}
        {autoFormat(100, {
          source: 'metric',
          units: { metric: 'km', imperial: 'mi' },
        })}
      </Text>
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
