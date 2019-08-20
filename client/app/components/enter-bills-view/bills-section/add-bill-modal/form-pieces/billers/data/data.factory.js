'use-strict';

angular
  .module('billFormBillersData')
  .factory('BillFormBillersData', [
    '$rootScope',
    'BillFormAmountData',
    function($rootScope, BillFormAmountData) {
      let inputValue;

      reset();

      function reset() {
        inputValue = {
          oneOrMoreBillers: 'one',
          billersMultiple: [],
          billerSingle: {
            typeOrSelect: 'type',
            selected: null,
            typed: ''
          }
        };
        addBillerMultInput(2);
      }

      // adds n new biller inputs to Multiple Billers section
      function addBillerMultInput(n) {
        if (!n) n = 1;
        for (let i = 0; i < n; i++) {
          inputValue.billersMultiple.push({
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: BillFormAmountData.generateAmountInputValueObj()
          });
        }
      }

      function removeBillerMultInput(index) {
        inputValue.billersMultiple.splice(index, 1);
      }

      const CHANGE_EVENT_NAME = 'bill-form-billers-change';

      return {
        get value() {
          const {
            oneOrMoreBillers,
            billerSingle,
            billersMultiple
          } = inputValue;
          return {
            oneOrMoreBillers,
            billerSingle: Object.assign({}, billerSingle),
            billersMultiple: billersMultiple
              .map(
                biller => {
                  const { amount, ...otherProperties } = biller;
                  console.log(otherProperties)
                  const { raw, display } = amount;
                  return {
                    amount: { raw, display },
                    ...otherProperties
                  };
                }
              )
          };
        },
        updateValue(propNewValue, propName, nestedPropName, billMultIndex) {
          if (propName === 'oneOrMoreBillers') {
            inputValue.oneOrMoreBillers = propNewValue;
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
        },
        reset() {
          reset();
        },
        addBillerMult() {
          addBillerMultInput(1);
          $rootScope.$emit(CHANGE_EVENT_NAME);
        },
        removeBillerMult(index) {
          if (!index && index !== 0) throw Error('No index provided for remove biller');
          removeBillerMultInput(index);
          $rootScope.$emit(CHANGE_EVENT_NAME);
        },
        subscribe(scope, callback) {
          const unsubscribe = $rootScope.$on(
            CHANGE_EVENT_NAME,
            () => callback(this.value)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.value;
        }
      };
    }
  ]);