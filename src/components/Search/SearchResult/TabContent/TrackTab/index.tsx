import { Track } from '@/models/Track';

const TracksTab = ({ tabItem }: { tabItem: Track[] }) => {
  //   const [albumArtists, setAlbumArtists] = useState(null);
  //   useEffect(() => {
  // getArtists(
  //   tabItem?.artists.reduce((acc: string, curr, i: number) => {
  //     if (i === 0) return curr?.id;
  //     return `${acc},${curr?.id}`;
  //   }, ''),
  // getArtists(tabItem?.artists?.map(v => v?.id)).then(v =>
  //   setAlbumArtists(v?.artists),
  // );
  //   }, [tabItem]);

  return (
    <>
      {/* <FlexWrap orientation="cl" full={false}>
        <ProfileImage
          src={tabItem?.album?.images[0]?.url}
          sz="9rem"
          round={false}
        />
        {tabItem?.album?.is_playable && (
          <PlayButton
            onClick={() =>
              playTrack({
                context_uris: tabItem?.album?.uri,
                offset: { uri: tabItem?.uri },
              })
            }
          >
            play current track
          </PlayButton>
        )}
      </FlexWrap> */}

      <>
        {JSON.stringify(tabItem)}
        {/* <h2>{tabItem?.name}</h2>
        <div>album type: {tabItem?.album?.album_type}</div>
        <Link to={tabItem?.album?.external_urls?.spotify}>external link</Link>
        <Link to={tabItem?.album?.href}>link to track api</Link>
        <div>song id: {tabItem?.id}</div>
        <div>release date : {tabItem?.album?.release_date}</div>
        <div>total tracks : {tabItem?.album?.total_tracks}</div>
        <div>type: {tabItem?.album?.type}</div>
        <div>track id: {tabItem?.id}</div>

        <div>is local: {tabItem?.is_local || 'false'}</div>
        {tabItem?.album?.preview_url && (
          <iframe
            title="preview"
            src={`${tabItem?.album?.preview_url}&theme=0`}
            loading="lazy"
          />
        )}

        <div>popularity: {tabItem?.popularity}</div> */}
        {/* <Multiple artist={albumArtists} /> */}
      </>
    </>
  );
};

export default TracksTab;
