'use strict';

// Declare app level module which depends on views, and core components
angular
  .module('billsApp',
    [ 
      'core',
      'ngRoute',
      'homeView',
      'enterBillsView',
      'pageHeader',
      'alert',
      'modalSkeleton'
    ]
  );