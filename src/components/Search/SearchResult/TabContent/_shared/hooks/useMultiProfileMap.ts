import { getArtists } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Album } from '@/models/Album';
import { Track } from '@/models/Track';
import { useEffect, useMemo, useState } from 'react';

export const useMultiProfileMap = ({
  tabItem,
}: {
  tabItem: Track[] | Album[];
}) => {
  const [artistImgs, setArtistImgs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (tabItem !== undefined && tabItem?.length > 0) {
      getArtists([
        ...new Set(
          tabItem?.map(item => item?.artists?.map(artist => artist.id)).flat(1),
        ),
      ]).then(v => {
        const result = v.reduce((acc, curr) => {
          if (curr['images']) {
            return acc.set(`${curr['id']}`, curr['images'][0].url);
          }
          return acc.set(`${curr['id']}`, PLACEHOLDER_IMAGE);
        }, new Map()) as Map<string, string>;
        setArtistImgs(result);
      });
    }
  }, [tabItem]);

  return useMemo(() => artistImgs, [artistImgs]); // 참조 안정성 보장 + 재연산/랜더링 방지
};
