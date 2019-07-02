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
        // If billersMultiple.length < 2, add new biller input objects to array so there are at least 2
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
            typed: ''
          }
        };
        this.addNewBillerInput(2);
      }
      
      this.handleChange = (index) => {
        // if index is defined, an amount value was changed
        if (index || index === 0) this.setRoundedAndDisplayAmountValues(index);
        this.reportChange(this.propertyName, this.inputValue);
      }

      this.addBillerInput = (n) => {
        if (!n) n = 1;
        for (let i = 0; i < n; i++) {
          this.inputValue.billersMultiple.push({
            typeOrSelect: 'type',
            selected: null,
            typed: '',
            amount: null,
            roundedAmount: null,
            amountDisplay: null
          });
        }
      }

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

    }
  }); 