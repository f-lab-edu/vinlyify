import { getArtists, getPage } from '@/api/spotify';
import { Artist } from '@/models/profile';
import { SearchResult } from '@/models/searchResult';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FlexWrap from '../common/FlexWrap';
import Paging from '../common/Pagination';
import ProfileImage from '../common/ProfileImage';
import MulitpleProfileImages from '../common/ProfileImage/MultipleProfiles';

export default function AlbumTab({
  tabItem,
}: {
  tabItem: SearchResult['albums'];
}) {
  const [currentTabPageItem, setCurrentTabPageItem] = useState(tabItem);
  const [pages] = useState(
    Array.from(
      {
        length:
          Math.ceil(tabItem.total / tabItem.limit) >= 5
            ? 5
            : Math.ceil(tabItem.total / tabItem.limit),
      },
      () => tabItem.href,
    ).map((v, i) => v.replace('&offset=0', `&offset=${i * 20}`)),
  );
  const [albumArtists] = useState(
    [
      ...new Set(
        tabItem.items.map(v => v.artists.map(artists => artists.id)).flat(),
      ),
    ].map(v => ({ id: v, content: null })),
  );

  const [albumArtistDetail, setAlbumArtistDetail] = useState(
    tabItem.items.map(v => v.artists.map(artists => artists.id)),
  );

  const pageHandler = (
    url: SearchResult['albums']['next'] | SearchResult['albums']['previous'],
  ) => {
    if (url) {
      getPage(url).then(v => setCurrentTabPageItem(v['albums']));
    }
  };

  useMemo(() => {
    setCurrentTabPageItem(tabItem);
  }, [tabItem]);
  // 해당 부분은 너무 의존성배열 복잡해져서 고민..
  useEffect(() => {
    getArtists(albumArtists.map(artist => artist.id))
      .then(v => {
        const newAlbumArtist = [...albumArtists].reduce((acc, artist) => {
          const detail = v.filter(a => a.id === artist.id);
          acc[artist.id] = detail as Artist[];
          return acc;
        }, {});
        return newAlbumArtist;
      })
      .then(v => {
        setAlbumArtistDetail(
          albumArtistDetail.map(items => items.map(id => v[id]).flat()),
        );
      });
  }, []);

  return (
    <>
      <Paging
        pages={pages}
        pageHandler={pageHandler}
        next={currentTabPageItem.next}
        href={currentTabPageItem.href}
        offset={currentTabPageItem.offset}
        limit={currentTabPageItem.limit}
        previous={currentTabPageItem.previous}
        total={currentTabPageItem?.total}
      />
      {currentTabPageItem.items.map((item, i) => (
        <FlexWrap key={item?.id}>
          <Link to={`${item?.external_urls?.spotify}`}>
            <ProfileImage
              src={`${item?.images?.at(0)?.url}`}
              size="large"
              round={false}
            />
          </Link>
          <section>
            <h1>{item?.name}</h1>
            <div>album type: {item?.album_type}</div>
            <Link to={`${item?.external_urls?.spotify}`}>external link</Link>
            <Link to={`${item?.href}`}>link to album</Link>
            <div>song id: {item?.id}</div>
            <div>release date : {item?.release_date}</div>
            <div>total tracks : {item?.total_tracks}</div>
            <div>type: {item?.type}</div>
            <MulitpleProfileImages artist={albumArtistDetail[i]} />
          </section>
        </FlexWrap>
      ))}
    </>
  );
}
