import { Artist } from '@/models/Profile';
import { getArtistList } from '@/services/spotify/spotify';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useArtistProfileLink = ({ artistId }: { artistId: string }) => {
  const queryClient = useQueryClient();

  return useQuery<Artist | undefined>({
    queryKey: useArtistProfileLink.queryKey(artistId),

    queryFn: async (): Promise<Artist | undefined> => {
      try {
        const cached = queryClient.getQueryData<Artist>(
          useArtistProfileLink.queryKey(artistId),
        );
        if (cached) {
          return cached;
        }

        const res = await getArtistList([artistId]);

        if (Array.isArray(res)) {
          if (res) {
            const artist = res[0] as Artist;
            queryClient.setQueryData(
              ['artist', 'profile', 'link', artist?.id],
              artist,
            );
            return artist;
          }
        }
        return undefined; // <- consistent return type
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to fetch artist list');
      }
    },
    initialData: () =>
      queryClient.getQueryData<Artist>(useArtistProfileLink.queryKey(artistId)),
    staleTime: 60_000,
    placeholderData: (prev, _) => prev ?? undefined,
    // retry: (failureCount, error: any) =>
    //   error?.message == ERROR_MESSAGES[401] ||
    //   error?.message == ERROR_MESSAGES[403] ||
    //   error?.message == ERROR_MESSAGES[429]
    //     ? false
    //     : failureCount < 3,

    // throwOnError: error => {
    //   return (
    //     error?.message == ERROR_MESSAGES[401] ||
    //     error?.message == ERROR_MESSAGES[403]
    //   );
    // },
  });
};

useArtistProfileLink.queryKey = (artistId: string) => [
  'artist',
  'profile',
  'link',
  artistId,
];
