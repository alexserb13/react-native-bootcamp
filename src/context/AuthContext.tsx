import React, {
  useContext,
  useEffect,
  ReactChild,
  FC,
} from 'react';

import { useLoginReducer, initialState } from './useLoginReducer';
import type { Credentials } from './useLoginReducer';

type AuthContextType = {
  signIn?: (options: Credentials) => void;
  signOut:() => void;
  isChecking: boolean,
  user?: string | null,
  token?: string | null,
};

type AuthContextProviderProps = {
  children: ReactChild
};

export const AuthContext = React.createContext<AuthContextType>({
  ...initialState,
  signOut: () => null,
});

AuthContext.displayName = 'AuthContext';

export const AuthContextProvider :FC<AuthContextProviderProps> = ({ children }) => {
  const {
    state, signIn, checkStatus, signOut,
  } = useLoginReducer();

  useEffect(() => {
    if (!state.token) {
      checkStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    ...state,
    signOut,
    signIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
