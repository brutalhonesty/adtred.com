'use strict';

angular.module('adtredApp').service('Adservice', ['$firebase', 'FIRE_URL', function ($firebase, FIRE_URL) {
  var ref = new Firebase(FIRE_URL);
  var sync = $firebase(ref);
  return {
    getUserAds: function (req, callback) {
      var adsRef = ref.child('providers').child(req.provider).child(req.username).child('ads');
      var adsSync = $firebase(adsRef);
      adsSync.$asArray().$loaded().then(function (ads) {
        var newAds = [];
        for (var i = 0; i < ads.length; i++) {
          var ad = ads[i].$value;
          var adRef = ref.child('ads').child(ad);
          var adSync = $firebase(adRef);
          newAds.push(adSync.$asObject());
        }
        return callback(null, newAds);
      });
    },
    addAd: function (req) {
      var adRef = ref.child('ads');
      var newAdRef = adRef.push(req.ad);

      var providerRef = ref.child('providers').child(req.provider);
      var userRef = providerRef.child(req.username);
      var userSync = $firebase(userRef);
      var newAd = {};
      newAd[newAdRef.key()] = newAdRef.key();
      userSync.$update('ads', newAd);

      var companyRef = ref.child('companies').child(req.ad.company);
      var companySync = $firebase(companyRef);
      companySync.$update('ads', newAd);
      return newAdRef;
    },
    getCompanies: function (req) {
      var companiesRef = ref.child('companies');
      var companiesSync = $firebase(companiesRef);
      return companiesSync.$asArray();
    },
    addCompany: function (req) {
      var companiesRef = ref.child('companies');
      var companyRef = companiesRef.child(req.id);
      return companyRef.set({
        name: req.name,
        image: req.image,
        url: req.url
      });
    }
  };
}]);
