'use strict';

angular
  .module('participantsSection')
  .component('participantsSection', {
    templateUrl: 'components/enter-bills-view/participants-section/participants.template.html',
    bindings: {
      participants: '<',
      addParticipant: '<',
      removeParticipant: '<'
    },
    transclude: false,
    controller: function participantsSectionCtrl() {

      this.ADD_PRTCPNT_MODAL_NAME = 'addParticipantModal';
      this.REMOVE_PRTCPNT_MODAL_NAME = 'removeParticipantModal';
      this.NAME_INPUT_NAME = 'newParticipantNameIn';

      this.participantToRemove = null;

      this.openAddParticipantModal = () => {
        $('#' + this.ADD_PRTCPNT_MODAL_NAME).modal('show');
        this.delayedFocusInput();
      };

      this.focusInput = () => $('#' + this.NAME_INPUT_NAME).focus();

      // To fix problem: losing focus when I focus on input right after adding it to page
      this.delayedFocusInput = () => {
        setTimeout(() => {
          this.focusInput();
        }, 200);
        // Wait .5 sec b/c otherwise focus will be lost
        setTimeout(() => {
          this.focusInput();
        }, 500);
        // Just in case 1st and 2nd don't work
        setTimeout(() => {
          this.focusInput();
        }, 800);
      };

      this.openRemoveParticipantModal = participant => {
        console.log(participant)
        this.participantToRemove = participant;
        $('#' + this.REMOVE_PRTCPNT_MODAL_NAME).modal('show');
      };

    }
  });