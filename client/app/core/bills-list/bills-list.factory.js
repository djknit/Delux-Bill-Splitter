'use strict';

// This service holds the data for the "Enter Bills" page
angular
  .module('core.billsList')
  .factory('BillsList', ['$rootScope',
    function($rootScope) {
      let participants = [{id: 0, name: 'test'}];
      let bills = [];
      // "agent" is the term I am using to describe billers (entities to which bills are owed or have been paid to)
      let agents = [
        { name: 'test', id: 1 },
        { name: 'dave dave', id: 2 },
        { name: 'Dillon\'s', id: 3 }
      ];

      let nextParticipantId = 1;
      let nextBillId = 1;
      let nextAgentId = 1;

      // used to add both new participants and agents to avoid repeated code
      function addEntity(entityType, newEntityName) {
        const isParticipant = entityType === 'participant';
        return new Promise(
          (resolve, reject) => {
            const trimmedName = newEntityName.trim();
            // if new entity is not a participant, then it is an agent
            let entitiesArray = isParticipant ? participants : agents;
            let entityType = isParticipant ? 'participant' : 'agent';
            // let test = this.isDuplicate(trimmedName, entitiesArray);
            if (isDuplicate(trimmedName, entitiesArray)) {
              return reject({
                message: 'There is already ' + (isParticipant ? 'a ' : 'an ') + entityType +
                  ' in this list with the name "' + trimmedName + '." If you have two ' +
                  entityType + 's with the same name, you must add a number' + ' or other ' +
                  'marker so that they can be identified.'
              });
            }
            const id = isParticipant ? nextParticipantId++ : nextAgentId++;
            const newEntity = {
              name: trimmedName,
              id
            };
            entitiesArray.push(newEntity);
            resolve(newEntity); 
          }
        );
      }

      function isDuplicate(newThingName, thingsArray) {
        for (let i = 0; i < thingsArray.length; i++) {
          if (thingsArray[i].name === newThingName) {
            return true;
          }
        }
        return false;
      }

      function removeParticipant(id) {
        return new Promise(
          (resolve, reject) => {
            for (let i = 0; i < participants.length; i++) {
              if (participants[i].id === id) {
                const removedParticipantName = participants[i].name;
                participants.splice(i, 1);
                return resolve(removedParticipantName);
              }
            }
            reject({ message: 'Sorry, that participant could not be found. Please try again.' });
          }
        );
      }

      return {
        get participants() {
          return participants.map(participant => Object.assign({}, participant));
        },
        get bills() {
          return bills.map(bill => Object.assign({}, bill));
        },
        get agents() {
          return agents.map(agent => Object.assign({}, agent));
        },
        addParticipant: function(newParticipantName) {
          let result = addEntity('participant', newParticipantName);
          $rootScope.$emit('participants-change');
          return result;
        },
        addAgent: function(newAgentName) {
          let result = addEntity('agent', newAgentName);
          $rootScope.$emit('agents-change');
          return result;
        },
        removeParticipant: function(id) {
          let result = removeParticipant(id);
          $rootScope.$emit('participants-change');
          return result;
        },
        // great source for notifying components of changes:
          // https://www.codelord.net/2015/05/04/angularjs-notifying-about-changes-from-services-to-controllers/
        subscribeToParticipants: function(scope, callback) {
          const unsubscribe = $rootScope.$on('participants-change', () => callback(this.participants));
          scope.$on('$destroy', unsubscribe);
          return this.participants;
        },
        subscribeToAgents: function(scope, callback) {
          const unsubscribe = $rootScope.$on('agents-change', () => callback(this.agents));
          scope.$on('$destroy', unsubscribe);
          return this.agents;
        },
        subscribeToBills: function(scope, callback) {
          const unsubscribe = $rootScope.$on('bills-change', () => callback(this.bills));
          scope.$on('$destroy', unsubscribe);
          return this.bills;
        }
      };
    }
  ]);