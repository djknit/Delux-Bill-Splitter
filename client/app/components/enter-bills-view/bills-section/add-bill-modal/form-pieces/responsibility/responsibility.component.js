'use-strict';

angular
  .module('billFormResponsibility')
  .component('billFormResponsibility', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/responsibility/responsibility.template.html',
    controller: [
      'BillFormResponsibilityData', '$scope', 'BillsList',
      function billFormResponsibilityCtrl(BillFormResponsibilityData, $scope, BillsList) {
        this.inputValue = BillFormResponsibilityData.subscribe(
          $scope,
          (updatedInputValue) => {
            this.inputValue = updatedInputValue;
            console.log(updatedInputValue);
          }
        );
        console.log(this.inputValue);
        this.participants = BillsList.subscribeToParticipants(
          $scope,
          (updatedParticipants) => this.participants = updatedParticipants
        );

        this.handleChange = () => {
          console.log(this.inputValue)
        }
      }
    ]
  });