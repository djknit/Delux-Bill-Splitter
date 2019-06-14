'use strict';

angular
  .module('billsApp')
  // source: https://stackoverflow.com/questions/32374318/how-to-insert-template-in-html-using-angular
  .directive(
    'header',
    function() {
      return {
        restrict: 'A',
        templateUrl: 'components/header/header.template.html',
        replace: true
      }
    }
  );