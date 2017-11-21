'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('SignupCtrl', function ($rootScope, $scope, $location, $timeout, $modal, OAuth, User) {
  	$rootScope.menu = 'signup';

  	if (User.isLogged()) {
  		return $location.path('/user');
  	}

	$scope.signup = function(data) {
        $scope.errorForm = null;
		User.signup(data).done(function(user) {
            $rootScope.isLogged = true;
            $rootScope.me = user;
            $location.path('/user');
            $timeout(angular.noop, 0)
		}).fail(function(err) {
			$scope.errorForm = err;
            $timeout(angular.noop, 0)
		});
	};

	$scope.signupSocial = function(provider) {
        $scope.errorSocial = null;
		OAuth.popup(provider).done(function(result) {
            User.signup(result).done(function(user) {
                $rootScope.isLogged = true;
                $rootScope.me = user;
                $location.path('/user');
                $timeout(angular.noop, 0)
            }).fail(function(err) {
            	if (err.responseJSON.data.email && err.responseJSON.data.email === 'missing') {
            		$modal.open({
            			controller: 'EmailModalCtrl',
            			templateUrl: 'views/modal/email.html',
            			resolve: {
            				data: function() { return result; }
            			}
            		});
            	}
            	else {
                    $scope.errorSocial = err;
                    $timeout(angular.noop, 0)
            	}
            });
        });
	};
  });
