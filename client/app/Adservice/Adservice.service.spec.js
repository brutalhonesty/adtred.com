'use strict';

describe('Service: Adservice', function () {

  // load the service's module
  beforeEach(module('adtredApp'));

  // instantiate service
  var Adservice;
  beforeEach(inject(function (_Adservice_) {
    Adservice = _Adservice_;
  }));

  it('should do something', function () {
    expect(!!Adservice).toBe(true);
  });

});
