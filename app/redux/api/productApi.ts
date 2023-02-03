import { apiSlice } from './index';
import { Locale, Products } from '@/types/index';
import { AppQueryResult } from '@/types/queries';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
    Products,
    null
  >({
      query: () => ({
        url: `products`
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
