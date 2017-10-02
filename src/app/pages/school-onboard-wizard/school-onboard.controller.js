(function() {
  'use strict';

  angular
    .module('minotaur')
    .controller('SchoolOnBoardWizardController', SchoolOnBoardWizardController);

  /** @ngInject */
  function SchoolOnBoardWizardController($log, $resource, $scope) {
    var vm = $scope;
    vm.activeStep = 0;
    vm.user = {};
    $resource('http://www.filltext.com/?rows=1&pretty=true&name={firstName}&userName={firstName}&password=[%22password%22]&repeatPassword=[%22password%22]&aboutYou={lorem|100}&address={addressObject}&phoneNumber={phone|format}&emailId={email}&faceBookURL=[%22http://facebook.com%22]&acceptTermCondition=[true]&sendNewsLetter=[true]').query().$promise.then(function(kyc) {
        vm.kyc = kyc[0];
    });

    vm.submit = function(){
      $log.log(vm.user);
    }
  }

})();
