import { playTrack } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Playlist } from '@/models/Playlist';
import Card from '../_shared/Card';
import Logo from '../_shared/Logo';
import PlayButton from '../_shared/PlayButton';
import ProfileImage from '../_shared/ProfileImage';
import './playlist-item.scss';

const PlaylistItem = ({ item }: { item: Playlist }) => {
  const onPlayCurrentAlbum = () => playTrack({ context_uris: item?.uri });

  function createMarkup(text: string) {
    return { __html: text };
  }

  return (
    <Card
      title={item?.name}
      title_tag={`by. ${item?.owner?.display_name}`}
      left={
        <ProfileImage
          imgUrl={
            item?.images === undefined
              ? PLACEHOLDER_IMAGE
              : item?.images[0]?.url
          }
          link={<Logo url={item?.external_urls?.spotify ?? ''} />}
        />
      }
      playButton={<PlayButton onPlayCurrent={onPlayCurrentAlbum} />}
    >
      <li>total tracks : {item?.tracks?.total}</li>

      <li>
        <div
          dangerouslySetInnerHTML={createMarkup(item.description)}
          className="playlist-info"
        ></div>
      </li>
    </Card>
  );
};

export default PlaylistItem;
