'use strict';

angular
  .module('addBillModal')
  .component('addBillModal', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/add-bill.template.html',
    bindings: {
      modalName: '@',
      nameInputName: '@',
      addBill: '<',
      focusInput: '<',
      participants: '<',
      agents: '<'
    },
    controller: ['$scope', '$filter', function addBillModalCtrl($scope, $filter) {
      this.FORM_NAME = 'newBillForm';
      this.AMOUNT_INPUT_NAME = 'newBillAmountIn';

      this.nameInputValue = '';
      this.amountInputValue = null;
      this.amountDisplayValue = null;

      this.isButtonDisabled = true;
      this.hasSuccess = false;
      this.isInputDisabled = false;
      this.newBill = null;

      this.updateButtonDisable = () => {
        this.isButtonDisabled = this.nameInputValue === '';
      };

      this.updateAmountDisplay = () => {
        if (!this.amountInputValue && this.amountInputValue !== 0) return this.amountDisplayValue = null;
        else this.amountDisplayValue = this.amountInputValue.toFixed(2);
      }

      this.submitForm = () => {
        this.disableForm();
        this.addBill({ name: this.nameInputValue })
          .then(newBill => {
            this.hasSuccess = true;
            this.newBill = newBill;
            // Updates view.
              // source: https://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-angularjs
            $scope.$apply();
          });
      };

      this.disableForm = (disable) => {
        const reverse = disable === false;
        this.isInputDisabled
          = this.isButtonDisabled
          = reverse ? false : true;
      };

      this.reset = () => {
        this.nameInputValue = '';
        this.hasSuccess = false;
        this.disableForm(false);
      };

      this.addAnotherBill = () => {
        this.reset();
        this.focusInput();
      }
    }]
  });