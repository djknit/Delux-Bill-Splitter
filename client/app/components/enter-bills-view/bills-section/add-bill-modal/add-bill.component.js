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
    controller: ['$scope', function addBillModalCtrl($scope) {
      this.FORM_NAME = 'newBillForm';

      this.nameInputValue = '';
      this.amountInputValue = {
        raw: null,
        rounded: null
      }
      this.billersInputValue = {
        oneOrMoreBillers: 'one',
        billersMultiple: [],
        billerSingle: {
          typeOrSelect: 'type',
          selected: null,
          typed: ''
        }
      }

      this.isButtonDisabled = true;
      this.hasSuccess = false;
      this.isInputDisabled = false;
      this.completeNewBill = null;

      this.updateInputValue = (propertyName, newValue) => {
        this[propertyName] = newValue;
        console.log(propertyName)
        console.log(this[propertyName]);
      }

      this.test = () => {
        console.log(this.oneOrMoreBillersInputValue)
      }

      this.test2 = () => {
        console.log(this.oneBillerNameInputValue)
      }

      this.updateButtonDisable = () => {
        this.isButtonDisabled = this.nameInputValue === '';
      };

      this.submitForm = () => {
        this.disableForm();
        console.log(this.newBill);
        this.addBill(this.newBill)
          .then(newBill => {
            console.log(newBill)
            this.hasSuccess = true;
            this.completeNewBill = newBill;
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
        // this.focusInput();
      }
    }]
  });