import { PLACEHOLDER_IMAGE } from '@/constants';
import { Album } from '@/models/Album';
import { ExternalUrls, Image, MetaInfo } from '@/models/MetaInfo';
import { Track } from '@/models/Track';
import { useMemo } from 'react';

export const useMultiProfileImg = ({
  item,
  artistImgUrls,
}: {
  item: Track | Album;
  artistImgUrls: Map<MetaInfo['id'], Image['url']>;
}) => {
  const artistInfo = useMemo(() => {
    return item?.artists?.map(v => {
      const spotifyLink = (v.external_urls?.spotify
        ? v.external_urls?.spotify
        : '/') as unknown as ExternalUrls;
      if (artistImgUrls) {
        return { img: artistImgUrls.get(v.id) as string, link: spotifyLink };
      } else {
        return { img: PLACEHOLDER_IMAGE, link: spotifyLink };
      }
    });
  }, [item?.artists, artistImgUrls]);
  return artistInfo;
};
