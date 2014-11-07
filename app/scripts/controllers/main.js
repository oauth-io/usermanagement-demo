'use strict';

/**
 * @ngdoc function
 * @name usermanagementTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the usermanagementTestApp
 */
angular.module('usermanagementTestApp')
  .controller('MainCtrl', function ($rootScope) {
  	$rootScope.menu = 'home';
  });
