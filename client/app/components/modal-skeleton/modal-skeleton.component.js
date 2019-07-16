'use strict';

angular
  .module('modalSkeleton')
  .component('modalSkeleton', {
    templateUrl: 'components/modal-skeleton/modal-skeleton.template.html',
    bindings: {
      // source for good info on binding types: https://codeburst.io/tips-on-passing-data-between-components-in-angularjs-f36c4ad47cca
      modalName: '@',
      title: '@',
      hasSuccess: '<',
      hasDanger: '<',
      reset: '<',
      cancelButtonSuccessText: '@',
      isCancelButtonSuccess: '<'
    },
    transclude: {
      bodyContent: 'modalBody',
      footerContent: '?modalFooter'
    },
    controller: [
      'CurrentRoute', '$scope',
      function modalSkelCtrl(CurrentRoute, $scope) {

        // wait .2 sec before resetting content on 'Cancel' and 'Done' button press
        // this keeps content from changing before modal has closed (which looked bad)
        this.delayedReset = () => {
          setTimeout(() => {
            this.reset();
          }, 200);
        }

      }
    ]
  });