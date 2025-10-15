// import { searchFromMyTopOne, searchKeyword } from '@/services/spotify';
// import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
// import { URL_PARAMS } from '@/constants/url';
// import { useQuery } from '@tanstack/react-query';
// import { useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';

// export const useSearchKeyword = () => {
//   const [searchParams] = useSearchParams();

//   const keywordParam = useMemo(
//     () => searchParams.get(URL_PARAMS.KEYWORD),
//     [searchParams],
//   );

//   // 1. Default: no keyword -> fetch based on top1 artist
//   const defaultSearch = useQuery({
//     queryKey: useSearchKeyword.queryKey(),
//     queryFn: async () => {
//       const res = await searchFromMyTopOne();
//       if (res?.response == null) {
//         throw new Error(ERROR_MESSAGES[400]);
//       }
//       return res.response;
//     },
//     staleTime: 3_000,
//     retry: (failureCount, error: any) =>
//       error?.message == ERROR_MESSAGES[401] ||
//       error?.message == ERROR_MESSAGES[403]
//         ? false
//         : failureCount < 3,
//     // throwOnError: (error: any) => Boolean(error.message),
//     throwOnError: error => {
//       return (
//         error?.message == ERROR_MESSAGES[401] ||
//         error?.message == ERROR_MESSAGES[403]
//       );
//     },
//     enabled: !keywordParam,
//   });

//   // 2. Keyword search
//   const keywordSearch = useQuery({
//     queryKey: useSearchKeyword.queryKey(keywordParam),
//     queryFn: () => {
//       if (!keywordParam) {
//         throw new Error('No keyword provided');
//       }
//       return searchKeyword(keywordParam);
//     },
//     staleTime: 2_000,
//     placeholderData: prev => prev,
//     notifyOnChangeProps: ['data'],
//     retry: (failureCount, error: any) =>
//       error?.message == ERROR_MESSAGES[401] ||
//       error?.message == ERROR_MESSAGES[403]
//         ? false
//         : failureCount < 3,
//     throwOnError: error => {
//       return (
//         error?.message == ERROR_MESSAGES[401] ||
//         error?.message == ERROR_MESSAGES[403]
//       );
//     },
//     enabled: Boolean(keywordParam),
//   });

//   return keywordParam ? keywordSearch : defaultSearch;
// };

// useSearchKeyword.queryKey = (keyword?: string | null) => {
//   const base = ['search', 'list'];
//   return keyword ? [...base, keyword] : base;
// };

import { URL_PARAMS } from '@/constants/url';
import { searchFromMyTopOne, searchKeyword } from '@/services/spotify/spotify';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchKeyword = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = useMemo(
    () => searchParams.get(URL_PARAMS.KEYWORD),
    [searchParams],
  );

  // ✅ Default search (when no keyword param exists)
  const defaultSearch = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: async ({ signal }) => {
      const res = await searchFromMyTopOne({ signal });
      searchParams.set(URL_PARAMS.KEYWORD, res.keyword);
      setSearchParams(searchParams);
      return res.response;
    },
    staleTime: Infinity,
    // retry(failureCount, error: Error) {
    //   if (error.message === 'Unauthorized — token invalid or expired')
    //     return false;
    //   return failureCount < 3;
    // },
    throwOnError: error => !!error.message,
  });

  // ✅ Keyword-based search (supports automatic cancellation)
  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(keywordParam),
    queryFn: async ({ signal }) => {
      if (!keywordParam) {
        throw new Error('No search keyword provided');
      }
      searchParams.set(URL_PARAMS.KEYWORD, keywordParam);
      setSearchParams(searchParams);
      return searchKeyword(keywordParam, signal);
    },
    notifyOnChangeProps: ['data'],
    staleTime: 2_000,
    placeholderData: keepPreviousData,
    // retry(failureCount, error: Error) {
    //   if (error.message === 'Unauthorized — token invalid or expired')
    //     return false;
    //   return failureCount < 3;
    // },
    enabled: keywordParam != null,
  });

  return searchParams.has(URL_PARAMS.KEYWORD) ? res : defaultSearch;
};

useSearchKeyword.queryKey = (keyword?: string | null) => {
  const default_querykeys = ['search', 'list'];
  if (!keyword) return default_querykeys;
  return [...default_querykeys, keyword];
};
