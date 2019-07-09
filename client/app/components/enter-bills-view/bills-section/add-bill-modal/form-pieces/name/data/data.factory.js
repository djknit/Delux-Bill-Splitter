'use-strict';

import { checkServerIdentity } from "tls";

angular
  .module('billFormAmountData')
  .factory('BillFormAmountData', ['$rootScope',
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
            () => callback(this.nameInputValue)
          );
          if (scope) scope.$on('$destroy', unsubscribe);
          return this.nameInputValue
        }
      };
    }
  ]);