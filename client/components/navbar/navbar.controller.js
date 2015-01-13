'use strict';

angular.module('adtredApp')
  .controller('NavbarCtrl', ['$scope', '$location', 'auth', 'store', 'Adservice', function ($scope, $location, auth, store, Adservice) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'About',
      'link': '/about'
    },{
      'title': 'News',
      'link': '/news'
    }];
    $scope.aside = {
      menu: $scope.menu
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.$on('toggleAuth', function (event) {
      $scope.isAuthenticated = auth.isAuthenticated;
    });
    $scope.$emit('toggleAuth');
    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        $scope.$emit('toggleAuth');
        $location.path('/home');
      }, function (error) {
        console.log(error);
      });
    };
    $scope.logout = function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $scope.$emit('toggleAuth');
    };
  }]);