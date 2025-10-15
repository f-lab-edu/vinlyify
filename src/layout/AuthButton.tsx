import KeycapButton from '@/components/_shared/Button/KeycapButton';
import { useAuth } from '@/hooks/useAuth';
import { startTransition } from 'react';

const AuthButton = ({ action }: { action: 'LOGIN' | 'LOGOUT' }) => {
  const { logOut, logIn } = useAuth();

  const handleLogin = () => {
    startTransition(() => {
      logIn();
    });
  };

  const handleLogout = () => {
    startTransition(() => {
      logOut();
    });
  };

  return (
    <KeycapButton
      onClick={action === 'LOGIN' ? () => handleLogin : handleLogout}
    >
      <span className="pl-0.5 pr-0.5 inline-block">
        {action === 'LOGIN' ? '로그인' : '로그아웃'}
      </span>
    </KeycapButton>
  );
};

export default AuthButton;
