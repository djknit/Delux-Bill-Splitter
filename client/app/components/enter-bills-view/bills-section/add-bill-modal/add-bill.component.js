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
      this.amountInputValue = 0;
      this.amountDisplayValue = undefined;

      this.isButtonDisabled = true;
      this.hasSuccess = false;
      this.isInputDisabled = false;
      this.newBill = null;

      this.updateButtonDisable = () => {
        this.isButtonDisabled = this.nameInputValue === '';
      };

      this.updateAmountDisplay = () => {
        console.log(this.amountInputValue);
        console.log($filter('currency'));
        const roundedValue = parseFloat(this.amountInputValue.toFixed(2));
        const val = $filter('currency')(roundedValue);
        console.log(val);
        console.log(parseFloat(val));
        this.amountDisplayValue = val;
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