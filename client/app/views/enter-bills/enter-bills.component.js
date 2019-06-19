'use strict';

angular
  .module('enterBillsView')
  .component('enterBillsView', {
    templateUrl: 'views/enter-bills/enter-bills.template.html',
    controller: function enterBillsCtrl() {
      console.log(window.location.hash === '#!/enter-bills')
    }
  });