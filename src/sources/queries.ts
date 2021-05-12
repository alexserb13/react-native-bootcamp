import { useQuery, UseQueryResult, QueryFunctionContext } from 'react-query';
import { useAuthContext } from 'contexts';
import type { UserCoordinates } from 'hooks/useUserLocation';
import { baseURL } from './constants';
import type { LibrariesQuery, BooksQuery, MemberQuery } from './types';

type RequestInfo = { url?: string | null, token?: string | null };

type QueryFunction = QueryFunctionContext<[string, RequestInfo]>;

const getFromUrl = async ({ queryKey }: QueryFunction) => {
  const { url = '', token } = queryKey[1];
  const result = await fetch(url || '', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return result.json();
};

export const useMemberInfoQuery = (): UseQueryResult<MemberQuery> => {
  const { user, token } = useAuthContext();
  const userURL = `${baseURL}/members/${user}`;

  return useQuery(['memberInfo', { url: userURL, token }], getFromUrl);
};

export const useBooksHistoryQuery = () :UseQueryResult<BooksQuery> => {
  const { user, token } = useAuthContext();
  const booksURL = `${baseURL}/members/${user}/books`;

  return useQuery(['booksHistory', { url: booksURL, token }], getFromUrl);
};

export const useLibrariesQuery = (coordinates: UserCoordinates) :UseQueryResult<LibrariesQuery> => {
  const { token } = useAuthContext();
  const librariesURL = !coordinates
    ? `${baseURL}/libraries`
    : `${baseURL}/libraries?latitude=${coordinates?.latitude}&longitude=${coordinates?.longitude}`;

  return useQuery(['libraries', { url: librariesURL, token }], getFromUrl, { keepPreviousData: true });
};
