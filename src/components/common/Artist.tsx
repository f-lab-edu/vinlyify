import { Artist } from '@/models/profile';

export default function Artists({ artists }: { artists: Artist[] | null }) {
  return <>{JSON.stringify(artists)}</>;
}
