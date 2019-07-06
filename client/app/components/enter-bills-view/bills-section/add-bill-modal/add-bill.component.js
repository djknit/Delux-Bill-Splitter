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

      this.resetForm = () => {
        this.isButtonDisabled = true;
        this.hasSuccess = false;
        this.hasProblem = false;

        this.nameInputValue = '';
        this.amountInputValue = {
          raw: null,
          rounded: null
        };
        this.billersInputValue = {
          oneOrMoreBillers: 'one',
          billersMultiple: [],
          billerSingle: {
            typeOrSelect: 'type',
            selected: null,
            typed: ''
          }
        };
        this.addMultBillerInput(2);
        this.responsibilityInputValue = {
          splittingMethod: 'evenlyBetweenAll',
          evenlyBetweenSomeParticipants: [], // Holds list of participants for splitting option of "evenly between some participants"
          allEvenlyAmountPerPerson: null,
          someEvenlyAmountPerPerson: null,
          individually: [] // Holds list of input groups for assigning responsibility individually (most customizable option)
        };
      };
      // The above function (this.resetForm()) is called at the end of this constructor.

      // adds n new biller inputs to Multiple Billers section
      this.addMultBillerInput = (n) => {
        if (!n) n = 1;
        for (let i = 0; i < n; i++) {
          this.billersInputValue.billersMultiple.push({
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: null,
            roundedAmount: null,
            amountDisplay: null
          });
        }
      };

      this.removeBillerInput = (index) => {
        this.inputValue.billersMultiple.splice(index, 1);
        this.handleChange();
      }

      this.updateInputValue = (propertyName, newValue) => {
        this[propertyName] = newValue;
        console.log(propertyName)
        console.log(this[propertyName]);
      };

      this.setRoundedAndDisplayAmountValues = (index) => {
        const biller = this.inputValue.billersMultiple[index];
        if (!biller.amount && biller.amount !== 0) {
          biller.roundedAmount = null;
          biller.amountDisplay = null;
        }
        else if (this.inputValue < 0) {
          biller.roundedAmount = null;
          biller.amountDisplay = 'negative';
        }
        else {
          biller.amountDisplay = biller.amount.toFixed(2);
          biller.roundedAmount = parseFloat(biller.amountDisplay);
        }
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

      this.addAnotherBill = () => {
        this.reset();
        // this.focusInput();
      }

      this.resetForm();
    }]
  });