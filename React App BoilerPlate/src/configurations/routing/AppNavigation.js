import React, { Suspense } from 'react';
import HomeContainer from '../../components/Home/Home.Container';

const LoginContainer = React.lazy(() =>
  import(
    'components/Login/Login.Container' /* webpackChunkName: "Login.Container" */
  ),
);

const appRoutes = {
  root: {
    defaultRoute: {
      path: '/',
      component: HomeContainer,
      needAuth: true,
      exact: true,
    },
  },
  authentication: {
    login: {
      path: '/login',
      component: LoginContainer,
      needAuth: false,
      exact: false,
    },
  },
};

const defaultAuthenticatedRoute = '/';
const defaultUnauthenticatedRoute = '/login';

const getAllRoutesArray = () =>
  Object.keys(appRoutes)
    .map(key =>
      Object.keys(appRoutes[key]).reduce((allRoutes, innerKey) => {
        allRoutes.push(appRoutes[key][innerKey]);
        return allRoutes;
      }, []),
    )
    .flat();
export {
  appRoutes,
  defaultAuthenticatedRoute,
  defaultUnauthenticatedRoute,
  getAllRoutesArray,
};
