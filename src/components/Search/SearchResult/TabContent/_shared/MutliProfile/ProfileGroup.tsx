import classNames from 'classnames/bind';
import Style from './ellipses.module.scss';
import Profile, { ProfileInfo } from './Profile';

const style = classNames.bind(Style);

const ProfileGroup = ({ profile }: { profile: ProfileInfo[] }) => {
  return (
    <>
      {profile.slice(0, 4).map(v => (
        <Profile key={v.img} profile={v} />
      ))}
      {profile.length < 4 ? null : (
        <>
          <span className={style('ellipses', 'wrap')}>
            <span>...</span>
          </span>
        </>
      )}
    </>
  );
};
export default ProfileGroup;
