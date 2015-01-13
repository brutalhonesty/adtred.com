'use strict';

angular.module('adtredApp').controller('AddCtrl', ['$scope', 'auth', 'Adservice', '$modal', function ($scope, auth, Adservice, $modal) {
  Adservice.getCompanies().$loaded().then(function (companies) {
    $scope.companies = companies;
  });
  $scope.count = 0;
  $scope.addAd = function (companyIndex) {
    var req = {
      provider: auth.profile.identities[0].provider,
      username: auth.profile.screen_name,
      ad: {
        name: $scope.name || null,
        url: $scope.url || null,
        count: parseInt($scope.count, 10),
        video: $scope.video || null,
        image: $scope.image || null,
        owner: {
          provider: auth.profile.identities[0].provider,
          username: auth.profile.screen_name
        },
        company: $scope.company.$id || null,
        createDate: Date.now(Date.UTC()),
        comments: {}
      }
    };
    Adservice.addAd(req).then(function (newRef) {
      // TODO Show notification that new ad was added.
      // Value is stored in newRef.key()
      $location.path('/home');
    }).then(function (error) {
      console.log(error);
    });
  };
  $scope.openCompanyModal = function () {
    var myModal = $modal({
      title: 'Add A Company',
      content: '',
      show: true,
      template: 'app/ads/add/add-company.tpl.html',
      animation: 'am-fade-and-slide-top'
    });
    myModal.$scope.addCompany = function () {
      var company = {
        id: myModal.$scope.name.toLowerCase(),
        name: myModal.$scope.name,
        url: myModal.$scope.url,
        image: myModal.$scope.image
      };
      Adservice.addCompany(company);
      myModal.hide();
    };
  };
}]);
