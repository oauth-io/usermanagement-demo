'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('usermanagementTestApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $rootScope: scope
    });
  }));

  it('should set menu to home', function () {
    expect(scope.menu).toBe('home');
  });
});
