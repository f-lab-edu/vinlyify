import { LOADING_IMAGE } from '@/constants';
import { Link } from 'react-router-dom';
import './multi-profile.scss';

const LoadingProfile = () => {
  return (
    <div className="profile-container">
      <div className="authors-container" data-collaborators="2">
        <div className="author">
          <Link className="card-user account-photo" to={'#'}>
            <div className="mask">
              <img
                className="photo skeleton"
                src={LOADING_IMAGE}
                alt="loading"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoadingProfile;
