'use-strict';

angular
  .module('billFormAmount')
  .component('billFormAmount', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/amount/form-amount.template.html',
    bindings: {
    },
    controller: ['BillFormData', '$scope',
      function billFormAmountCtrl(BillFormData, $scope) {
        this.INPUT_NAME = 'newBillAmountIn';

        this.inputValue = BillFormData.subscribeToInputValue(
          'amount',
          $scope,
          (updatedValue) => this.inputValue = updatedValue
        );

        this.handleChange = () => {
          BillFormData.updateAmountInput(this.inputValue.raw);
        };
      }
    ]
  });