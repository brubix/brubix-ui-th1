(function() {
  'use strict';

  angular
    .module('minotaur')
    .controller('SchoolOnBoardWizardController', SchoolOnBoardWizardController);

  /** @ngInject */
  function SchoolOnBoardWizardController($log) {
    var vm = this;
    vm.activeStep = 0;
    vm.user = {};

    vm.submit = function(){
      $log.log(vm.user);
    }
  }

})();
