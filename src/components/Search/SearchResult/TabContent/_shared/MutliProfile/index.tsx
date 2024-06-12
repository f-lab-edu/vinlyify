import { LOADING_IMAGE } from '@/constants/image';
import classNames from 'classnames';
import './multi-profile.scss';
import Profile, { ProfileInfo } from './Profile';
import ProfileGroup from './ProfileGroup';

const MultiProfile = ({ artist }: { artist: ProfileInfo[] }) => {
  if (artist?.length === 0) return null;
  return (
    <div className={classNames('profile-container')}>
      <div className={classNames('profiles-container')} data-collaborators="2">
        {artist == null ? (
          <Profile profile={{ img: LOADING_IMAGE }} />
        ) : (
          <ProfileGroup profile={artist} />
        )}
      </div>
    </div>
  );
};

export default MultiProfile;
