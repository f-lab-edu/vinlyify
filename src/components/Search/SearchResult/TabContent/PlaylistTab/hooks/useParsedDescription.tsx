/**
 * 플레이리스트 설명은 html로 되어 있는데,
 * a href를 포함하면 링크 태그로 파싱해주고, 아닌 경우 일반 text로 리턴
 */

import { Playlist } from '@/models/Playlist';
import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';

const useParsedDescription = (item: Playlist) => {
  const parsedDescriptionWithLink = useMemo(() => {
    const aTagRegex =
      /(?:<a href=)(?:\\")?([^~]*?)(?:\\")?(?:>)([^~]*?)(?:<\/a>)/g;
    const regexExcludeATag = /(?:<a href=[^~]*?>[^~]*?<\/a>)/g;
    const matches: ReactNode[] = [];

    if (item?.description.match(aTagRegex)) {
      for (let matchingItem of item?.description.matchAll(aTagRegex)) {
        const [, url, link_tag] = matchingItem;
        matches.push(<Link to={url.replaceAll('"', '')}>{link_tag}</Link>);
      }
      const filteredLinkTag: ReactNode[] = item?.description
        .split(regexExcludeATag)
        .filter(divider => divider !== '');

      if (matches.length > filteredLinkTag.length) {
        return matches.reduce((acc, curr, index) => {
          acc = [acc, curr, filteredLinkTag[index]];
          return acc;
        }, []);
      } else {
        return filteredLinkTag.reduce((acc, curr, index) => {
          acc = [acc, curr, matches[index]];
          return acc;
        }, []);
      }
    }
    return item.description;
  }, [item.description]);
  return parsedDescriptionWithLink;
};

export default useParsedDescription;
