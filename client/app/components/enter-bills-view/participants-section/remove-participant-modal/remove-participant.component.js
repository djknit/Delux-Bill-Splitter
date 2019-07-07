'use strict';

angular
  .module('removeParticipantModal')
  .component('removeParticipantModal', {
    templateUrl: 'components/enter-bills-view/participants-section/remove-participant-modal/remove-participant.template.html',
    bindings: {
      modalName: '@',
      participant: '<'
    },
    controller: ['BillsList', '$scope', 
      function removeParticipantModalCtrl(BillsList, $scope) {

        this.isButtonDisabled = false;
        this.hasSuccess = false;
        this.removedParticipantName = null;
        this.hasError = false;
        this.errorMessage = null;

        this.confirmRemove = (id) => {
          this.isButtonDisabled = true;
          this.executeRemove(id);
        };

        this.executeRemove = id => {
          BillsList.removeParticipant(id || this.participant.id)
            .then(removedParticipantName => {
              this.hasSuccess = true;
              this.removedParticipantName = removedParticipantName;
              $scope.$apply();
            })
            .catch(err => {
              this.hasError = true;
              this.errorMessage = err.message ||
                'Sorry! An unknown error has occurred. Please try again.';
            });
        }

        this.reset = () => {
          this.hasSuccess = false;
          this.isButtonDisabled = false;
          this.removedParticipantName = null;
        };

      }
    ]
  });