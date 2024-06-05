// import Paging from '../_shared/Paging';
import { getArtists } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { useEffect, useState } from 'react';
// import { CurrentTabItemType } from '..';
import { Album } from '@/models/Album';
import AlbumList from './AlbumList';

const AlbumTab = ({
  tabItem,
  // pagingInfo,
}: {
  tabItem: Album[];
  // pagingInfo: Pagination;
}) => {
  const [artistImgs, setArtistImgs] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (tabItem.length > 0) {
      getArtists([
        ...new Set(
          tabItem?.map(item => item.artists.map(artist => artist.id)).flat(1),
        ),
      ]).then(v => {
        const res = v.reduce((acc, curr) => {
          if (curr['images']) {
            return acc.set(`${curr['id']}`, curr['images'][0].url);
          }
          return acc.set(`${curr['id']}`, PLACEHOLDER_IMAGE);
        }, new Map()) as Map<string, string>;
        setArtistImgs(res);
      });
    }
  }, [tabItem]);
  return (
    <>
      {/* {JSON.stringify(pagingInfo)} */}
      {/* <Paging pagingInfo={pagingInfo} /> */}
      <AlbumList tabItem={tabItem} artistImgUrls={artistImgs} />
    </>
  );
};

export default AlbumTab;
