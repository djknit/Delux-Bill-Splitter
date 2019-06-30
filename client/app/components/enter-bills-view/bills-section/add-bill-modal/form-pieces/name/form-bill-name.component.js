'use-strict';

angular
  .module('billFormBillName')
  .component('billFormBillName', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/name/form-bill-name.template.html',
    bindings: {
      inputName: '@',
      inputValue: '<',
      reportChange: '<',
      propertyName: '@'
    },
    controller: function billFormBillNameCtrl() {
      this.handleChange = () => {
        this.reportChange(this.propertyName, this.inputValue);
      }
    }
  });