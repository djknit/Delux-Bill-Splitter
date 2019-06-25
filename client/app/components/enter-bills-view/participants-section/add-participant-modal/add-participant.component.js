'use strict';

angular
  .module('addParticipantModal')
  .component('addParticipantModal', {
    templateUrl: 'components/enter-bills-view/participants-section/add-participant-modal/add-participant.template.html',
    bindings: {
      modalName: '@',
      nameInputName: '@',
      addParticipant: '<',
      focusInput: '<'
    },
    controller: ['$scope', function addParicipantModalCtrl($scope) {
      this.FORM_NAME = 'newParticipantForm';

      this.nameInputValue = '';
      this.isButtonDisabled = true;
      this.hasSuccess = false;
      this.isInputDisabled = false;
      this.newParticipant = null;

      this.updateButtonDisable = () => {
        this.isButtonDisabled = this.nameInputValue === '';
      };

      this.submitForm = () => {
        this.disableForm();
        this.addParticipant(this.nameInputValue)
          .then(newParticipant => {
            this.hasSuccess = true;
            this.newParticipant = newParticipant;
            $scope.$apply();
          });
      };

      this.disableForm = (disable) => {
        const reverse = disable === false;
        this.isInputDisabled
          = this.isButtonDisabled
          = reverse ? false : true;
      };

      this.reset = () => {
        this.nameInputValue = '';
        this.hasSuccess = false;
        this.disableForm(false);
      };

      this.addAnotherParticipant = () => {
        this.reset();
        this.focusInput();
      }
    }]
  });