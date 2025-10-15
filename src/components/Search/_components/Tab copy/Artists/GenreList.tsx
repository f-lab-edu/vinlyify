import Badge, { VARIANTS } from '@/components/_shared/Badge';

const GenreList = ({ genres }: { genres: string[] }) => {
  return (
    <div className="inline-flex gap-2">
      {genres.map((genre, index) => (
        <Badge
          variant={
            Object.keys(VARIANTS)[
              index % Object.keys(VARIANTS).length
            ] as keyof typeof VARIANTS
          }
          disabled={true}
          key={genre}
          className="w-fit"
        >
          {genre}
        </Badge>
      ))}
    </div>
  );
};

export default GenreList;
