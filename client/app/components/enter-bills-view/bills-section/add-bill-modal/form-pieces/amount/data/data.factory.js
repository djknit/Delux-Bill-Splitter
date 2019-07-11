'use-strict';

angular
  .module('billFormAmountData')
  .factory('BillFormAmountData', [
    '$rootScope',
    function nameDataFactory($rootScope) {
    
      let billFormAmountInputValue = generateAmountInputValueObj();

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
          }
        };
      }

      const CHANGE_EVENT_NAME = 'bill-form-amount-change';

      return {
        get value() {
          return {
            get raw() {
              return billFormAmountInputValue.raw;
            },
            set raw(newRawValue) {
              billFormAmountInputValue.raw = newRawValue;
              $rootScope.$emit(CHANGE_EVENT_NAME);
            },
            get display() {
              return billFormAmountInputValue.display;
            },
            get rounded() {
              return billFormAmountInputValue.rounded;
            }
          };
        },
        subscribe(scope, callback) {
          const unsubscribe = $rootScope.$on(
            CHANGE_EVENT_NAME,
            () => callback(this.value)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.value;
        },
        reset() {
          this.value = generateAmountInputValueObj();
        },
        generateAmountInputValueObj() {
          return generateAmountInputValueObj();
        }
      };
    }
  ]);