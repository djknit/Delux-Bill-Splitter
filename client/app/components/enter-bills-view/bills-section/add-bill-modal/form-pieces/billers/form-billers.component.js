'use-strict';

angular
  .module('billFormBillers')
  .component('billFormBillers', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/billers/form-billers.template.html',
    bindings: {
      inputValue: '<',
      reportChange: '<',
      propertyName: '@'
    },
    controller: function billFormBillersCtrl() {
      this.$onInit = () => {
        if (!this.inputValue) this.inputValue = getDefaultValues();
        const numBillersMult = this.inputValue.billersMultiple.length;
        if (numBillersMult < 2) {
          this.addBillerInput(2 - numBillersMult);
        }
      }

      const resetInputValues = () => {
        this.inputValue = {
          oneOrMoreBillers: 'one',
          billersMultiple: [],
          billerSingle: {
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: null
          }
        };
        this.addNewBillerInput(2);
      }
      
      this.handleChange = () => {
        this.reportChange(this.propertyName, this.inputValue);
      }

      this.addBillerInput = (n) => {
        if (!n) n = 1;
        for (let i = 0; i < n; i++) {
          this.inputValue.billersMultiple.push({
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: null
          });
        }
      }

      this.getBiller
    }
  }); 