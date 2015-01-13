'use strict';

angular.module('adtredApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ads/add', {
        templateUrl: 'app/ads/add/add.html',
        controller: 'AddCtrl',
        requiresLogin: true
      });
  });
