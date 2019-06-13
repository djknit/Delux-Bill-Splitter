'use strict';

// Declare app level module which depends on views, and core components
angular.module('billsApp', [
  'ngRoute',
  'homeView',
  'enterBillsView'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])
.directive('myHeader', function() {
  return {
    restrict: 'A',
    templateUrl: 'components/header/header.template.html',
    replace: true
  }
});