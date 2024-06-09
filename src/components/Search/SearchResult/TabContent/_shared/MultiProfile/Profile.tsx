import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants';
import { Suspense } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ProfileInfo } from '.';
import DefaultProfile from './DefaultProfile';

const Profile = ({ profile }: { profile: ProfileInfo[] }) => {
  if (profile === undefined) {
    return <DefaultProfile />;
  }
  return profile?.map(v => {
    return (
      <div className="author" key={v?.img}>
        <Link
          className="card-user account-photo"
          to={v.link as unknown as LinkProps['to']}
        >
          <div className="mask">
            <Suspense
              fallback={
                <img alt={v.img} src={LOADING_IMAGE} className="photo" />
              }
            >
              <img
                src={v.img}
                className="photo"
                loading="lazy"
                alt={PLACEHOLDER_IMAGE}
              />
            </Suspense>
          </div>
        </Link>
      </div>
    );
  });
};
export default Profile;
