'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('SigninCtrl', function ($rootScope, $scope, $location, $modal, OAuth, User) {
  	$rootScope.menu = 'signin';


  	if (User.isLogged()) {
  		return $location.path('/user');
  	}

	$scope.signin = function(email, password) {
		$scope.errorEmailPW = null;
		User.signin(email, password).done(function(user) {
            $rootScope.me = user;
            $rootScope.isLogged = true;
	  		$location.path('/user');
	  		$rootScope.$apply();
        }).fail(function(err) {
            $scope.errorEmailPW = err;
            $scope.$apply();
        });
	};

	$scope.signinSocial = function(provider) {
		$scope.errorSocial = null;
		OAuth.popup(provider).done(function(result) {

            User.signin(result).done(function(user) {
                $rootScope.isLogged = true;
                $rootScope.me = user;
                $location.path('/user');
                $rootScope.$apply();
            }).fail(function(err) {
            	if (err &&
                    err.responseJSON &&
                    err.responseJSON.data &&
                    err.responseJSON.data.email &&
                    err.responseJSON.data.email === 'missing') {
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
            		$scope.$apply();
		        }
            });
        }).fail(function(err) {
            console.log(err);
        });
	};
  });
