import Profile, { ProfileInfo } from './Profile';

const ProfileGroup = ({ profile }: { profile: ProfileInfo[] }) => {
  return profile.map((profileInfo, index) => {
    return <Profile key={profileInfo.img + index} profile={profileInfo} />;
  });
};
export default ProfileGroup;
