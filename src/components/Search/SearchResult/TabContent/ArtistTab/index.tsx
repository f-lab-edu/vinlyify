import { Artist } from '@/models/Profile';

const ArtistTab = ({ tabItem }: { tabItem: Artist[] }) => {
  return (
    <>
      {/* <div>
        <ProfileImage src={tabItem?.images[0]?.url} sz="9rem" round={false} />
      </div> */}
      {JSON.stringify(tabItem)}
      {/* <div>
        <Link to={tabItem?.external_urls?.spotify}>external link</Link>
        <div>followers count: {tabItem?.followers?.total}</div>
        <div>
          genres:{' '}
          {tabItem?.genres?.map(genre => <span key={genre}>{genre}</span>)}
        </div>
        <Link to={tabItem?.href}>link to artist</Link>
        <>artist id: {tabItem?.id}</>

        <div>artist name: {tabItem?.name}</div>
        <div>artist popularity: {tabItem?.popularity}</div>
        <div>artist type: {tabItem?.type}</div>
        <div>artist uri: {tabItem?.uri}</div>
      </div> */}
    </>
  );
};

export default ArtistTab;
