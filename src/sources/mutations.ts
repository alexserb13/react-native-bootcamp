import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import type { LoginResponse } from './types';
import { baseURL } from './constants';

type RequestBody = { memberId: string, password: string };

type MutationContext = { onSuccess: (data: LoginResponse) => void };

type MutationOptions = UseMutationOptions<LoginResponse, null, RequestBody, MutationContext>;

type MutationResult = UseMutationResult<LoginResponse, null, RequestBody, MutationContext>;

const postToUrl = async (url: string, body: RequestBody) => {
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

export const useLoginMutation = (options: MutationOptions): MutationResult => {
  const url = `${baseURL}/login`;
  return useMutation((credentials) => postToUrl(url, credentials), options);
};
