import { Artist } from '@/models/profile';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

interface MulitpleProfileImageProps {
  artist: Artist[];
  dataCollaborators: '2';
}

const MulitpleProfileImages: FC<MulitpleProfileImageProps> = ({
  artist,
  dataCollaborators,
}) => {
  return (
    <ul
      className={classNames('MulitpleProfileImages', 'authors-container', {
        dataCollaborators,
      })}
    >
      {artist?.map(v => (
        <li className="author" key={v?.id}>
          <Link
            className="card-user account-photo"
            to={`${v?.external_urls?.spotify}`}
          >
            <div className="mask">
              {v?.images ? (
                <img src={v?.images[0]?.url} className="photo" />
              ) : (
                <>{v?.name}</>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MulitpleProfileImages;
