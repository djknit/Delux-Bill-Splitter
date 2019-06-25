'use strict';

angular
  .module('participantsSection')
  .component('participantsSection', {
    templateUrl: 'components/enter-bills-view/participants-section/participants.template.html',
    bindings: {
      participants: '<',
      addParticipant: '<'
    },
    transclude: false,
    controller: function participantsSectionCtrl() {
      this.MODAL_NAME = 'addParticipantModal';
      this.NAME_INPUT_NAME = 'newParticipantNameIn';

      this.focusInput = () => $('#' + this.NAME_INPUT_NAME).focus();

      this.openModal = () => {
        $('#' + this.MODAL_NAME).modal('show');
        this.delayedFocusInput();
      }

      // It keeps losing focus when I focus on input right after adding it to page
      this.delayedFocusInput = () => {
        setTimeout(() => {
          this.focusInput();
        }, 200);
        // Wait .5 sec b/c otherwise focus will be lost
        setTimeout(() => {
          this.focusInput();
        }, 500);
        // Just in case first one doesnt work
        setTimeout(() => {
          this.focusInput();
        }, 800);
      }
    }
  });