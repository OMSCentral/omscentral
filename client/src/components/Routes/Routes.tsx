import React, { lazy } from 'react';
import { Redirect, Switch } from 'react-router';
import { paths } from 'src/constants';

import Courses from './components/Courses';
import Landing from './components/Landing';
import Maintenance from './components/Maintenance';
import Reviews from './components/Reviews';
import Route from './components/Route';

interface Route {
  path: string;
  auth?: boolean;
  component: React.ComponentType<any>;
}

const Error404: React.FC = () => <Redirect to={paths.error(404)} />;

const routes: Route[] = [
  {
    path: paths.privacy,
    component: lazy(() => import('./components/Privacy')),
  },
  {
    path: paths.terms,
    component: lazy(() => import('./components/Terms')),
  },
  {
    path: paths.error(),
    component: lazy(() => import('./components/Error')),
  },
  {
    path: paths.landing,
    component: Landing,
  },
  {
    path: paths.courses,
    component: Courses,
  },
  {
    path: paths.course(),
    component: lazy(() => import('./components/Course')),
  },
  {
    path: paths.review.create,
    component: lazy(() => import('./components/ReviewCreate')),
    auth: true,
  },
  {
    path: paths.review.update(),
    component: lazy(() => import('./components/ReviewUpdate')),
  },
  {
    path: paths.recent,
    component: Reviews,
  },
  {
    path: paths.reviews(),
    component: Reviews,
  },
  {
    path: paths.login,
    component: lazy(() => import('./components/Login')),
    auth: false,
  },
  {
    path: paths.register,
    component: lazy(() => import('./components/Register')),
    auth: false,
  },
  {
    path: paths.resetPassword,
    component: lazy(() => import('./components/ResetPassword')),
    auth: false,
  },
  {
    path: paths.setPassword,
    component: lazy(() => import('./components/SetPassword')),
    auth: false,
  },
  {
    path: paths.userProfile,
    component: lazy(() => import('./components/UserProfile')),
    auth: true,
  },
  {
    path: paths.userReviews,
    component: lazy(() => import('./components/UserReviews')),
    auth: true,
  },
  {
    path: '*',
    component: Error404,
  },
];

const isUnderMaintenance = false;

const Routes: React.FC = () => (
  <Switch>
    {isUnderMaintenance ? (
      <Route path="*" component={Maintenance} />
    ) : (
      routes.map((route) => <Route key={route.path} exact {...route} />)
    )}
  </Switch>
);

export default Routes;
