import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Form } from 'components/Form/Form';
import { useAuthContext } from 'context/AuthContext';
import { useLoginMutation } from 'sources/mutations';

export const LoginScreen:FC = () => {
  const { signIn } = useAuthContext();
  const { mutate: login, isLoading } = useLoginMutation({
    onSuccess: (result) => {
      if (!result?.error) {
        signIn?.({ user: result.userId, token: result.token });
      }
      if (result?.error) {
        Alert.alert(
          'Sign In Failed',
          'Your member ID or password is incorrect. Please try again !',
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <Form loginMutation={login} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
