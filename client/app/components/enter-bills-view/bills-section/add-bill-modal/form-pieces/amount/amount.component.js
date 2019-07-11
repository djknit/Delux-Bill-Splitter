'use-strict';

angular
  .module('billFormAmount')
  .component('billFormAmount', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/amount/amount.template.html',
    bindings: {
    },
    controller: ['BillFormAmountData', '$scope',
      function billFormAmountCtrl(BillFormAmountData, $scope) {
        this.INPUT_NAME = 'newBillAmountIn';

        // Value returned from data service contains input and display values. Change handler is not needed
          // because setting input value on returned object updates data in service and brodcasts change.
        this.inputValue = BillFormAmountData.subscribe(
          $scope,
          (updatedValue) => this.inputValue = updatedValue
        );
      }
    ]
  });