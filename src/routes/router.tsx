import { PAGE } from '@/constants/url';
import { BaseLayout } from '@/layout/BaseLayout';
import ProtectedRoute from '@/layout/ProtectedLayout';
import ErrorPage from '@/pages/ErrorPage';
import MainPage from '@/pages/MainPage';
import MusicInfoPage from '@/pages/MusicInfoPage';

import NotFoundPage from '@/pages/NotFoundPage';
import SearchPage from '@/pages/SearchPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PAGE.MAIN,
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PAGE.LOGGED_IN,
            element: <MainPage />,
            children: [{ path: PAGE.LOGGED_IN, element: <MainPage /> }],
            errorElement: <ErrorPage />,
          },
          {
            path: PAGE.MUSIC_INFO,
            element: <MusicInfoPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: PAGE.SEARCH,
            element: <SearchPage />,
            ErrorBoundary: error => <>{error}</>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
export default router;
