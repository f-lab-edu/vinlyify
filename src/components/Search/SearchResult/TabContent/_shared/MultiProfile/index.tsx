import { Artist } from '@/models/Profile';
import { useMemo } from 'react';
import LoadingProfile from './LoadingImage';
import './multi-profile.scss';
import Profile from './Profile';

export interface ProfileInfo {
  img: string;
  link: Artist['external_urls'];
}

const MultiProfile = ({ artist }: { artist: ProfileInfo[] }) => {
  const artistProfiles = useMemo(() => artist?.filter(v => v.img), [artist]);

  if (artistProfiles === undefined) {
    return <LoadingProfile />;
  }

  return (
    <div className="profile-container">
      <div className="authors-container" data-collaborators="2">
        <Profile profile={artistProfiles} />
      </div>
    </div>
  );
};

export default MultiProfile;
