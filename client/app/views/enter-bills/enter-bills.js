'use strict';

angular
  .module('enterBillsView', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/enter-bills', {
      templateUrl: 'views/enter-bills/enter-bills.template.html',
      controller: 'enterbillsCtrl'
    });
  }])