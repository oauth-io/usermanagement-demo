'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('SigninCtrl', function ($rootScope, $scope, $location, OAuth, User) {
  	$rootScope.menu = 'signin';


  	if (User.isLogged()) {
  		return $location.path('/user');
  	}

	$scope.signin = function(email, password) {
		User.signin(email, password).done(function(user) {
            $rootScope.me = user;
            $rootScope.isLogged = true;
	  		$location.path('/user');
	  		$rootScope.$apply();
        }).fail(function(err) {
        	window.alert('error:' + JSON.stringify(err));
            $scope.error = err;
        });
	};

	$scope.signinSocial = function(provider) {
		OAuth.popup(provider).done(function(result) {
            User.signin(result).done(function(user) {
                $rootScope.isLogged = true;
                $rootScope.me = user;
                $location.path('/user');
                $rootScope.$apply();
            }).fail(function(err) {
	           	window.alert('error: ' + JSON.stringify(err));
				console.log(err);
                $scope.error = err;
            });
        }).fail(function(err) {
           	console.log(err);
            $scope.error = err;
            window.alert('error:' + JSON.stringify(err));
        });
	};
  });
