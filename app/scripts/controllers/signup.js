'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('SignupCtrl', function ($rootScope, $scope, $location, $modal, OAuth, User) {
  	$rootScope.menu = 'signup';

  	if (User.isLogged()) {
  		return $location.path('/user');
  	}

	$scope.signup = function(data) {
		User.signup(data).done(function(user) {
            $rootScope.isLogged = true;
            $rootScope.me = user;
            $location.path('/user');
            $rootScope.$apply();
		}).fail(function(err) {
			window.alert('error: ' + JSON.stringify(err));
			console.log('error', err);
		});
	};

	$scope.signupSocial = function(provider) {
		OAuth.popup(provider).done(function(result) {
            User.signup(result).done(function(user) {
            	console.log('signed up', user);
                $rootScope.isLogged = true;
                $rootScope.me = user;
                $location.path('/user');
                $rootScope.$apply();
            }).fail(function(err) {
            	console.log('failllll', err);
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
					window.alert('error: ' + JSON.stringify(err));
            	}
                $scope.error = err;
            });
        }).fail(function(err) {
        	window.alert('error: ' + JSON.stringify(err));
        	console.log(err);
            $scope.error = err;
        });
	};
  });
