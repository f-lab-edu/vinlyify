import MultipleArtist from './ArtistInfo/MultipleArtist';
import SingleArtist from './ArtistInfo/SingleArtist';

export default function ArtistInfoSection({
  artistId,
}: Readonly<{
  artistId: string[] | undefined;
}>) {
  if (artistId == null) {
    return null;
  }
  if (artistId.length > 1) {
    return <MultipleArtist artistId={artistId} />;
  }
  return <SingleArtist artistId={artistId[0]} />;
}
