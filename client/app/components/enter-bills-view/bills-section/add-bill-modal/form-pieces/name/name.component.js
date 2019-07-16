'use-strict';

angular
  .module('billFormBillName')
  .component('billFormBillName', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/name/name.template.html',
    bindings: {
      inputName: '@',
    },
    controller: ['$scope', 'BillFormNameData',
      function billFormBillNameCtrl($scope, BillFormNameData) {
        this.inputValue = BillFormNameData.subscribe(
          $scope,
          (updatedValue) => this.inputValue = updatedValue
        );

        this.handleChange = () => {
          BillFormNameData.value = this.inputValue;
        };
      }
    ]
  });