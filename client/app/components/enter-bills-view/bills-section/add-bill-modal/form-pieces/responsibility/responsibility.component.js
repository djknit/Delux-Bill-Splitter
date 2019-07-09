'use-strict';

angular
  .module('billFormResponsibility')
  .component('billFormResponsibility', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/responsibility/form-bill-responsibility.template.html',
    bindings: {
      inputValue: '<',
      reportChange: '<',
      propertyName: '@',
      participants: '<',
      billTotalValue: '<'
    },
    controller: function billFormResponsibilityCtrl() {
      this.$onInit = () => {
        if (!this.inputValue) this.resetInput();
      };

      this.handleChange = function() {
        
        console.log(this);
        this.reportChange(this.propertyName, this.inputValue);
      };

      this.resetInput = function() {
        this.inputValue = {
          splittingMethod: 'evenlyBetweenAll',
          evenlyBetweenSomeParticipants: [], // Holds list of participants for splitting option of "evenly between some participants"
          allEvenlyAmountPerPerson: null,
          allEvenlyAmountPerPersonRemainder: null,
          someEvenlyAmountPerPerson: null,
          someEvenlyAmountPerPersonRemainder: null,
          individually: [] // Holds list of input groups for assigning responsibility individually (most customizable option)
        };
      };

      this.setAllEvenlyAmountPerPerson = function() {
        const billTotal = this.billTotalValue;
        const numParticipants = this.participants.length;
        if ((billTotal || billTotal === 0) && numParticipants > 0) {
          const billTotalInCents = this.billTotalValue * 100;
          this.inputValue.allEvenlyAmountPerPerson = Math.floor(billTotalInCents / numParticipants) / 100;
          this.inputValue.allEvenlyAmountPerPersonRemainder = (billTotalInCents % numParticipant);
        }
        else {
          this.inputValue.allEvenlyAmountPerPerson = null;
          this.inputValue.allEvenlyAmountPerPersonRemainder = null;
        }
      };

      this.setSomeEvenlyAmountPerPerson = function() {
        const billTotal = this.billTotalValue;
        const numParticipants = this.evenlyBetweenSomeParticipants.length;
        if ((billTotal || billTotal === 0) && numParticipants > 0) {
          const billTotalInCents = this.billTotalValue * 100;
          this.inputValue.someEvenlyAmountPerPerson = Math.floor(billTotalInCents / numParticipants) / 100;
          this.inputValue.someEvenlyAmountPerPersonRemainder = (billTotalInCents % numParticipant);
        }
        else {
          this.inputValue.someEvenlyAmountPerPerson = null;
          this.inputValue.someEvenlyAmountPerPersonRemainder = null;
        }
      };
    }
  });