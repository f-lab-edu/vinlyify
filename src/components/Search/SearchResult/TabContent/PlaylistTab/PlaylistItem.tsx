import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

const PlaylistItem = ({ item }: { item: Playlist }) => {
  /**
   * 플레이리스트 설명은 html로 되어 있는데,
   * a href=spotify:playlist을 포함하면 링크 태그로 파싱해주고,
   * 아닌 경우 일반 text로 리턴
   */
  const parsedDescriptionWithLink = useMemo(() => {
    const regex =
      /(?:<a href=)(spotify:playlist:[^~]*?)(?:>)([^~]*?)(?:<\/a>)/g;
    const regexExclude = /(?:<a href=[^~]*?>[^~]*?<\/a>)/g;
    const matches: ReactNode[] = [];

    if (item?.description.match(regex)) {
      for (let matchingItem of item?.description.matchAll(regex)) {
        matches.push(<Link to={matchingItem[1]}>{matchingItem[2]}</Link>);
      }
      const filtered = item?.description
        .split(regexExclude)
        .filter(divider => divider !== '');

      return matches.reduce((acc, curr, i) => {
        acc = [acc, curr, filtered[i]];
        return acc;
      }, []);
    }
    return item.description;
  }, [item.description]);

  return (
    <Card
      title={item?.name}
      title_tag={`by. ${item?.owner?.display_name}`}
      topContent={
        item?.images ? (
          <CoverImage
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
            url={item?.external_urls?.spotify}
          />
        ) : (
          <CoverImageSkeleton />
        )
      }
      contextUri={item?.uri}
      isPlayable={true}
    >
      <li>total tracks : {item?.tracks?.total}</li>

      <li>
        <div className={style('playlist-item')}>
          {parsedDescriptionWithLink}
        </div>
      </li>
    </Card>
  );
};

export default PlaylistItem;
