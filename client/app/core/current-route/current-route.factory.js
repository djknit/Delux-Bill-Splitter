'use strict';

angular
  .module('core.currentRoute')
  .factory('CurrentRoute', [
    '$rootScope',
    function($rootScope) {
      let hash = window.location.hash;
      
      function updateAndNotify(newHash) {
        hash = newHash;
        $('.modal-backdrop').remove();
        $rootScope.$emit('route-hash-change');
      }

      // source: https://stackoverflow.com/questions/15813850/how-to-detect-browser-back-button-click-event-using-angular
      $rootScope.$watch(
        function watchExpression() { return window.location.hash },
        function listener() { updateAndNotify(window.location.hash)}
      );

      // great source: https://www.codelord.net/2015/05/04/angularjs-notifying-about-changes-from-services-to-controllers/
      // I borrowed a lot of the below code from this source.
      return {
        subscribe: function(scope, callback) {
          const unsubscribe = $rootScope.$on('route-hash-change', () => callback(hash));
          scope.$on('$destroy', unsubscribe);
        },
        getHash: function() {
          return hash;
        }
      };
    }
  ]);