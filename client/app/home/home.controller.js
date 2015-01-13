'use strict';

angular.module('adtredApp').controller('HomeCtrl', ['$scope', 'Adservice', 'auth', function ($scope, Adservice, auth) {
  $scope.username = auth.profile.screen_name;
  var getAdsReq = {
    username: $scope.username,
    provider: auth.profile.identities[0].provider
  };
  $scope.ads = [];
  Adservice.getUserAds(getAdsReq, function (error, ads) {
    if(error) {
      console.log(error);
    }
    $scope.ads = ads;
    console.log(ads);
  });
}]);
