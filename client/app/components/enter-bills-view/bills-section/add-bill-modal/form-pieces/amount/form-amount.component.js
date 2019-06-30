'use-strict';

angular
  .module('billFormAmount')
  .component('billFormAmount', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/amount/form-amount.template.html',
    bindings: {
      inputName: '@',
      inputValue: '<',
      reportChange: '<',
      propertyName: '@'
    },
    controller: function billFormAmountCtrl() {
      this.handleChange = () => {
        this.setRoundedAndDisplayValues();
        this.reportChange(this.propertyName, {
          raw: this.inputValue,
          rounded: this.roundedAmountValue
        });
      }

      this.setRoundedAndDisplayValues = () => {
        if (!this.inputValue && this.inputValue !== 0) {
          this.roundedAmountValue = null;
          this.amountDisplayValue = null;
        }
        else if (this.inputValue < 0) {
          this.roundedAmountValue = null;
          this.amountDisplayValue = 'negative';
        }
        else {
          this.amountDisplayValue = this.inputValue.toFixed(2);
          this.roundedAmountValue = parseFloat(this.amountDisplayValue);
        }
      }

      // source: https://stackoverflow.com/questions/38591685/why-are-my-component-bindings-undefined-in-its-controller
      this.$onInit = this.setRoundedAndDisplayValues;
    }
  });