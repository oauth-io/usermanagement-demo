'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:DataModalCtrl
 * @description
 * # DataModalCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('EmailModalCtrl', function ($rootScope, $scope, $location, $modalInstance, $timeout, User, data) {
  	if (User.isLogged()) {
  		$modalInstance.dismiss();
  		$location.path('/user');
  	}
  	$scope.emailSetup = function(email) {
  		data.email = email;
  		console.log('setup email', data);
  		User.signup(data).done(function(user) {
  			$rootScope.isLogged = true;
            $rootScope.me = user;
            $location.path('/user');
  			$modalInstance.close(user);
			$timeout(angular.noop, 0)
  		}).fail(function(err) {
  			window.alert('error:' + JSON.stringify(err));
  		});
  	};
  	$scope.close = function() {
  		$modalInstance.dismiss();
  	};
  });