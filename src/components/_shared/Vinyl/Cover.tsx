import { BLACK_TEXTURE } from '@/constants/image';

const Cover = ({ imgUrl }: { imgUrl?: string }) => {
  return (
    <img
      src={imgUrl}
      alt={imgUrl}
      className={`absolute top-0 left-0 z-1 aspect-square bg-size-[100%_100%] before:[background-size:100%_100%] shadow-(--shadow-cover) rounded-[4px] before:content-[''] before:mix-blend-screen before:bg-[url(${BLACK_TEXTURE})] before:opacity-80 after:opacity-20`}
    />
  );
};
export default Cover;
