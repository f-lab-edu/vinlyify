import { PAGE } from '@/constants/url';
import { useNavigate } from 'react-router-dom';

import KeycapButton from '../_shared/Button/KeycapButton';
import { TAB } from '../Search/_components/Tab/constants';

const TAB_LABEL = {
  albums: '앨범',
  artists: '아티스트',
  tracks: '트랙',
  playlists: '플레이리스트',
} as const;

export default function NavigateSearch() {
  const navigate = useNavigate();

  return (
    <div className="inline-flex gap-4 w-full px-4">
      {Object.values(TAB).map(tab => (
        <KeycapButton
          className="w-full"
          key={tab}
          onClick={() => navigate(`${PAGE.SEARCH}?scope=${tab}`)}
        >
          {TAB_LABEL[tab as keyof typeof TAB_LABEL]} 검색
        </KeycapButton>
      ))}
    </div>
  );
}
