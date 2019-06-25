'use strict';

angular
  .module('billsApp')
  .config([
    '$locationProvider',
    '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/', {
          template: '<home-view></home-view>'
        })
        .when('/enter-bills', {
          template: '<enter-bills-view></enter-bills-view>'
        })
        .otherwise('/');
    }
  ]);