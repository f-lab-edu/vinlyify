import { BaseLayout } from '@/layout/BaseLayout';
import ErrorPage from '@/pages/ErrorPage';
import MainPage from '@/pages/MainPage';

import NotFoundPage from '@/pages/NotFoundPage';
import { createBrowserRouter } from 'react-router-dom';
import { page } from './pages';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: page.main,
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
export default router;
