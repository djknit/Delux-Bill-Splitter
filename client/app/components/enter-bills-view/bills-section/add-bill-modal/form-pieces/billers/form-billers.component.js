'use-strict';

angular
  .module('billFormBillers')
  .component('billFormBillers', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/billers/form-billers.template.html',
    bindings: {
      inputValue: '<',
      reportChange: '<',
      propertyName: '@',
      agents: '<',
      addBillerInput: '<',
      removeBillerInput: '<'
    },
    controller: function billFormBillersCtrl() {
      this.handleChange = () => {
        this.reportChange(this.propertyName, this.inputValue);
      }
    }
  });