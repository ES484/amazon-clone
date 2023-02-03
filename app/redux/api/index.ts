import { apiUrl, getHost } from '@/constants/*';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const host = async () =>
  await getHost().then((req) => req.url.split('//')[1].split('/')[0]);
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
  }),
  keepUnusedDataFor: 60 * 60,
  refetchOnReconnect: false,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});

