'use strict';

angular
  .module('addBillModal')
  .component('addBillModal', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/add-bill.template.html',
    bindings: {
      modalName: '@',
      nameInputName: '@',
      focusInput: '<',
    },
    controller: ['BillsList', '$scope',
      function addBillModalCtrl(BillsList, $scope) {
        this.FORM_NAME = 'newBillForm';

        this.resetForm = () => {
          this.isButtonDisabled = true;
          this.hasSuccess = false;
          this.hasProblem = false;

          this.nameInputValue = '';
          this.amountInputValue = generateAmountInputValueObj();
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

        this.agents = BillsList.subscribeToBills(
          $scope,
          (agents) => this.agents = agents
        );

        function generateAmountInputValueObj() {
          return {
            raw: null,
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

        // adds n new biller inputs to Multiple Billers section
        this.addMultBillerInput = (n) => {
          if (!n) n = 1;
          for (let i = 0; i < n; i++) {
            this.billersInputValue.billersMultiple.push({
              typeOrSelect: 'type',
              selected: null,
              typed: '',
              amount: generateAmountInputValueObj()
            });
          }
        };

        this.removeBillerInput = (index) => {
          this.billersInputValue.billersMultiple.splice(index, 1);
          // this.handleChange();
        }

        this.updateInputValue = (propertyName, newValue) => {
          this[propertyName] = newValue;
          console.log(propertyName)
          console.log(this[propertyName]);
        };

        this.submitForm = () => {
          this.disableForm();
          console.log(this.newBill);
          BillsList.addBill(this.newBill)
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
      }
    ]
  });