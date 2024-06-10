import { useMemo } from 'react';

import { LOADING_IMAGE } from '@/constants/image';
import classNames from 'classnames';
import './multi-profile.scss';
import Profile, { ProfileInfo } from './Profile';
import ProfileGroup from './ProfileGroup';

const MultiProfile = ({ artist }: { artist: ProfileInfo[] }) => {
  const artistProfiles = useMemo(() => artist?.filter(v => v.img), [artist]);
  return (
    <div className={classNames('profile-container')}>
      <div className={classNames('profiles-container')} data-collaborators="2">
        {artistProfiles == null ? (
          <Profile profile={{ img: LOADING_IMAGE }} />
        ) : (
          <ProfileGroup profile={artistProfiles} />
        )}
      </div>
    </div>
  );
};

export default MultiProfile;
