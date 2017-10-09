(function() {
  'use strict';

  angular
    .module('minotaur')
    .controller('SchoolOnBoardWizardController', SchoolOnBoardWizardController)
    .controller('ModalsInstanceController', ModalsInstanceController)
  ;

  /** @ngInject */
  function SchoolOnBoardWizardController($log, $resource, $scope, $uibModal, $http) {
    var vm = $scope;
    vm.activeStep = 0;
    vm.user = {};
    $resource('/app/pages/school-onboard-wizard/onboard.json').get().$promise.then(function(onboard) {
        vm.onboard = onboard;
    });

    vm.submit = function(){
        var responsePromise = $http.get("www.google.co.in");

        responsePromise.success(function(data, status, headers, config) {
            $scope.open();
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

        $log.log(vm.user);
    }



      vm.items = ['item1', 'item2', 'item3'];

      vm.animationsEnabled = true;

      vm.open = function (size) {

          var modalInstance = $uibModal.open({
              animation: vm.animationsEnabled,
              templateUrl: 'modalContent.html',
              controller: 'ModalInstanceController',
              controllerAs: 'modal',
              size: size,
              resolve: {
                  items: function () {
                      return vm.items;
                  }
              }
          });

          modalInstance.result.then(function (selectedItem) {
              vm.selected = selectedItem;
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };

      vm.toggleAnimation = function () {
          vm.animationsEnabled = !vm.animationsEnabled;
      };
  }

    function ModalsInstanceController($uibModalInstance, items) {
        var vm = this;

        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
