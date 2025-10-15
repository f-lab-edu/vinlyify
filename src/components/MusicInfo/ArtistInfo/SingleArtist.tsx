import { useArtistProfileLink } from '@/hooks/query/useArtistProfileLink';
import { useErrorNotifications } from '@/hooks/useErrorNotifications';
import ArtistInfoCard from './ArtistInfoCard';

export default function SingleArtist({
  artistId,
}: Readonly<{
  artistId: string;
}>) {
  const { data, isError, isSuccess, error, isLoading } = useArtistProfileLink({
    artistId,
  });
  const { showErrorToast } = useErrorNotifications({
    isError,
    errorMsg: error?.name,
    toastId: error?.message,
  });
  if (isLoading) {
    return <>loading...</>;
  }
  if (isSuccess && data == null) {
    return null;
  }

  if (error) {
    showErrorToast();
  }
  return (
    <span
      className={`inline-grid pt-4
                  grid-cols-1
                  gap-x-4 mx-auto
                 col-span-full
                   gap-4 
                  w-full`}
    >
      {data?.id == null ? <>id is null</> : <ArtistInfoCard artist={data} />}
    </span>
  );
}
