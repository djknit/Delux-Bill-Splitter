'use strict';

angular
  .module('billsSection')
  .component('billsSection', {
    templateUrl: 'components/enter-bills-view/bills-section/bills.template.html',
    bindings: {
      bills: '<',
      addBill: '<',
      removebill: '<',
      participants: '<',
      agents: '<',
      addAgent: '<'
    },
    transclude: false,
    controller: function billsSectionCtrl() {

      this.ADD_BILL_MODAL_NAME = 'addBillModal';
      this.REMOVE_BILL_MODAL_NAME = 'removeBillModal';
      this.NAME_INPUT_NAME = 'newBillNameIn';

      this.billToRemove = null;

      this.openAddBillModal = () => {
        $('#' + this.ADD_BILL_MODAL_NAME).modal('show');
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

      this.openRemoveBillModal = bill => {
        console.log(bill)
        this.billToRemove = bill;
        $('#' + this.REMOVE_BILL_MODAL_NAME).modal('show');
      };

    }
  });