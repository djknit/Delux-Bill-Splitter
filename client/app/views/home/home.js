'use strict';

angular
  .module('homeView', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/home/home.template.html',
      controller: 'homeCtrl'
    });
  }])
  .controller('homeCtrl', [function() {

  }]);