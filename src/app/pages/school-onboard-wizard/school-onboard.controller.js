(function () {
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
        vm.countries = [];
        $resource('/app/pages/school-onboard-wizard/onboard.json').get().$promise.then(function (onboard) {
            vm.onboard = onboard;
        });

        var countries = $resource('http://localhost:8080/v1/countries', {},{
            query : {method :'get' , isArray : true}
        });

        countries.query({}, function(countries){
            vm.allCountries = JSON.parse(JSON.stringify(countries));
            countries.map( function ( node ){
                delete node.states;
                delete node.currency;
            });
            vm.countries = countries;
            vm.onboard.address.selectedCountry = vm.countries[0];
            vm.populateState(vm.countries[0]);
            $log.log(vm.countries);
        });

        var schoolRef = $resource('http://localhost:8080/v1/reference/schools', {},{
            query : {method :'get' , isArray : false}
        });

        schoolRef.query({}, function(schoolRef){
            vm.schoolRef = JSON.parse(JSON.stringify(schoolRef));
            vm.onboard.KYS.selectedSchoolLanguage = vm.schoolRef.languages[0];
            vm.onboard.KYS.selectedSchoolBoard = vm.schoolRef.affiliations[0];
            vm.onboard.KYS.selectedSchoolType = vm.schoolRef.institutionTypes[0];
            $log.log(vm.schoolRef);
        });


        vm.populateState = function (country) {
            vm.states = vm.allCountries.filter(function (node) {
                return node.code == country.code;
            }).map(function(node){
                return JSON.parse(JSON.stringify(node.states));
            }).reduce(function(a, b){
                return a.concat(b);
            },[]);
            vm.onboard.address.selectedState = vm.states[0];
            $log.log(vm.states);
        };
        vm.submit = function () {
            var responsePromise = $http.get("www.google.co.in");

            responsePromise.success(function (data, status, headers, config) {
                $scope.open();
            });
            responsePromise.error(function (data, status, headers, config) {
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
