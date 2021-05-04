import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import type { LoginResponse } from './types';

type MutationContext = { onSuccess: (data: LoginResponse) => void }

type MutationOptions = UseMutationOptions<LoginResponse, unknown, unknown, MutationContext>

const postToUrl = async (url:string, body: any) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  return result.json();
};

export const useLoginMutation = (options: MutationOptions) :UseMutationResult<LoginResponse> => {
  const url = 'https://rn-bootcamp2021.mocklab.io/v1/login';
  return useMutation((credentials) => postToUrl(url, credentials), options);
};
