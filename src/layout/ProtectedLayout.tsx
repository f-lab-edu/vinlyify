import { PAGE } from '@/constants/url';
import { useAuth } from '@/hooks/useAuth';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';

import KeycapButton from '@/components/_shared/Button/KeycapButton';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import FullBackground from './FullBackground';

export function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <FullBackground className="px-8">
      <h1 className="text-2xl font-bold">
        이런! 예기치 못한 오류가 발생했어요. 😖
      </h1>
      <h2>{JSON.stringify(error?.message)}</h2>
      <div className="inline-flex gap-4 w-full">
        <KeycapButton onClick={resetErrorBoundary} className="w-full">
          새로고침
        </KeycapButton>
        <KeycapButton onClick={resetErrorBoundary} className="w-full">
          ?
        </KeycapButton>
      </div>
    </FullBackground>
  );
}

export default function ProtectedRoute() {
  const { validToken } = useAuth();
  const { reset } = useQueryErrorResetBoundary();

  if (validToken == null) {
    return <Navigate to={PAGE.MAIN} replace />;
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
      <Outlet />
    </ErrorBoundary>
  );
}
