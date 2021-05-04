import React, { useState, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

type Props = {
  isLoading: boolean,
  loginMutation: (options:{ memberId: string, password: string }) => void,
}

export const Form: FC<Props> = ({ loginMutation, isLoading }) => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');

  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMemberIdValid = memberId?.trim()?.length === 6;
  const isPasswordValid = password?.trim()?.length;

  const userLogin = () => {
    if (isMemberIdValid && isPasswordValid) {
      loginMutation({ memberId, password });
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formText}>Member ID</Text>
      <View style={styles.inputContainer}>
        <Icon name="account" size={20} />
        <TextInput
          style={styles.textInput}
          placeholder="Your Member ID"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={setMemberId}
        />
      </View>
      {showError && !isMemberIdValid && (
        <Text style={styles.errorMessage}>ID must be 6 numbers long.</Text>
      )}
      <Text style={styles.formText}>Password</Text>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor="#666666"
          secureTextEntry={!showPassword}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Icon name="eye" color="grey" size={20} />
          ) : (
            <Icon name="eye-off" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      {showError && !isPasswordValid && (
        <Text style={styles.errorMessage}>Please enter your password.</Text>
      )}
      <View style={styles.button}>
        <TouchableOpacity
          onPress={userLogin}
          style={styles.signIn}
          disabled={isLoading}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
