import { PLACEHOLDER_IMAGE } from '@/constants';
import { Album } from '@/models/Album';
import { ExternalUrls, Image, MetaInfo } from '@/models/MetaInfo';
import { Track } from '@/models/track';

import { useMemo } from 'react';

/**
 * 트랙과 앨범에서 아티스트 정보를
 * useMultiProfileMap에서 {'아티스트의 id':'아티스트 이미지 url'}의
 * id에 해당되는 이미지와 스포티파이 링크를 {img: 아티스트 이미지 url, link :아티스트 spotify url}로
 */

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
