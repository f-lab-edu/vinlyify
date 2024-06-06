import { PLACEHOLDER_IMAGE } from '@/constants';
import { Link } from 'react-router-dom';
import './multi-profile.scss';
const DefaultProfile = () => {
  return (
    <div className="author">
      <Link className="card-user account-photo" to={'#'}>
        <div className="mask">
          <img alt="not available" src={PLACEHOLDER_IMAGE} className="photo" />
        </div>
      </Link>
    </div>
  );
};

export default DefaultProfile;
