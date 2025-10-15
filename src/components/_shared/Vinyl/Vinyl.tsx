import { Image } from '@/models/MetaInfo';
import FixedWrap from '../../MusicInfo/_shared/FixedWrap';
import Album from './Album';
import Cover from './Cover';
import Print from './Print';
import VinylBody from './VinylBody';

export default function Vinyl({ imgUrl }: Readonly<{ imgUrl: Image['url'] }>) {
  return (
    <FixedWrap>
      <Album>
        <Cover imgUrl={imgUrl} />
        <VinylBody imgUrl={imgUrl}>
          <Print />
        </VinylBody>
      </Album>
    </FixedWrap>
  );
}
