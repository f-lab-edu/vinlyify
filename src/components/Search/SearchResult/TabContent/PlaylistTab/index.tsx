import { Playlist } from '@/models/Playlist';

const PlaylistsTab = ({ tabItem }: { tabItem: Playlist[] }) => {
  return (
    <>
      {/* <FlexWrap orientation={'cl'} full={false}>
        <ProfileImage src={tabItem?.images[0]?.url} sz="12rem" round={false} />
        <PlayButton onClick={() => playTrack({ context_uris: tabItem?.uri })}>
          play current playlist
        </PlayButton>
      </FlexWrap> */}

      {/* <ul>
        <h1>{tabItem?.name}</h1>
        <li>collaborative : {`${tabItem?.collaborative}`}</li>
        <li>description : {tabItem?.description || 'nothing to show'}</li>
        <Link to={tabItem?.external_urls?.spotify}>external link</Link>
        <Link to={tabItem?.href}>link to playlist</Link>
        <>playlist id: {tabItem?.id}</>

        <ul>
          playlist owner:
          <>name: {tabItem?.owner?.display_name}</>
          <li>
            external_urls:{' '}
            <Link to={tabItem?.external_urls?.spotify}>external link</Link>
          </li>
          <li>owner id: {tabItem?.owner?.id}</li>
          <li>owner type: {tabItem?.owner?.type}</li>
          <li>owner uri: {tabItem?.owner?.uri}</li>
        </ul>
        {tabItem?.primary?.color && (
          <li>primary color: {tabItem?.primary?.color}</li>
        )}
        {tabItem?.public && <div>public: {`${tabItem?.public}`}</div>}

        <li>snapshot id: {tabItem?.snapshot_id}</li>
        <li>
          tracks: <Link to={tabItem?.tracks?.href}>playlist link</Link> total
          tracks: {tabItem?.tracks?.total}
        </li>

        <li>type: {tabItem?.type}</li>
      </ul> */}
      {JSON.stringify(tabItem)}
    </>
  );
};

export default PlaylistsTab;
