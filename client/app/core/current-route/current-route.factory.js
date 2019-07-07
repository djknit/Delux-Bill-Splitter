'use strict';

angular
  .module('core.currentRoute')
  .factory('CurrentRoute', ['$rootScope',
    function($rootScope) {
      let hash = window.location.hash;

      // great source: https://www.codelord.net/2015/05/04/angularjs-notifying-about-changes-from-services-to-controllers/
      // I borrowed a lot of the below code from this source.
      return {
        subscribe: function(scope, callback) {
          const unsubscribe = $rootScope.$on('route-hash-change', () => callback(hash));
          scope.$on('$destroy', unsubscribe);
        },

        notify: function(newHash) {
          hash = newHash;
          $rootScope.$emit('route-hash-change');
        },

        getHash: function() {
          return hash;
        }
      };
    }
  ]);