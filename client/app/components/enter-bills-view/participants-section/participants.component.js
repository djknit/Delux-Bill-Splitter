'use strict';

angular
  .module('participantsSection')
  .component('participantsSection', {
    templateUrl: 'components/enter-bills-view/participants-section/participants.template.html',
    bindings: {
      participants: '='
    },
    transclude: false,
    controller: function participantsSectionCtrl() {}
  });