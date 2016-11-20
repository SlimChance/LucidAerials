'use strict';

function commonCtrl($rootScope, $location) {
    'ngInject';
    let vm = this; // common
    
    vm.navToggled = false;
    vm.modal = false;

    vm.closeNav = function() {
        if (!vm.navToggled) {
            vm.navToggled = false;
        }
    };

    vm.toggleNav = function(e) {
        e.stopPropagation();

        vm.navToggled = !vm.navToggled;
    };

    vm.navigateTo = function(view) {
        $location.path(view);
    };

    $rootScope.$on('modal-open', (e, val) => {
        vm.modal = val;
    });
}

module.exports = commonCtrl;