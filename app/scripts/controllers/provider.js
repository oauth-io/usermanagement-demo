'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:ProviderCtrl
 * @description
 * # ProviderCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('ProviderCtrl', function ($scope, $modalInstance, provider) {
  	console.log(provider);
  	$scope.provider = provider;

  	$scope.unlink = function() {
  		$modalInstance.close('unlink');
  	};

  	$scope.close = function() {
  		$modalInstance.dismiss();
  	};
  });
