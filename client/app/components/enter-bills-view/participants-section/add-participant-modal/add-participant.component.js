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
    controller: ['$scope', function addParticipantModalCtrl($scope) {
      this.FORM_NAME = 'newParticipantForm';

      this.nameInputValue = '';
      this.isButtonDisabled = true;
      this.hasSuccess = false;
      this.isInputDisabled = false;
      this.newParticipant = null;
      this.hasError = false;
      this.errorMessage = null;
      this.nameInErrorMessage = null;

      this.updateButtonDisable = () => {
        this.isButtonDisabled = this.nameInputValue === '';
      };

      this.submitForm = () => {
        this.disableForm();
        this.addParticipant(this.nameInputValue)
          .then(newParticipant => {
            this.hasSuccess = true;
            this.hasError = false;
            this.newParticipant = newParticipant;
            this.nameInErrorMessage = null;
            // Updates view.
              // source: https://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-angularjs
            $scope.$apply();
          })
          .catch(err => {
            this.hasError = true;
            this.errorMessage = (err && err.message)
              || 'An unknown error was encountered. Please try again.';
            this.nameInErrorMessage = (err && err.name) || null;
            this.disableForm(false);
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
        this.isButtonDisabled = true;
        this.hasSuccess = false;
        this.isInputDisabled = false;
        this.newParticipant = null;
        this.hasError = false;
        this.errorMessage = null;
        this.nameInErrorMessage = null;
      };

      this.addAnotherParticipant = () => {
        this.reset();
        this.focusInput();
      }
    }]
  });