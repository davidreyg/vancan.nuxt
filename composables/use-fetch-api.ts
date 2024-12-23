import type { UseFetchOptions } from 'nuxt/app';

export type PaginatedResponse<T> = {
  count: string;
  results: T;
};
export function useApi<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch as typeof $fetch,
  });
}

export const useApiLazy = <T>(url: string | (() => string), options?: UseFetchOptions<T>) => {
  return useLazyFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch as typeof $fetch,
  });
};
