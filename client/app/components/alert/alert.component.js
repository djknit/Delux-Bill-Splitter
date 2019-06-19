'use strict';

angular
  .module('alert')
  .component('alert', {
    templateUrl: 'components/alert/alert.template.html',
    bindings: {
      theme: '=',
      message: '='
    },
    transclude: true
  });