import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';
import { HitResponse } from '@/models/Lyrics';

/**
 * 가사 검색 결과(searchResult) 정확성을 높이기 위해 좀 더 엄격하게 검색 결과를 걸러 주기 위한 boolean 값을 리턴하는 유틸 함수입니다.
 */
export const isValidLyrics = ({
  searchResult,
  artist,
  term,
}: {
  searchResult: HitResponse['result'];
  artist: CurrentTrackSearchParam['artist'];
  term: CurrentTrackSearchParam['term'];
}) => {
  if (
    // 가사 완성 상태가 'complete' (완성)인지 체크
    searchResult.lyrics_state === 'complete' &&
    // 가사로의 링크가 -lyrics를 포함여부
    RegExp(/-lyrics$/).exec(searchResult?.path) &&
    // 아티스트 명 혹은 가사 명을 포함하는 지 체크
    (RegExp(artist.toLowerCase()).exec(
      searchResult?.primary_artist_names.toLowerCase(),
    ) ||
      RegExp(term.toLowerCase()).exec(searchResult?.title.toLowerCase()))
  ) {
    return true;
  }
  return false;
};
