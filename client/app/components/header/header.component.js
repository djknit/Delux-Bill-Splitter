'use strict';

angular
  .module('pageHeader')
  .component('pageHeader', {
    templateUrl: 'components/header/header.template.html',
    controller: function HeaderCtrl() {
      this.isHomeView = window.location.hash === '#!/';
    }
  });