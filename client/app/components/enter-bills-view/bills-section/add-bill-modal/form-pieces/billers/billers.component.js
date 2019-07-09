'use-strict';

angular
  .module('billFormBillers')
  .component('billFormBillers', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/billers/form-billers.template.html',
    controller: ['BillFormData', '$scope',
    function billFormBillersCtrl(BillFormData, $scope) {
      this.INPUT_NAME = 'newBillBillersIn';

      this.inputValue = BillFormData.subscribeToInputValue(
        'billers',
        $scope,
        (updatedValue) => this.inputValue = updatedValue
      );

      this.handleChange = () => {
        BillFormData.updateBillersInput(this.inputValue.raw);
      };
    }
  ]
  });