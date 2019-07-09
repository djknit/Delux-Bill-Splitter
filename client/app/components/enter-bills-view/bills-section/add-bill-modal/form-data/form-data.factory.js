'use strict';

angular
  .module('billFormData')
  .factory('BillFormData',['$rootScope', 'BillsList',
    function($rootScope, BillsList) {
      let entities = {
        agents: BillsList.subscribeToAgents(
          null,
          (agents) => entities.agents = agents
        ),
        participants: BillsList.subscribeToParticipants(
          null,
          (participants) => entities.participants = participants
        )
      };
      console.log(entities);
      let state = {};
      reset();

      function reset() {
        console.log('reset')
        state.isButtonDisabled = true;
        state.hasSuccess = false;
        state.hasProblem = false;
        state.inputValues = {};
        state.inputValues.name = '';
        state.inputValues.amount = generateAmountInputValueObj();
        state.inputValues.billers = {
          oneOrMoreBillers: 'one',
          billersMultiple: [],
          billerSingle: {
            typeOrSelect: 'type',
            selected: null,
            typed: ''
          }
        };
        addMultBillerInput(2);
        state.inputValues.responsibility = {
          splittingMethod: 'evenlyBetweenAll',
          evenlyBetweenSomeParticipants: [], // Holds list of participants for splitting option of "evenly between some participants"
          allEvenlyAmountPerPerson: null,
          someEvenlyAmountPerPerson: null,
          individually: [] // Holds list of input groups for assigning responsibility individually (most customizable option)
        };
      }

      function submitForm() {
        console.log('test');
      }

      function generateAmountInputValueObj() {
        return {
          _raw: null,
          rounded: null,
          display: null,
          set raw(value) {
            this._raw = value;
            if (!value && value !== 0) {
              this.rounded = null;
              this.display = null;
            }
            else if (value < 0) {
              this.rounded = null;
              this.display = 'negative';
            }
            else {
              this.display = value.toFixed(2);
              this.rounded = parseFloat(this.display);
            }
          },
          get raw() {
            return this._raw;
          },
          get self() {
            return {
              raw: this._raw,
              display: this.display
            };
          }
        };
      }

      // adds n new biller inputs to Multiple Billers section
      function addMultBillerInput(n) {
        if (!n) n = 1;
        for (let i = 0; i < n; i++) {
          state.inputValues.billers.billersMultiple.push({
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: generateAmountInputValueObj()
          });
        }
      }

      function removeBillerInput(index) {
        state.inputValues.billers.billersMultiple.splice(index, 1);
      }

      // The following object is what is exposed to other parts of the program.
      /* I am attempting to make it so that other parts of the program that depend on
          this service are not able to alter any of the objects or functions defined above.
          This isn't really necessary, but it seemed like a good thing for me to learn. */
      return {
        inputValues: {
          get name() {
            return state.inputValues.name;
          },
          set name(newName) {
            state.inputValues.name = newName;
            $rootScope.$emit('name-input-change');
          },
          get amount() {
            return {
              raw: state.inputValues.amount.raw,
              display: state.inputValues.amount.display
            };
          },
          get billers() {
            const {
              oneOrMoreBillers,
              billerSingle,
              billersMultiple
            } = state.inputValues.billers;
            return {
              get oneOrMoreBillers() {
                return state.inputValues.billers.oneOrMoreBillers;
              },
              set oneOrMoreBillers(newValue) {
                state.inputValues.billers.oneOrMoreBillers = newValue;
                $rootScope.$emit('billers-input-change');
              },
              billerSingle: Object.assign({}, billerSingle),
              billersMultiple: billersMultiple
                .map(
                  biller => {
                    let { amount, ...otherProperties } = biller;
                    return {
                      amount: amount.self,
                      ...otherProperties
                    };
                  }
                )
            };
          },
          get responsibility() {
            return null;
          }
        },
        updateBillers(singleOrMultiple, propertyName, newValue, index) {
          if (singleOrMultiple === 'single') {
            if (state.inputValues.billers.billerSingle[propertyName] !== undefined) {
              state.inputValues.billers.billerSingle[propertyName] = newValue;
              $rootScope.$emit('billers-input-change');
            }
          }
          else if (singleOrMultiple === 'multiple') {

          }
          else throw new Error('Error. Must be "single" or "multiple".');
        },
        get hasSuccess() {
          return state.hasSuccess;
        },
        get hasProblem() {
          return state.hasProblem;
        },
        get isButtonDisabled() {
          return state.isButtonDisabled;
        },
        subscribeToInputValue(propertyName, scope, callback) {
          const unsubscribe = $rootScope.$on(
            propertyName + '-input-change',
            () => callback(this.inputValues[propertyName])
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.inputValues[propertyName];
        },
        subscribeToHasSuccess(scope, callback) {
          const unsubscribe = $rootScope.$on(
            'hasSuccess-change',
            () => callback(this.hasSuccess)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.hasSuccess;
        },
        subscribeToHasProblem(scope, callback) {
          const unsubscribe = $rootScope.$on(
            'hasProblem-change',
            () => callback(this.hasProblem)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.hasProblem;
        },
        subscribeToIsButtonDisabled(scope, callback) {
          const unsubscribe = $rootScope.$on(
            'isButtonDisabled-change',
            () => callback(this.isButtonDisabled)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.isButtonDisabled;
        },
        updateAmountInput(newValue) {
          state.inputValues.amount.raw = newValue;
          $rootScope.$emit('amount-input-change');
        },
        reset: () => reset(),
        submitForm
      };
    }
  ]);