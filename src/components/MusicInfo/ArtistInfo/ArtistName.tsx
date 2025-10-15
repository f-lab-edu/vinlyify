const ArtistName = ({ artistName = '' }: { artistName?: string }) => {
  return <span className={'text-(length:--text-fluid-xl)'}>{artistName} </span>;
};

export default ArtistName;
