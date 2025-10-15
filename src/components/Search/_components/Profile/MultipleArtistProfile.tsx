import { LOADING_IMAGE } from '@/constants/image';
import { useMultipleArtistProfileLink } from '@/hooks/query/useMultipleArtistProfileLink';
import Profile from './Profile';

export const SKELETON_PROFILE = {
  imgUrl: LOADING_IMAGE,
  id: `skeleton-profile`,
};

const MultipleArtistProfile = ({ artistId }: { artistId: string[] }) => {
  const { data, pending } = useMultipleArtistProfileLink({
    artistId,
  });

  if (pending) {
    return (
      <div>
        <Profile
          key={SKELETON_PROFILE.id}
          profile={{
            imgUrl: SKELETON_PROFILE.imgUrl,
          }}
        />
      </div>
    );
  }

  return (
    <div className="profiles-container group inline-flex">
      {data?.slice(0, 4).map((profile, index) => (
        <Profile
          key={`${artistId.join('-')}-${profile?.id ?? SKELETON_PROFILE.id + '-' + index}`}
          profile={{
            externalUrl: profile?.external_urls?.spotify,
            imgUrl:
              profile?.id == null
                ? SKELETON_PROFILE.imgUrl
                : profile?.images?.[profile?.images?.length - 1]?.url,
          }}
        />
      ))}
      {data?.length < 4 ? null : (
        <span className="inline-flex pl-1 align-middle text-[length:2rem] animate-slide-ellipses">
          ...
        </span>
      )}
    </div>
  );
};

export default MultipleArtistProfile;
