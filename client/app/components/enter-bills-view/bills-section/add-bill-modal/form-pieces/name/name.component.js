'use-strict';

angular
  .module('billFormBillName')
  .component('billFormBillName', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/name/form-bill-name.template.html',
    bindings: {
      inputName: '@',
    },
    controller: ['$scope', 'BillFormData',
      function billFormBillNameCtrl($scope, BillFormData) {
        this.INPUT_NAME = 'newBillNameIn';

        this.inputValue = BillFormData.subscribeToInputValue(
          'name',
          $scope,
          (updatedValue) => this.inputValue = updatedValue
        );

        this.handleChange = () => {
          BillFormData.inputValues.name = this.inputValue;
        };
      }
    ]
  });