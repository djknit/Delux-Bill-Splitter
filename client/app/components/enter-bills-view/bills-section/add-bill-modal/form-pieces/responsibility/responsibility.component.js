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
        this.participants = BillsList.subscribeToParticipants(
          $scope,
          (updatedParticipants) => this.participants = updatedParticipants
        );

        this.handleChange = BillFormResponsibilityData.updateValue;
        
        this.addSomeEvenlyInput = () => BillFormResponsibilityData.addInput('someEvenly');
        this.removeSomeEvenlyInput = (index) => {
          BillFormResponsibilityData.removeInput('someEvenly', index);
        }
        this.addIndividuallyInput = () => {
          BillFormResponsibilityData.addInput('individually');
        }
        this.removeIndividuallyInput = (index) => {
          BillFormResponsibilityData.removeInput('individually', index);
        }
      }
    ]
  });