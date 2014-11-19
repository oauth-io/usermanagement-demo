'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:AboutCtrl
 * @description
 * # GettingStartedCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('UserCtrl', function ($rootScope, $scope, $location, $modal, User, OAuth) {
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
  				$rootScope.me.addProvider(res).done(function() {
  					$scope.editableData = $rootScope.me.getEditableData();
  					$scope.$apply();
  				}).fail(function(err) {
  					window.alert('error: ' + JSON.stringify(err));
  				});
	  			$rootScope.$apply();
  			});
  		}
  	};

  	$scope.select = function(provider) {
  		var instance = $modal.open({
  			templateUrl: 'views/modal/provider.html',
  			controller: 'ProviderCtrl',
  			resolve: {
  				provider: function() { return provider; }
  			}
  		});
  		instance.result.then(function(result) {
  			if (result === 'unlink') {
  				$scope.toggleProvider(provider);
  			}
  		});
  	};

  	$scope.editData = function(data) {
  		console.log('editData', data);
  		var instance = $modal.open({
			templateUrl: 'views/modal/data.html',
			controller: 'DataModalCtrl',
			size: 'sm',
			resolve: {
				data: function() {
					return {
						key: data.key,
						value: data.value,
						type: typeof data.value
					};
				}
			}
		});
		instance.result.then(function() {
			$scope.editableData = $rootScope.me.getEditableData();
		});
  	};

  	$scope.removeData = function(data) {
      //return false;
  		if (window.confirm('Are you sure to delete this data?')) {
  			$rootScope.me.data[data.key] = null;
  			$rootScope.me.save();
        $scope.editableData = $rootScope.me.getEditableData();
  		}
  	};

	$rootScope.me.getProviders();
	$scope.editableData = $rootScope.me.getEditableData();
  });
