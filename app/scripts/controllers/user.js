'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('UserCtrl', function ($rootScope, $scope, $location, User, OAuth) {
  	$rootScope.menu = 'user';

  	if ( ! User.isLogged()) {
  		return $location.path('/signin');
  	}

  	$scope.hasProvider = function(provider) {
		return $rootScope.me.hasProvider(provider);
  	};

  	$scope.toggleProvider = function(provider) {
  		if ($scope.hasProvider(provider)) {
  			$rootScope.me.removeProvider(provider);
  		}
  		else {
  			OAuth.popup(provider).done(function(res) {
  				$rootScope.me.addProvider(res);
	  			$rootScope.$apply();
  			});
  		}
  	};
	$rootScope.me.getProviders();
  });
