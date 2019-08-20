'use strict';

angular
  .module('billFormData')
  .factory('BillFormData', [
    '$rootScope',
    'BillsList',
    'BillFormNameData',
    'BillFormAmountData',
    'BillFormBillersData',
    'BillFormIsPaidData',
    'BillFormResponsibilityData',
    function billFormNameDataFactory(
      $rootScope,
      BillsList,
      BillFormNameData,
      BillFormAmountData,
      BillFormBillersData,
      BillFormIsPaidData,
      BillFormResponsibilityData
    ) {
      console.log(BillFormNameData);
      let state = {};
      let inputValues = {
        
      }
      function reset() {
        console.log('reset')
        state.isButtonDisabled = true;
        state.hasSuccess = false;
        state.hasProblem = false;
      }

      function submitForm() {
        console.log('test');
      }
      // The following object is what is exposed to other parts of the program.
      /* I am attempting to make it so that other parts of the program that depend on
          this service are not able to alter any of the objects or functions defined above.
          This isn't really necessary, but it seemed like a good thing for me to learn. */
      return {
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