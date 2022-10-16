import { Link, useNavigation } from '@react-navigation/native';
import React, { FC, ReactElement, useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text } from '../components/shared/Text';
import { View } from '../components/shared/View';
import { registerUser } from '../data/User';
import { usePreference } from '../hooks/usePreferences';

export const SignUpScreen: FC<{}> = ({}): ReactElement => {
  const navigation = useNavigation();

  const { getColor } = usePreference('theme');

  const linkColor = getColor('primary');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (await registerUser({ username, password })) {
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
      <Button title={'Sign Up'} onPress={submit} />

      <Text style={styles.bottomAction}>
        Don't have an account ?{' '}
        <Link style={{ color: linkColor }} to={{ screen: 'SignIn' }}>
          Sign in
        </Link>
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
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  bottomAction: {
    marginTop: 20,
  },

  noAccountLink: {},
});
