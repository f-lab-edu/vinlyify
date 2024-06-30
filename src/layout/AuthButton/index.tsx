import { API } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';
import classNames from 'classnames/bind';
import Style from './auth-button.module.scss';

const style = classNames.bind(Style);

const logIn = () => {
  window.location.replace(API.LOGIN);
};

const AuthButton = ({ action }: { action: 'LOGIN' | 'LOGOUT' }) => {
  const { logOut } = useAuth();

  return (
    <button
      onClick={action === 'LOGIN' ? logIn : logOut}
      className={style('button', 'auth-button')}
    >
      {action === 'LOGIN' ? '로그인' : '로그아웃'}
    </button>
  );
};

export default AuthButton;
