import { LOADING_IMAGE } from '@/constants/image';
import { ExternalUrls } from '@/models/MetaInfo';
import { Artist } from '@/models/Profile';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../Image';
import Style from './profile.module.scss';

const style = classNames.bind(Style);

export interface ProfileInfo {
  img: string;
  key?: string;
  link?: Artist['external_urls'];
}

const LoadingProfile = () => {
  return (
    <div className={style('profile-container')}>
      <div className={style('single')} data-collaborators="2">
        <Link className={style('account-photo', 'skeleton')} to={'#'}>
          <div className={style('mask')}>
            <img className={style('photo')} src={LOADING_IMAGE} alt="loading" />
          </div>
        </Link>
      </div>
    </div>
  );
};

const Profile = ({ profile }: { profile: ProfileInfo }) => {
  const link = (profile?.link ?? '#') as unknown as ExternalUrls['spotify'];

  return (
    <div className={style('profile')}>
      <Link
        className={style('account-photo')}
        to={link}
        aria-disabled={profile?.link == null}
      >
        <div className={style('mask')}>
          <Image url={profile.img} classNameArr={[]} />
        </div>
      </Link>
    </div>
  );
};

Profile.Loading = LoadingProfile;

export default Profile;
