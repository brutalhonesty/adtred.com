'use strict';

angular.module('adtredApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        requiresLogin: true
      });
  });
