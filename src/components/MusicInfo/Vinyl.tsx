import { Image } from '@/models/MetaInfo';
import Album from './Album';
import Cover from './Cover';
import FixedWrap from './FixedWrap';
import Print from './Print';
import VinylBody from './VinylBody';

export default function Vinyl({ imgUrl }: { imgUrl: Image['url'] }) {
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
