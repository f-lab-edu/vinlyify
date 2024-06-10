import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants';

import { ExternalUrls } from '@/models/MetaInfo';
import { Artist } from '@/models/Profile';
import classNames from 'classnames';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

export interface ProfileInfo {
  img: string;
  key?: string;
  link?: Artist['external_urls'];
}

const Profile = ({ profile }: { profile: ProfileInfo }) => {
  return (
    <div className={classNames('profile')}>
      <Link
        className={classNames('account-photo')}
        to={
          (profile?.link
            ? profile.link
            : '#') as unknown as ExternalUrls['spotify']
        }
        aria-disabled={profile?.link == null}
      >
        <div className="mask">
          <Suspense
            fallback={
              <img
                alt={profile.img}
                src={LOADING_IMAGE}
                className={classNames('photo', 'skeleton')}
              />
            }
          >
            <img
              src={profile.img}
              className={classNames('photo')}
              loading="lazy"
              alt={PLACEHOLDER_IMAGE}
            />
          </Suspense>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
