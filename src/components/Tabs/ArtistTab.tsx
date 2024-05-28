import { getPage } from '@/api/spotify';
import { SearchResult } from '@/models/searchResult';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FlexWrap from '../common/FlexWrap';
import Paging from '../common/Pagination';
import ProfileImage from '../common/ProfileImage';

export default function ArtistTab({
  tabItem,
}: {
  tabItem: SearchResult['artists'];
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

  const pageHandler = (
    url: SearchResult['artists']['next'] | SearchResult['artists']['previous'],
  ) => {
    if (url) {
      getPage(url).then(v => setCurrentTabPageItem(v['artists']));
    }
  };

  useMemo(() => {
    setCurrentTabPageItem(tabItem);
  }, [tabItem]);

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
      {currentTabPageItem.items.map(item => (
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
            <div>followers: {item?.followers?.total}</div>
            <div>
              genres:{' '}
              {item?.genres?.map(genre => <span key={genre}>{genre}</span>)}
            </div>
            <div>popularity: {item?.popularity}</div>
            <div>artist type: {item?.type}</div>
          </section>
        </FlexWrap>
      ))}
    </>
  );
}
