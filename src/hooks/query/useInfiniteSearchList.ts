import { SCOPE } from '@/components/Search/_components/Tab/constants';
import { API } from '@/constants/url';
import { SearchResult } from '@/models/Spotify';
import { getMyTopItems, getPage } from '@/services/spotify/spotify';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const scope = {
  albums: 'album',
  artists: 'artist',
  tracks: 'track',
  playlists: 'playlist',
};

export const useInfiniteSearchList = (url?: string, limit = 20, offset = 0) => {
  const [searchParam] = useSearchParams();
  // 현재 탭을 url 파람에서 찾고, 없다면 디폴트인 앨범 탭으로 설정합니다.
  const currentScope = (searchParam.get(SCOPE) ??
    'album') as keyof SearchResult;

  const currentSearchKeyword = searchParam.get('keyword');

  const total = searchParam.get('total');

  let defaultUrl =
    url ??
    `${API.SPOTIFY}search?offset=${offset}&limit=${limit}&query=${currentSearchKeyword}&type=album&locale=en-US,en`;

  if (searchParam.get(SCOPE) != null) {
    defaultUrl = defaultUrl.replace(
      `type=album`,
      `type=${scope[currentScope]}`,
    );
  }
  // fetch 가능한 개수를 넘어가면 에러 발생
  // if (total != null) {
  //   const url = new URL(defaultUrl);
  //   const offset = +(url.searchParams.get('offset') ?? 20);
  //   const itemLimit = +(url.searchParams.get('limit') ?? limit);
  //   if (itemLimit + offset > +total) {
  //     defaultUrl = defaultUrl.replace(
  //       `limit=${itemLimit}`,
  //       `limit=${+total - offset}`,
  //     );
  //   }
  // }

  const res = useInfiniteQuery({
    queryKey: useInfiniteSearchList.queryKey(defaultUrl),
    initialPageParam: defaultUrl,
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam }) => {
      if (currentSearchKeyword == null) {
        const topArtistName = await getMyTopItems({})?.then(
          res => res.items[0].name,
        );
        defaultUrl = defaultUrl.replace(
          `query=${currentSearchKeyword}`,
          `query=${topArtistName}`,
        );

        const res = await getPage(defaultUrl);
        return res;
      }

      // fetch 가능한 개수를 넘어가면 에러 발생
      if (total != null) {
        const url = new URL(pageParam);
        const offset = +(url.searchParams.get('offset') as string);
        const itemLimit = +(url.searchParams.get('limit') ?? limit);
        // console.log('pageParam', pageParam);
        if (itemLimit + offset > +total) {
          pageParam = pageParam.replace(
            `limit=${itemLimit}`,
            `limit=${+total - offset}`,
          );

          return await getPage(pageParam);
        }
      }

      return await getPage(pageParam);
    },
    getNextPageParam: (lastPage, _) => lastPage?.[currentScope]?.next,
    getPreviousPageParam: firstPage => firstPage?.[currentScope]?.previous,
    placeholderData: prev => prev,
    staleTime: 60_000 * 60 * 3,
    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
  });

  return res;
};
useInfiniteSearchList.queryKey = (keywordUrl: string) => {
  return ['search', 'infinite', keywordUrl];
};
