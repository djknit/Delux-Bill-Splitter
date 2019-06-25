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

      this.removeParticipant = (id) => new Promise(
        (resolve, reject) => {
          for (let i = 0; i < this.participants.length; i++) {
            if (this.participants[i].id === id) {
              const removedParticipantName = this.participants[i].name;
              this.participants.splice(i, 1);
              return resolve(removedParticipantName);
            }
          }
          reject({ message: 'Sorry, that participant could not be found. Please try again.' });
        }
      );
    }
  });