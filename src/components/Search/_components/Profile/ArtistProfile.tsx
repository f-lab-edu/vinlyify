import MultipleArtistProfile from './MultipleArtistProfile';
import SingleArtistProfile from './SingleProfile';

const ArtistProfile = ({ artists }: { artists: string[] }) => {
  if (artists.length == 0) return null;

  if (artists.length > 1) {
    return <MultipleArtistProfile artistId={artists} />;
  }
  return <SingleArtistProfile artistId={artists[0]} />;
};

export default ArtistProfile;
