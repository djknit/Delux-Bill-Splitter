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
      this._inputValue = '';
      this.handleChange = () => {
        console.log('change')
        console.log(this._inputValue)
        this.reportChange(this.propertyName, this._inputValue)
      }
    }
  });