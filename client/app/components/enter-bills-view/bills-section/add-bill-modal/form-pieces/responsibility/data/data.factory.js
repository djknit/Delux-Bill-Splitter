'use-strict';

angular
  .module('billFormResponsibilityData')
  .factory('BillFormResponsibilityData', [
    'BillsList', 'BillFormAmountData', '$rootScope',
    function(BillsList, BillFormAmountData, $rootScope) {
      let agents = BillsList.subscribeToAgents(
        null,
        (updatedAgents) => agents = updatedAgents
      );
      let participants = BillsList.subscribeToParticipants(
        null,
        (updatedParticipants) => participants = updatedParticipants
      );
      let amountInput = BillFormAmountData.subscribe(
        null,
        (updatedAmountObj) => amountInput = updatedAmountObj 
      );

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
          participants: []
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
            remainingAmount: null,
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

      function getRemainingAmountForLastIndividual() {
        const billTotal = amountInput.rounded;
        const numParticipants = inputValue.individually.length;
        if (numParticipants === 0) return null;
        let totalAmountAssigned = 0;
        inputValue.individually.forEach((individual, index) => {
          if (!billTotal && billTotal !== 0) {
            return individual.remainingAmount = null;
          }
          else if (index < numParticipants - 1) {
            const individualTotal = individual.currentTotal || 0;
            totalAmountAssigned += individualTotal;
            individual.remainingAmount = null;
          }
          else {
            remainingAmount = billTotal - totalAmountAssigned;
            individual.remainingAmount = {
              rounded: remainingAmount,
              display: remainingAmount < 0 ? 'negative' : remainingAmount.toFixed(2)
            }
          }
        })
      }

      const CHANGE_EVENT_NAME = 'bill-form-responsibility-change';

      return {
        get inputValue() {
          const { someEvenly, individually, splittingMethod, allEvenlyAmountPerPerson } = inputValue;
          return {
            someEvenly: {
              amountPerPerson: someEvenly.amountPerPerson.display,
              participants: someEvenly.participants.map(
                participant => Object.assign({}, participant)
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
                  }
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
          $rootScope.$emit(CHANGE_EVENT_NAME);
        },
        removeInput(type, index) {
          
        },
        updateValue(propNewValue, propName, nestedPropName, index) {
          if (propName === 'splittingMethod') {
            inputValue.splittingMethod = propNewValue;
          }
          else if (propName === 'billerSingle') {
            inputValue.billerSingle[nestedPropName] = propNewValue;
          }
          else if (propName === 'billersMultiple' && nestedPropName === 'amount') {
            inputValue.billersMultiple[billMultIndex].amount.raw = propNewValue.raw;
          }
          else if (propName === 'billersMultiple') {
            inputValue.billersMultiple[billMultIndex][nestedPropName] = propNewValue;
          }
          else throw new Error('Invalid property name.');
          $rootScope.$emit(CHANGE_EVENT_NAME);
        }
      };
    }
  ]);