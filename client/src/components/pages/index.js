const { lazy } = require('react');

module.exports = {
  Home: lazy(() => import('./home/home')),
  Watch: lazy(() => import('./watch/watch')),
  Signin: lazy(() => import('./signin/signin')),
  Signup: lazy(() => import('./signup/signup')),
  Upload: lazy(() => import('./upload/upload')),
  NotFound: lazy(() => import('../helpers/notFound')),
};
