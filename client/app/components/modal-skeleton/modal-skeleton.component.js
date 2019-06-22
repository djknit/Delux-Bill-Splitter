'use strict';

angular
  .module('modalSkeleton')
  .componenet('modalSkeleton', {
    templateUrl: 'components/modal-skeleton/modal-skeleton.template.html',
    bindings: {
      // source for good info on binding types: https://codeburst.io/tips-on-passing-data-between-components-in-angularjs-f36c4ad47cca
      modalName: '@',
      title: '@',
      buttonMessage: '@',
      buttonAction: '&',
      hasSuccess: '<',
      hasDanger: '<'
    },
    transclude: true
  });