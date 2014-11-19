'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:DataModalCtrl
 * @description
 * # DataModalCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('DataModalCtrl', function ($rootScope, $scope, $location, $modalInstance, User, data) {
  	if (!User.isLogged()) {
  		$modalInstance.dismiss();
  		$location.path('/signin');
  	}

  	$scope.data = data;
  	var lastKey = data.key;

  	var getValue = function() {
  		var value = $scope.data.value;
  		if ($scope.data.type === 'object') {
  			try {
	  			value = JSON.parse(value);
	  		}
	  		catch (e) {
	  			return null;
	  		}
  		}
  		else if ($scope.data.type === 'object') {
  			value = parseInt(value);
  		}
  		return value;
  	};

  	$scope.save = function() {
  		console.log(lastKey, $scope.data);
  		if (lastKey !== '' && lastKey !== $scope.data.key) {
  			//remove lastKey
  			console.log('edit key');
  			$rootScope.me.data[lastKey] = null;
  		}
  		var value = getValue();
  		if (value === null || value === '') {
  			return window.alert('Error: the value can\'t be null');
  		}
  		$rootScope.me.data[$scope.data.key] = value;
  		console.log($rootScope.me.data);
  		$rootScope.me.save();
  		$modalInstance.close();
  	};

  	$scope.close = function() {
  		$modalInstance.dismiss();
  	};
  });