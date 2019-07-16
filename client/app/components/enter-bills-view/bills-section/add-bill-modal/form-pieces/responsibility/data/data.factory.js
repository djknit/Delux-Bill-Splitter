'use-strict';

angular
  .module('billFormResponsibilityData')
  .factory('BillFormResponsibilityData', [
    'BillsList', 'BillFormAmountData', '$rootScope',
    function(BillsList, BillFormAmountData, $rootScope) {

      const CHANGE_EVENT_NAME = 'bill-form-responsibility-change';

      let participants = BillsList.subscribeToParticipants(
        null,
        (updatedParticipants) => {
          participants = updatedParticipants;
          if (participants.length === 0) {
            inputValue.someEvenly.participants = [];
            inputValue.individually = [];
          }
          else {
            checkParticipantsArrayForRemovedParticipants(inputValue.individually.participants);
            setIndividuallyRemainingAmount();
          }
          announceChange();
        }
      );

      let amountInput = BillFormAmountData.subscribe(
        null,
        (updatedAmountObj) => {
          amountInput = updatedAmountObj;
          setIndividuallyRemainingAmount();
          announceChange();
        }
      );

      let inputValue = {};

      reset();

      function checkParticipantsArrayForRemovedParticipants(array) {
        // used when bill list participants change in order to make sure responsibility is not
          // being assigned to a participant that is no longer in the list
        const participantIds = participants.map(participant => participant.id);
        array = array.filter((participantInput) => {
          const { selectedId } = participantInput;
          if (!selectedId) return true;
          if (participantIds.indexOf(selectedId) === -1) return false;
          return true;
        });
      };

      function reset() {
        inputValue.splittingMethod = 'evenlyBetweenAll';
        inputValue.allEvenlyAmountPerPerson = {
          get display() {
            return calculateAmountPerPersonDisplayValue(participants.length);
          },
          get rounded() {
            return this.display === null ? null : parseFloat(this.display);
          }
        },
        inputValue.someEvenly = {
          amountPerPerson: {
            get display() {
              return calculateAmountPerPersonDisplayValue(inputValue.someEvenly.participants.length);
            },
            get rounded() {
              return this.display === null ? null : parseFloat(this.display);
            }
          },
          participants: [],
          get remainingChoiceIds() {
            return getRemainingChoiceIds(inputValue.someEvenly.participants);
          }
        };
        inputValue.individually = {
          participants: [],
          get remainingChoiceIds() {
            return getRemainingChoiceIds(inputValue.individually.participants);
          }
        };
        addSomeEvenlyInput();
        addIndividuallyInput();
      }

      function calculateAmountPerPersonDisplayValue(numParticipants) {
        const billTotal = amountInput.rounded;
        if (numParticipants === 0 || billTotal === null) return null;
        else {
          return (billTotal / numParticipants).toFixed(2);
        }
      }

      function addSomeEvenlyInput() {
        if (inputValue.someEvenly.participants.length >= participants.length) {
          return null;
        }
        inputValue.someEvenly.participants.push({
          selectedId: null
        });
      }

      function addIndividuallyInput() { 
        inputValue.individually.participants.push({
          selectedId: null,
          amount: {
            method: 'dollarAmount',
            dollarAmount: BillFormAmountData.generateAmountInputValueObj(),
            percent: generatePercentAmountInputValueObj(),
            remainingAmount: BillFormAmountData.generateAmountInputValueObj(),
            get currentTotal() {
              console.log(this);
              if (this.method = 'dollarAmount') return this.dollarAmount.rounded;
              if (this.method = 'percent') return this.percent.rounded;
              if (this.method = 'remainingAmount') return this.remainingAmount.rounded;
              else throw new Error('Cannot get individual total');
            }
          }
        });
        console.log(inputValue.individually.participants);
        console.log(inputValue.individually.participants[0].amount.currentTotal);
      }

      function getRemainingChoiceIds(participantInputsArray) {
        // used to exclude already chosen participants from dropdown so duplicate cannot be chosen
        const alreadyChosenIds = participantInputsArray.filter(
          participantInput => participantInput.selectedId !== null
        ).map(participantInput => participantInput.selectedId);
        const allParticipantIds = participants.map(participant => participant.id);
        console.log(allParticipantIds.filter(id => alreadyChosenIds.indexOf(id) === -1))
        return allParticipantIds.filter(id => alreadyChosenIds.indexOf(id) === -1);
      }

      function generatePercentAmountInputValueObj() {
        return {
          raw: null,
          // `raw` is the percent value. `display` and `rounded` are dollar amounts
          get display() {
            const { raw } = this;
            const billTotal = amountInput.rounded;
            if ((!raw && raw !== 0) || (!billTotal && billTotal !== 0)) {
              return null;
            }
            else if (raw < 0 || raw > 100) {
              return 'invalid';
            }
            else {
              this.display = (value * billTotal / 100).toFixed(2);
            }
          },
          get rounded() {
            const { display } = this;
            if (display === null || display === 'invalid') return null;
            return parseFloat(display);
          }
        };
      }

      function setIndividuallyRemainingAmount() {
        const billTotal = amountInput.rounded;
        const numParticipants = inputValue.individually.participants.length;
        if (numParticipants === 0) return null;
        let totalAmountAssigned = 0;
        inputValue.individually.participants.forEach((individual, index) => {
          let individualRemainingAmountObj = individual.amount.remainingAmount;
          if (!billTotal && billTotal !== 0) {
            return individualRemainingAmountObj.raw = null;
          }
          // remainingAmount is only calculated for the last entry in the individually section
          else if (index < numParticipants - 1) {
            const individualTotal = individual.currentTotal || 0;
            totalAmountAssigned += individualTotal;
            return individualRemainingAmountObj.raw = null;
          }
          else {
            individualRemainingAmountObj.raw = billTotal - totalAmountAssigned;
          }
        })
      }
      
      function addChoicesArrayToParticipantInputs(inputsArray, remainingChoiceIdsArray) {
        return inputsArray.map(
          participantInput => {
            let result = Object.assign({}, participantInput);
            result.choices = participants.map(
              participant => {
                console.log(participant)
                console.log(remainingChoiceIdsArray)
                const isValidChoice = remainingChoiceIdsArray.indexOf(participant.id) > -1
                  || participant.id === participantInput.selectedId;
                console.log(isValidChoice)
                return {
                  value: participant,
                  isValidChoice
                }
              }
            );
            return result;
          }
        );
      }

      function announceChange() {
        $rootScope.$emit(CHANGE_EVENT_NAME);
      }

      return {
        get inputValue() {
          const {
            someEvenly, individually, splittingMethod, allEvenlyAmountPerPerson
          } = inputValue;
          let individuallyParticipants = individually.participants.map(participant => {
            const { selectedId, amount } = participant;
            const { method, dollarAmount, percent, remainingAmount } = amount;
            return {
              selectedId,
              amount: {
                method,
                dollarAmount: {
                  raw: dollarAmount.raw,
                  display: dollarAmount.display
                },
                percent: {
                  raw: percent.raw,
                  display: percent.display
                },
                remainingAmount: remainingAmount.display
              }
            }
          });
          return {
            someEvenly: {
              amountPerPerson: someEvenly.amountPerPerson.display,
              participants: addChoicesArrayToParticipantInputs(
                inputValue.someEvenly.participants,
                inputValue.someEvenly.remainingChoiceIds
              )
            },
            individually: {
              participants: addChoicesArrayToParticipantInputs(
                individuallyParticipants,
                inputValue.individually.remainingChoiceIds
              ),
              splittingMethod,
              allEvenlyAmountPerPerson: allEvenlyAmountPerPerson.display
            }
          };
        },
        subscribe(scope, callback) {
          const unsubscribe = $rootScope.$on(
            CHANGE_EVENT_NAME,
            () => callback(this.inputValue)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.inputValue;
        },
        addInput(type) {
          if (type === 'someEvenly') addSomeEvenlyInput();
          else if (type === 'individually') addIndividuallyInput();
          else throw new Error('Invalid input type argument');
          announceChange();
        },
        removeInput(type, index) {
          let arrayToEdit;
          if (type === 'someEvenly') arrayToEdit = inputValue.someEvenly.participants;
          else if (type === 'individually') inputValue.individually;
          else throw new Error('Invalid input type argument');
          arrayToEdit.splice(index, 1);
          announceChange();
        },
        updateValue(propNewValue, propName, nestedPropName, index, doubleNestedPropName) {
          if (propName === 'splittingMethod') {
            inputValue.splittingMethod = propNewValue;
          }
          else if (propName === 'someEvenly') {
            inputValue.someEvenly.participants[index][nestedPropName] = propNewValue;
          }
          else if (propName === 'individually' && nestedPropName === 'amount') {
            if (doubleNestedPropName === 'dollarAmount' || doubleNestedPropName === 'percent') {
              inputValue.individually[index].amount[doubleNestedPropName].raw = propNewValue;
            }
            else inputValue.individually[index].amount[doubleNestedPropName] = propNewValue;
          }
          else if (propName === 'individually') {
            inputValue.individually[index][nestedPropName] = propNewValue;
          }
          else throw new Error('Invalid property name.');
          if (propName === 'individually') setIndividuallyRemainingAmount();
          announceChange();
        }
      };
    }
  ]);