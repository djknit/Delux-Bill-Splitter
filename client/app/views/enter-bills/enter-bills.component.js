'use strict';

angular
  .module('enterBillsView')
  .component('enterBillsView', {
    templateUrl: 'views/enter-bills/enter-bills.template.html',
    controller: function enterBillsCtrl() {
      
      this.participants = [];
      this.bills = [];
      this.agents = [
        { name: 'test', id: 1 },
        { name: 'dave dave', id: 2 },
        { name: 'Dillon\'s', id: 3 }
      ];

      this.nextParticipantId = 1;
      this.nextBillId = 1;
      this.nextAgentId = 1;

      this.addParticipant = newParticipantName => {
        return this.addEntity(newParticipantName, true);
      }

      // used to add both new participants and agents to avoid repeated code
      this.addEntity = (newEntityName, isParticipant) => new Promise(
        (resolve, reject) => {
          const trimmedName = newEntityName.trim();
          // if new entity is not a participant, then it is an agent
          let entitiesArray = isParticipant ? this.participants : this.agents;
          let entityType = isParticipant ? 'participant' : 'agent';
          // let test = this.isDuplicate(trimmedName, entitiesArray);
          if (this.isDuplicate(trimmedName, entitiesArray)) {
            return reject({
              message: [
                'There is already ' + (isParticipant ? 'a ' : 'an ') + entityType + ' in this'
                  + ' list with the name',
                'If you have two ' + entityType + 's with the same name, you must add a number'
                  + ' or other marker so that they can be identified.'
              ],
              name: trimmedName
            });
          }
          const id = isParticipant ? this.nextParticipantId++ : this.nextAgentId++;
          const newEntity = {
            name: trimmedName,
            id
          };
          entitiesArray.push(newEntity);
          resolve(newEntity); 
        }
      );

      this.isDuplicate = (newThingName, thingsArray) => {
        for (let i = 0; i < thingsArray.length; i++) {
          if (thingsArray[i].name === newThingName) {
            return true;
          }
        }
        return false;
      }

      this.removeParticipant = id => new Promise(
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

      this.addBill = bill => new Promise(
        (resolve, reject) => {
          const id = this.nextBillId++;
          let newBill = bill;
          newBill.id = id;
          this.bills.push(newBill);
          resolve(newBill);
        }
      );

      this.removeBill = id => new Promise(
        (resolve, reject) => {
          for (let i = 0; i < this.bills.length; i++) {
            if (this.bills[i].id === id) {
              const removedBill = this.bills[i];
              this.bills.splice(i, 1);
              return resolve(removedBill);
            }
          }
          reject({ message: 'Sorry, that bill could not be found. Please try again.' });
        }
      );

      // "agent" is the term I am using to describe billers (entities to which bills are owed or have been paid to)
      this.addAgent = newAgentName => {
        return this.addEntity(newAgentName, true);
      };
    }
  });