import { ExternalUrls } from '@/models/MetaInfo';
import { Artist } from '@/models/Profile';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../Image';

export interface ProfileInfo {
  img: string;
  key?: string;
  link?: Artist['external_urls'];
}

const Profile = ({ profile }: { profile: ProfileInfo }) => {
  const link = (profile?.link ?? '#') as unknown as ExternalUrls['spotify'];

  return (
    <div className={classNames('profile')}>
      <Link
        className={classNames('account-photo')}
        to={link}
        aria-disabled={profile?.link == null}
      >
        <div className="mask">
          <Image url={profile.img} classNameArr={['photo']} />
        </div>
      </Link>
    </div>
  );
};

export default Profile;
