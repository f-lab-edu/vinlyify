import { API } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import classNames from 'classnames/bind';
import { useMemo } from 'react';
import Style from './auth-button.module.scss';

const style = classNames.bind(Style);

const logIn = () => {
  window.location.replace(API.LOGIN);
};

const AuthButton = ({ action }: { action: 'LOGIN' | 'LOGOUT' }) => {
  const { logOut } = useAuth();

  const AuthAction = useMemo(
    () => ({
      LOGIN: { tag: '로그인', action: logIn },
      LOGOUT: { tag: '로그아웃', action: logOut },
    }),
    [logOut],
  );

  return (
    <button
      onClick={AuthAction[action].action}
      className={style('button', 'auth-button')}
    >
      {AuthAction[action].tag}
    </button>
  );
};

export default AuthButton;
