'use-strict';

angular
  .module('billFormNameData')
  .factory('BillFormNameData', ['$rootScope',
    function nameDataFactory($rootScope) {
    
      let nameInputValue = null;

      const CHANGE_EVENT_NAME = 'bill-form-amount-change';

      return {
        get value() {
          return nameInputValue;
        },
        set value(newValue) {
          nameInputValue = newValue;
          $rootScope.$emit(CHANGE_EVENT_NAME);
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
          nameInputValue = null;
        }
      };
    }
  ]);