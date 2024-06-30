import Profile, { ProfileInfo } from './Profile';

const ProfileGroup = ({ profile }: { profile: ProfileInfo[] }) => {
  return profile.map(v => {
    return <Profile key={v.img} profile={v} />;
  });
};
export default ProfileGroup;
