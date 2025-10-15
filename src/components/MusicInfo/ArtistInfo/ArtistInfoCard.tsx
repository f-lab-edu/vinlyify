import CoverImage from '@/components/_shared/CoverImage';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useArtistTopTracks } from '@/hooks/query/useArtistTopTracks';
import { useErrorNotifications } from '@/hooks/useErrorNotifications';
import { Artist } from '@/models/Profile';
import { Suspense } from 'react';
import ArtistName from './ArtistName';
import Followers from './Followers';
import GenreList from './GentreList';
import TopTrackList from './TopTrackList';

export default function ArtistInfoCard({
  artist,
}: Readonly<{
  artist: Artist;
}>) {
  const { data, isError, error } = useArtistTopTracks({ artistId: artist.id });
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.message,
    toastId: error?.name,
  });
  if (isError) {
    showErrorToast();
  }

  return (
    <li
      className={`align-middle bg-(--grey-200) list-none w-full grid-cols-1 md:grid-cols-2 
         text-(--color-white) shadow-(--shadow-basic) p-4 justify-center rounded-[4px] inline-grid gap-4`}
    >
      <Suspense fallback={<img src={PLACEHOLDER_IMAGE} alt="loading" />}>
        <div>
          <CoverImage
            imgUrl={
              artist?.images != null ? artist?.images[0].url : PLACEHOLDER_IMAGE
            }
            url={artist.external_urls?.spotify}
          />
        </div>

        <span className="inline-flex flex-col">
          <span className="inline-block w-full">
            <ArtistName artistName={artist?.name} />
            <Followers followers={artist?.followers?.total} />
          </span>
          {artist?.genres && artist?.genres?.length > 0 ? (
            <GenreList genres={artist.genres} />
          ) : null}
          <TopTrackList topTracks={data?.tracks} />
        </span>
      </Suspense>
    </li>
  );
}
