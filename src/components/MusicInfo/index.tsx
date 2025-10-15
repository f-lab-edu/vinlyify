import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import { useMyTopArtists } from '@/hooks/query/useMyTopArtists';
import FullBackground from '@/layout/FullBackground';

import { useMemo } from 'react';
import AnimatedTitle from '../_shared/AnimatedTitle';
import Badge, { VARIANTS } from '../_shared/Badge';
import PauseButton from '../_shared/Button/PlayPauseButton/PauseButton';
import PlayButton from '../_shared/Button/PlayPauseButton/PlayButton';
import Card from '../_shared/Card';
import Grid from '../_shared/Grid';
import Vinyl from '../_shared/Vinyl/Vinyl';
import ArtistInfo from './ArtistInfo';
import ArtistInfoSection from './ArtistInfoSection';
import NavigateSearch from './NavigateSearch';
import ProgressBar from './ProgressBar';

export default function MusicInfo() {
  const { data, isLoading } = useCurrentPlayingTrack({ enabled: true });
  const { data: myTopArtists, isFetched } = useMyTopArtists();
  const artistId = useMemo(() => {
    return data?.item?.artists.map(artist => artist?.id);
  }, [data]);

  if (isLoading) {
    return <>loading...</>;
  }

  if (!data?.item) {
    return (
      <FullBackground className="p-8">
        <h1 className="text-(length:--text-fluid-lg) text-(--light-grey-100)">
          재생중인 음악이 없네요 😑
        </h1>
        <h2 className="text-(length:--text-fluid-md) text-(--light-grey-300)">
          최근에 들은 아티스트들이에요. 듣고 싶은 노래를 검색해 보세요!
        </h2>
        <NavigateSearch />

        <div className="w-full h-[80vh] overflow-scroll scrollbar-hide">
          {isFetched && (
            <Grid>
              {(myTopArtists as SpotifyApi.UsersTopArtistsResponse)?.items.map(
                item => (
                  <Card
                    className="bg-(--light-grey-200) rounded-[4px] p-4 mb-4 m-1 shadow-(--shadow-basic)"
                    titleTag={`팔로워 : ${item?.followers.total}`}
                    key={item.id}
                    contextUri={item.uri}
                    title={item.name}
                    coverImage={item.images[0]?.url}
                  >
                    <div className="inline-flex gap-4 pb-4">
                      {item.genres.map((genre, index) => (
                        <Badge
                          disabled={true}
                          key={genre}
                          className="w-fit"
                          variant={
                            Object.keys(VARIANTS)[
                              index % Object.keys(VARIANTS).length
                            ] as keyof typeof VARIANTS
                          }
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ),
              )}
            </Grid>
          )}
        </div>
      </FullBackground>
    );
  }

  return (
    <div
      className={
        'w-full h-full -ms-overflow-style:none scrollbar-hide overflow-scroll text-(--color-white) bg-(--light-grey-400) p-5 inline-flex justify-center-safe'
      }
    >
      <div className="w-full mb-8 h-fit lg:w-[60%] inline-flex flex-col gap-4">
        <AnimatedTitle>{data.item.name}</AnimatedTitle>
        <div className="w-full">
          <div className="inline-flex justify-center align-middle w-full">
            <div className="relative">
              <Vinyl
                imgUrl={
                  data.item?.album?.images[0].url
                    ? data.item?.album?.images[0].url
                    : PLACEHOLDER_IMAGE
                }
              />
            </div>
          </div>
          <div className="inline-flex w-full relative justify-center-safe align-middle">
            {data?.is_playing ? (
              <PauseButton />
            ) : (
              <PlayButton
                context={data.item.album.uri}
                uri={{ uri: data?.item.uri }}
                position_ms={data?.progress_ms || 0}
              />
            )}
            <ProgressBar
              progress={data?.progress_ms ?? 0}
              duration={data?.item?.duration_ms}
            />
            <div className="ml-2 py-1.5">
              {(data?.item?.duration_ms / 60_000).toFixed(2).replace('.', ':')}
            </div>
          </div>
        </div>
        <ArtistInfo>
          <ArtistInfoSection artistId={artistId} />
        </ArtistInfo>
      </div>
    </div>
  );
}
