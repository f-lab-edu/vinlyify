import { getArtists } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Album } from '@/models/Album';
import { Track } from '@/models/track';

import { useEffect, useMemo, useState } from 'react';

/**
 * Track 탭과 Album 탭에서 아티스트 멀티 프로필을
 * set으로 중복제거하여 api 호출 후
 * {'아티스트의 id':'아티스트 이미지 url'} 형태의 배열로 리턴
 */
export const useMultiProfileMap = ({
  tabItem,
}: {
  tabItem: Track[] | Album[];
}) => {
  const [artistImgs, setArtistImgs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (tabItem !== undefined && tabItem?.length > 0) {
      getArtists(
        tabItem?.map(item => item?.artists?.map(artist => artist.id)).flat(1),
      ).then(v => {
        const result = v.reduce((acc, curr) => {
          if (curr['images']) {
            return acc.set(`${curr['id']}`, curr['images'][0]?.url);
          }
          return acc.set(`${curr['id']}`, PLACEHOLDER_IMAGE);
        }, new Map()) as Map<string, string>;
        setArtistImgs(result);
      });
    }
  }, [tabItem]);

  return useMemo(() => artistImgs, [artistImgs]);
};
