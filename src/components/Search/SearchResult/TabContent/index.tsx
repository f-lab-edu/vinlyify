// import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { useSearchKeyword } from '@/hooks/query/useSearchKeyword';
import Card from './_shared/Card';
// import CoverImage from './_shared/CoverImage';
import Grid from './_shared/Grid';

export default function SearchResult() {
  const { data, isLoading } = useSearchKeyword();

  if (isLoading) {
    return (
      <Grid>
        {Array.from({ length: 20 }, () => (
          <Card.Skelton />
        ))}
      </Grid>
    );
  }
  return (
    <>{JSON.stringify(data)}</>
    // Card 사용 예
    // <Grid>
    //   {data?.albums.items.map(item => (
    //     <Card
    //       key={item?.id}
    //       title={item?.name}
    //       title_tag={item?.album_type}
    //       isPlayable={item?.is_playable}
    //       contextUri={item?.uri}
    //       topContent={
    //         <CoverImage
    //           imgUrl={
    //             item?.images == null ? PLACEHOLDER_IMAGE : item?.images[0]?.url
    //           }
    //           url={item?.external_urls?.spotify}
    //         />
    //       }
    //     ></Card>
    //   ))}
    // </Grid>
  );
}
