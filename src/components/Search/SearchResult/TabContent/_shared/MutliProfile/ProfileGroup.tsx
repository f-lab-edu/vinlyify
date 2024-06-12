import { PLACEHOLDER_IMAGE } from '@/constants/image';
import Profile, { ProfileInfo } from './Profile';

const ProfileGroup = ({ profile }: { profile: ProfileInfo[] }) => {
  if (profile == null) {
    return <Profile profile={{ img: PLACEHOLDER_IMAGE }} />;
  }
  return profile.map(v => {
    return <Profile key={v.img} profile={v} />;
  });
};
export default ProfileGroup;
