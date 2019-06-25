'use strict';

angular
  .module('removeParticipantModal')
  .component('removeParticipantModal', {
    templateUrl: 'components/enter-bills-view/participants-section/remove-participant-modal/remove-participant.template.html',
    bindings: {
      modalName: '@',
      participant: '<',
      removeParticipant: '<'
    },
    controller: ['$scope', function removeParticipantModalCtrl($scope) {

      this.isButtonDisabled = false;
      this.hasSuccess = false;
      this.removedParticipantName = null;
      this.hasError = false;
      this.errorMessage = null;

      this.confirmRemove = (id) => {
        // next line prevents error caused by double clicking "Remove" button
        // if (this.isButtonDisabled) return null;
        this.isButtonDisabled = true;
        console.log(this.removeParticipant)
        console.log(this)
        this.executeRemove(id);
      };

      this.executeRemove = id => {
        console.log(this.removeParticipant)
        if (!this.removeParticipant) {
          setTimeout(() => {
            // this.executeRemove(id);
          }, 100);
        }
        else {
          this.removeParticipant(id || this.participant.id)
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
      }

      this.reset = () => {
        this.hasSuccess = false;
        this.isButtonDisabled = false;
        this.removedParticipantName = null;
      };

    }]
  });