import { useNavigation } from '@react-navigation/native';
import React, { FC, ReactElement, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTheme } from '../hooks/useTheme';

export const SignUpScreen: FC<{}> = ({}): ReactElement => {
  const navigation = useNavigation();
  const { register } = useAuthentication();

  const { getColor } = useTheme();

  const linkColor = getColor('primary');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (await register({ username, password })) {
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={'Username'}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={'Sign Up'} color={getColor('primary')} onPress={submit} />

      <Text style={styles.bottomAction}>
        Already have an account ?{' '}
        <Text
          style={{ color: linkColor, marginTop: 20 }}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
          }}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  bottomAction: {
    marginTop: 20,
  },

  noAccountLink: {},
});
