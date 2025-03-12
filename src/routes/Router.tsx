import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';
import EndGame from '@/pages/EndGame/Endgame';
import { ROUTES } from '../constants';
import ErrorPage from '../pages/Error/Error.page';

const RootLayout = lazy(() => import('@/layouts/Root.layout'));
const HomePage = lazy(() => import('@/pages/Home.page'));
const BowlingPlayground = lazy(() => import('@/pages/BowlingPlayground/BowlingPlayground.page'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<FullScreenLoader />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <HomePage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: ROUTES.BOWLING_PLAYGROUND,
            element: <BowlingPlayground />,
          },
          {
            path: ROUTES.END_GAME,
            element: <EndGame />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
