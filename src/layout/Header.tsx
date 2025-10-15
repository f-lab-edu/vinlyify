import KeycapButton from '@/components/_shared/Button/KeycapButton';
import HomeIcon from '@/components/_shared/Icons/Home';
import MusicIcon from '@/components/_shared/Icons/Music';
import SearchIcon from '@/components/_shared/Icons/Search';

import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';

import { useLocation, useNavigate } from 'react-router-dom';

import VinylifyIcon from '@/components/_shared/Icons/Vinylify';
import { useEffect, useState } from 'react';
import AuthButton from './AuthButton';

const buttons = {
  SEARCH: { url: PAGE.SEARCH, Component: <SearchIcon /> },
  HOME: { url: PAGE.MAIN, Component: <HomeIcon /> },
  LOGO: { url: PAGE.MAIN, Component: <VinylifyIcon /> },
  MUSIC_INFO: { url: PAGE.MUSIC_INFO, Component: <MusicIcon /> },
};

const KeyCapButtons = (
  btn: keyof typeof buttons,
  setPageUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
  const currentPage = useLocation();

  return (
    <KeycapButton
      onClick={() => setPageUrl(buttons[btn].url)}
      className={
        currentPage.pathname == buttons[btn].url
          ? 'bg-(--grey-900)! text-(--grey-100)!'
          : ''
      }
    >
      {buttons[btn].Component}
    </KeycapButton>
  );
};

const Header = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    navigate(pageUrl);
  }, [pageUrl]);

  return (
    <header className="w-full inline-flex pl-3 pr-3 pt-1 ">
      {KeyCapButtons('LOGO', setPageUrl)}

      <div className="w-full items-center gap-1.5 inline-flex justify-end-safe">
        {KeyCapButtons('HOME', setPageUrl)}
        {!validToken ? (
          <AuthButton action="LOGIN" />
        ) : (
          <>
            {KeyCapButtons('SEARCH', setPageUrl)}
            {KeyCapButtons('MUSIC_INFO', setPageUrl)}
            <AuthButton action="LOGOUT" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
