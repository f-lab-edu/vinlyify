import router from '@/routes/router';
import { RouterProvider } from 'react-router-dom';

const Router = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true, // https://reactrouter.com/6.30.1/upgrading/future#v7_starttransition
      }}
    />
  );
};

export default Router;
