(function() {
  'use strict';

  angular
    .module('minotaur')
    .controller('SchoolOnBoardWizardController', SchoolOnBoardWizardController)
  ;

  /** @ngInject */
  function SchoolOnBoardWizardController($log, $resource, $scope) {
    var vm = $scope;
    vm.activeStep = 0;
    vm.user = {};
    $resource('/app/pages/school-onboard-wizard/onboard.json').get().$promise.then(function(onboard) {
        vm.onboard = onboard;
    });

    vm.submit = function(){
      $log.log(vm.user);
    }
  }

    function UiSelectController() {
        var vm = this;

        vm.itemArray = [
            {id: 1, name: 'first'},
            {id: 2, name: 'second'},
            {id: 3, name: 'third'},
            {id: 4, name: 'fourth'},
            {id: 5, name: 'fifth'}
        ];

        vm.selected = { value: vm.itemArray[0] };

        vm.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
        vm.multipleDemo = {};
        vm.multipleDemo.colors = ['Blue','Red'];
    }

})();
