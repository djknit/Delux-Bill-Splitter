'use strict';

angular
  .module('enterBillsView')
  .component('enterBillsView', {
    templateUrl: 'views/enter-bills/enter-bills.template.html',
    controller: function enterBillsCtrl() {
      this.participants = [];
      this.bills = [];

      this.nextParticipantId = 1;

      this.addParticipant = newParticipantName => new Promise(
        (resolve, reject) => {
          const id = this.nextParticipantId++;
          const newParticipant = {
            name: newParticipantName,
            id
          };
          this.participants.push(newParticipant);
          resolve(newParticipant); 
        }
      );
    }
  });