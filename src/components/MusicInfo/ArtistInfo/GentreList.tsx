import Badge, { VARIANTS } from '@/components/_shared/Badge';
import { Artist } from '@/models/Profile';

export default function GenreList({
  genres,
}: Readonly<{
  genres: Artist['genres'];
}>) {
  return (
    <span className="inline-flex gap-4 align-middle pb-2">
      {genres?.map((genre, index) => (
        <Badge
          key={genre}
          disabled={true}
          className="h-6 p-1! pb-1.5!"
          variant={
            Object.keys(VARIANTS)[
              index % Object.keys(VARIANTS).length
            ] as keyof typeof VARIANTS
          }
        >
          {genre}
        </Badge>
      ))}
    </span>
  );
}
