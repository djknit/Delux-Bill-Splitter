'use strict';

angular
  .module('billsApp')
  .config([
    '$locationProvider',
    '$routeProvider',
    '$compileProvider',
    function config($locationProvider, $routeProvider, $compileProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/', {
          template: '<home-view></home-view>'
        })
        .when('/enter-bills', {
          template: '<enter-bills-view></enter-bills-view>'
        })
        .otherwise('/');

      // turn to false before production build for performance boost
      $compileProvider.debugInfoEnabled(true);
    }
  ]);