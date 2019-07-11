'use-strict';

angular
  .module('billFormBillers')
  .component('billFormBillers', {
    templateUrl: 'components/enter-bills-view/bills-section/add-bill-modal/form-pieces/billers/billers.template.html',
    controller: ['BillsList', 'BillFormBillersData', '$scope',
    function billFormBillersCtrl(BillsList, BillFormBillersData, $scope) {
      this.INPUT_NAME = 'newBillBillersIn';

      this.agents = BillsList.subscribeToAgents(
        $scope,
        (agents) => this.agents = agents
      );

      this.inputValue = BillFormBillersData.subscribe(
        $scope,
        (updatedValue) => this.inputValue = updatedValue
      );

      this.handleChange = (propName, nestedPropName, index) => {
        let propValue;
        if (propName === 'oneOrMoreBillers') propValue = this.inputValue[propName];
        else if (propName === 'billerSingle') {
          propValue = this.inputValue[propName][nestedPropName];
        } 
        else {
          propValue = this.inputValue[propName][index][nestedPropName];
        }
        BillFormBillersData.updateValue(propValue, propName, nestedPropName, index);
      };

      this.addBillerMult = BillFormBillersData.addBillerMult;

      this.removeBillerMult = BillFormBillersData.removeBillerMult;
    }
  ]
  });