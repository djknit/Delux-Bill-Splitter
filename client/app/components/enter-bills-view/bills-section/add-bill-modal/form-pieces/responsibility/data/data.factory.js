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
            checkParticipantsArrayForRemovedParticipants(inputValue.someEvenly.participants);
            checkParticipantsArrayForRemovedParticipants(inputValue.individually);
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

      function checkParticipantsArrayForRemovedParticipants(array) {
        // used when bill list participants change in order to make sure responsibility is not
          // being assigned to a participant that is no longer in the list
        array.forEach((participantInput, index) => {
          const participant = participantInput.selected;
          if (!participant) return null;
          if (participants.indexOf(participant.id) > -1) array.splice(index, 1);
        })
      };

      let inputValue = {};
      reset();

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
            // used to exclude already chosen participants from dropdown so duplicate cannot be chosen
            const alreadyChosenIds = inputValue.someEvenly.participants.filter(
              participantInput => participantInput.selected
            ).map(
              participantInput => participantInput.selected.id
            );
            return participants.filter(
              participant => alreadyChosenIds.indexOf(participant.id) === -1
            ).map(participant => participant.id);
          }
        };
        inputValue.individually = [];
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
          selected: null
        });
      }

      function addIndividuallyInput() { 
        inputValue.individually.push({
          selected: null,
          amount: {
            method: 'dollarAmount',
            dollarAmount: BillFormAmountData.generateAmountInputValueObj(),
            percent: generatePercentAmountInputValueObj(),
            remainingAmount: BillFormAmountData.generateAmountInputValueObj(),
            get currentTotal() {
              if (this.method = 'dollarAmount') return this.dollarAmount.rounded;
              if (this.method = 'percent') return this.percent.rounded;
              else throw new Error('Cannot get individual total');
            }
          }
        })
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
        const numParticipants = inputValue.individually.length;
        if (numParticipants === 0) return null;
        let totalAmountAssigned = 0;
        inputValue.individually.forEach((individual, index) => {
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

      function announceChange() {
        $rootScope.$emit(CHANGE_EVENT_NAME);
      }

      return {
        get inputValue() {
          const { someEvenly, individually, splittingMethod, allEvenlyAmountPerPerson } = inputValue;
          return {
            someEvenly: {
              amountPerPerson: someEvenly.amountPerPerson.display,
              participants: someEvenly.participants.map(
                participantInput => {
                  let result = Object.assign({}, participantInput);
                  let choiceIds = someEvenly.remainingChoiceIds;
                  if (participantInput.selected !== null) {
                    choiceIds.push(participantInput.selected.id);
                  }
                  result.choices = participants.map(
                    participant => {
                      const isValidChoice = choiceIds.indexOf(participant.id) > -1;
                      return {
                        value: participant,
                        isValidChoice
                      }
                    }
                  );
                  return result;
                }
              )
            },
            individually: individually.map(participant => {
              const { selected, amount } = participant;
              const { method, dollarAmount, percent, remainingAmount } = amount;
              return {
                selected: Object.assign({}, selected),
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
            }),
            splittingMethod,
            allEvenlyAmountPerPerson: allEvenlyAmountPerPerson.display
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