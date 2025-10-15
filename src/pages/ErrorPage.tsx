import KeycapButton from '@/components/_shared/Button/KeycapButton';
import Vinyl from '@/components/_shared/Vinyl/Vinyl';
import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { BLACK_TEXTURE } from '@/constants/image';
import { useAuth } from '@/hooks/useAuth';
import { startTransition } from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  const { logIn, signUp } = useAuth();

  const handleLogin = () => {
    startTransition(() => {
      logIn();
    });
  };

  const handleSignUp = () => {
    startTransition(() => {
      signUp();
    });
  };
  if (
    error?.message === ERROR_MESSAGES['401'] ||
    error?.message === ERROR_MESSAGES['403']
  ) {
    return (
      <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
        <div className="text-center align-middle inline-flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">
            서비스 사용을 위해 로그인해 주세요 🙂
          </h1>
          <div className="inline-flex justify-center relative">
            <Vinyl imgUrl={BLACK_TEXTURE} />
          </div>
          <KeycapButton onClick={handleLogin}>로그인</KeycapButton>
          <KeycapButton onClick={handleSignUp}>
            스포티파이 계정 만들기
          </KeycapButton>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
      <div className="text-center align-middle inline-flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-bold">{error?.message}</h1>
        <div className="inline-flex justify-center relative">
          <Vinyl imgUrl={BLACK_TEXTURE} />
        </div>
      </div>
    </div>
  );
}
