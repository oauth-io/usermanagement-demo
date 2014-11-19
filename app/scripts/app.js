'use strict';

/**
 * @ngdoc overview
 * @name usermanagementTestApp
 * @description
 * # usermanagementTestApp
 *
 * Main module of the application.
 */
angular
  .module('usermanagementTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'oauthio'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/getting-started', {
        templateUrl: 'views/getting-started.html',
        controller: 'GettingStartedCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/logout', {
        controller: 'LogoutCtrl',
        templateUrl: 'views/blank.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function ($rootScope, User, Materia) {
    Materia.setOAuthdURL('http://iostaging.oauthserver.com');
    User.initialize('ZamGgPBUtpLOYv21t-WQAhoULcY');
    $rootScope.isLogged = User.isLogged();
    if ($rootScope.isLogged) {
      $rootScope.me = User.getIdentity();
    }
    $rootScope.providersAvailable = [
      'facebook',
      'twitter',
      'google',
      'linkedin',
      'github'
    ];
  });
