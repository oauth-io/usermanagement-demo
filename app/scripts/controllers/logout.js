'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('LogoutCtrl', function ($rootScope, User, $location) {
  	if (!User.isLogged()) {
  		$location.path('/');
  	}
	$rootScope.me = null;
	$rootScope.isLogged = false;
  	User.getIdentity().logout().done(function() {
	}).fail(function(err) {
		console.log(err);
	});
	$location.path('/');
  });
