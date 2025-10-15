const PlaylistDescription = ({ description }: { description: string }) => {
  return (
    <li className={'break-all'}>
      <div
        className="[&>a:hover]:text-(--grey-500) [&>a]:text-(--grey-100) [&>a]:underline-offset-1 [&>a]:underline"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </li>
  );
};

export default PlaylistDescription;
