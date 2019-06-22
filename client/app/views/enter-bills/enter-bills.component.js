'use strict';

angular
  .module('enterBillsView')
  .component('enterBillsView', {
    templateUrl: 'views/enter-bills/enter-bills.template.html',
    controller: function enterBillsCtrl() {
      this.participants = [{
        name: 'Jane',
        id: 1
      }];
      this.bills = [];
    }
  });