'use strict';

angular
  .module('pageHeader')
  .component('pageHeader', {
    templateUrl: 'components/header/header.template.html',
    controller: ['CurrentRoute', '$scope',
      function HeaderCtrl(CurrentRoute, $scope) {
        let checkIfHomeView = hash => {
          this.isHomeView = hash === '#!/';
        }

        checkIfHomeView(CurrentRoute.getHash());

        this.reportHashChange = newHash => {
          CurrentRoute.notify(newHash);
        }

        // Awesome source: https://www.codelord.net/2015/05/04/angularjs-notifying-about-changes-from-services-to-controllers/
        // I learned how to create the following method from this source.
        CurrentRoute.subscribe($scope, function handleChange(newHash) {
          checkIfHomeView(newHash);
        });

      }
    ]
  });