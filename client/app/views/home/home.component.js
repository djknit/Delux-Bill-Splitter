'use strict';

angular
  .module('homeView')
  .component('homeView', {
    templateUrl: 'views/home/home.template.html',
    controller: ['CurrentRoute',
      function(CurrentRoute) {
        this.reportHashChange = newHash => {
          CurrentRoute.notify(newHash);
        }
      }
    ]
  });