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
        this.reportChange(this.propertyName, {
          raw: this.inputValue,
          rounded: this.roundedAmountValue
        });
      };
    }
  });