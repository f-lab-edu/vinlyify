import { LOADING_IMAGE } from '@/constants/image';
import { useArtistProfileLink } from '@/hooks/query/useArtistProfileLink';
import { useErrorNotifications } from '@/hooks/useErrorNotifications';
import Profile from './Profile';

const SingleArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data, isError, isSuccess, error, isLoading } = useArtistProfileLink({
    artistId,
  });
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.name,
    toastId: error?.message,
  });
  if (isLoading) {
    return <Profile profile={{ imgUrl: LOADING_IMAGE }} />;
  }
  if (isSuccess && data == null) {
    return null;
  }

  if (error) {
    showErrorToast();
  }

  return (
    <div>
      <Profile
        profile={{
          externalUrl: data?.external_urls?.spotify,
          imgUrl: data?.images?.[data?.images?.length - 1]?.url,
        }}
      />
    </div>
  );
};

export default SingleArtistProfile;
