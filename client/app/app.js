'use strict';

angular.module('adtredApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'firebase'])
.config(function ($routeProvider, $locationProvider, $asideProvider, authProvider, $httpProvider, jwtInterceptorProvider, $modalProvider) {
  $routeProvider
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
  angular.extend($asideProvider.defaults, {
    container: 'body',
    html: true
  });
  angular.extend($modalProvider.defaults, {
    html: true
  });
  authProvider.init({
    domain: 'gitmas.auth0.com',
    clientID: 'DYPBVFvIm53AISWEZuOlJ6KpMC0FON0t'
  });
  jwtInterceptorProvider.tokenGetter = ['store', function (store) {
    return store.get('token');
  }];
  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function ($rootScope, auth, store, jwtHelper, $location) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
  // This event gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function () {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token && !jwtHelper.isTokenExpired(token)) {
        auth.authenticate(store.get('profile'), token);
      } else {
        $location.path('/');
      }
    }
  });
}).value('FIRE_URL', 'https://adtred.firebaseio.com/');