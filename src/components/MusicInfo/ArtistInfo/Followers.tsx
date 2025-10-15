const Followers = ({ followers }: { followers?: number }) => {
  if (followers == null) {
    return null;
  }
  return (
    <span className={'text-(length:--text-fluid-s) text-(--grey-700)'}>
      followers : {followers}
    </span>
  );
};

export default Followers;
