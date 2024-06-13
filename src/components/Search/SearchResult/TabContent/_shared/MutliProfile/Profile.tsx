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

export default Profile;
