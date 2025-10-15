import { Link } from 'react-router-dom';
import Image from '../Image';
import { SKELETON_PROFILE } from './MultipleArtistProfile';

export type ProfileProps = {
  externalUrl?: string;
  imgUrl?: string;
};

const Profile = ({ profile }: { profile: ProfileProps }) => {
  return (
    <div
      className={`inline-block nth-[1]:z-[100] nth-[2]:z-[99] nth-[2]:ml-[-20px] ${profile?.imgUrl === SKELETON_PROFILE.imgUrl ? '' : 'nth-[2]:animate-slide nth-[3]:animate-slide  nth-[4]:animate-slide '} nth-[3]:z-[98] nth-[3]:ml-[-20px]  nth-[4]:z-[97] nth-[4]:ml-[-20px] group-hover:opacity-60 hover:!opacity-100 hover:!z-[100]`}
    >
      <Link
        className={
          'relative w-12 h-12 block m-0 ml-auto mr-auto rounded-full border-(--grey-700) border-3 border-solid [&>img]:w-full'
        }
        to={profile.externalUrl ?? '#'}
        aria-disabled={profile.externalUrl == null}
      >
        <div
          className={`
          w-full h-full overflow-hidden block rounded-full bg-(--light-grey-400)
          `}
        >
          <Image url={profile?.imgUrl} />
        </div>
      </Link>
    </div>
  );
};

export default Profile;
