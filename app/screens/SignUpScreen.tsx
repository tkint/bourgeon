import { useNavigation } from '@react-navigation/native';
import { Input } from '@ui-kitten/components';
import React, { FC, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AppButton } from '../components/shared/AppButton';
import { AppText } from '../components/shared/AppText';
import { AppView } from '../components/shared/AppView';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthentication } from '../hooks/useAuthentication';

export const SignUpScreen: FC = () => {
  const navigation = useNavigation();
  const { register } = useAuthentication();

  const { getColor } = useAppTheme();

  const linkColor = getColor('primary');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (await register({ email: username, password })) {
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    }
  };

  return (
    <AppView style={styles.container}>
      <Input
        value={username}
        placeholder={'Email'}
        onChangeText={(text) => setUsername(text)}
        style={{ marginBottom: 10 }}
      />
      <Input
        value={password}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={{ marginBottom: 10 }}
      />
      <AppButton onPress={submit}>Sign up</AppButton>

      <AppText style={styles.bottomAction}>
        Already have an account ?{' '}
        <AppText
          style={{ color: linkColor, marginTop: 20 }}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
          }}>
          Sign in
        </AppText>
      </AppText>
    </AppView>
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
