'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('adtredApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have 1 equal 1', function () {
    expect(1).toBe(1);
  });
});
