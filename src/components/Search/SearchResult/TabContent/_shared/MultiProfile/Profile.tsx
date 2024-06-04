import { Link, LinkProps } from 'react-router-dom';
import { ProfileInfo } from '.';

const Profile = ({ profile }: { profile: ProfileInfo[] }) => {
  return profile.map(v => {
    return (
      <div className="author" key={v?.img}>
        <Link
          className="card-user account-photo"
          to={v.link as unknown as LinkProps['to']}
        >
          <div className="mask">
            <img src={v.img} className="photo" />
          </div>
        </Link>
      </div>
    );
  });
};
export default Profile;
