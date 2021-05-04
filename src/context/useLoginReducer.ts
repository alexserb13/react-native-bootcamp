import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Credentials = { user: string, token: string };

type State = {
  isChecking: boolean,
  user?: string | null,
  token?: string | null,
};

type Action = {
  type: string,
  isChecking?: boolean,
  user?: string | null,
  token?: string | null,
}

export type useLoginReducerReturnType = {
  state: State,
  signIn: ({ user, token }: Credentials) => void,
  checkStatus: () => void,
  signOut: () => void,
}

export const initialState = {
  isChecking: true,
  user: null,
  token: null,
};

const loginReducer = (prevState :State, action: Action): State => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isChecking: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isChecking: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        user: null,
        token: null,
        isChecking: false,
      };
    default:
      return prevState;
  }
};

export const useLoginReducer = (): useLoginReducerReturnType => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const signIn = async ({ user, token }: Credentials) => {
    const jsonValue = JSON.stringify({ user, token });
    await AsyncStorage.setItem('@keys', jsonValue);
    dispatch({ type: 'SIGN_IN', user, token });
  };

  const checkStatus = async () => {
    const jsonValue = await AsyncStorage.getItem('@keys');
    const { user, token }: Credentials = jsonValue != null ? JSON.parse(jsonValue) : {};
    dispatch({ type: 'RESTORE_TOKEN', user, token });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@keys');
    dispatch({ type: 'SIGN_OUT' });
  };

  return {
    state, signIn, checkStatus, signOut,
  };
};
