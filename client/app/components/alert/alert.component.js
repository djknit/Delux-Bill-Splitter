'use strict';

angular
  .module('alert')
  .component('alert', {
    templateUrl: 'components/alert/alert.template.html',
    bindings: {
      // source for good info on binding types: https://codeburst.io/tips-on-passing-data-between-components-in-angularjs-f36c4ad47cca
      theme: '<'
    },
    transclude: true
  });