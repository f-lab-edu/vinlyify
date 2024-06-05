import { PLACEHOLDER_IMAGE } from '@/constants';
import { Suspense } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ProfileInfo } from '.';

const Profile = ({ profile }: { profile: ProfileInfo[] }) => {
  return profile?.map(v => {
    return (
      <div className="author" key={v?.img}>
        <Link
          className="card-user account-photo"
          to={v.link as unknown as LinkProps['to']}
        >
          <div className="mask">
            <Suspense
              fallback={<img src={PLACEHOLDER_IMAGE} className="photo" />}
            >
              <img src={v.img} className="photo" loading="lazy" alt={v.img} />
            </Suspense>
          </div>
        </Link>
      </div>
    );
  });
};
export default Profile;
