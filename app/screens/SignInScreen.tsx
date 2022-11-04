import { useNavigation } from '@react-navigation/native';
import { Input } from '@ui-kitten/components';
import React, { FC, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AppButton } from '../components/shared/AppButton';
import { AppText } from '../components/shared/AppText';
import { AppView } from '../components/shared/AppView';
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthentication } from '../hooks/useAuthentication';

export const SignInScreen: FC = () => {
  const navigation = useNavigation();
  const { login } = useAuthentication();

  const { getColor } = useAppTheme();

  const linkColor = getColor('primary');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (await login({ email, password })) {
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    }
  };

  return (
    <AppView style={styles.container}>
      <Input value={email} placeholder={'Email'} onChangeText={(text) => setEmail(text)} style={{ marginBottom: 10 }} />
      <Input
        value={password}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={{ marginBottom: 10 }}
      />
      <AppButton onPress={submit}>Sign in</AppButton>

      <AppText style={styles.bottomAction}>
        Don't have an account ?{' '}
        <AppText
          style={{ color: linkColor, marginTop: 20 }}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
          }}>
          Sign up
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
