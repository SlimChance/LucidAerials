(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$timeout'];

    function ContactCtrl($timeout) {
        let vm = this; // contact

        vm.result = 'hidden';

        $timeout(() => twttr.widgets.load(), 500);
    }
})();
