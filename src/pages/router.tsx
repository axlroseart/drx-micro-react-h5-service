import * as React from 'react';
import { RouteProps } from 'react-router-dom';

const PageNotFound = React.lazy(() => import('../components/pageNotFound'));
const Index = React.lazy(() => import('./index'));
const My = React.lazy(() => import('./my'));

export const routes: RouteProps[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/home',
    element: <Index />,
  },
  {
    path: '/my',
    element: <My />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];
