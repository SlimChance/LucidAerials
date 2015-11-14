(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$scope', '$timeout'];

    function ContactCtrl($scope, $timeout) {
        $scope.result = 'hidden';

        $timeout(function() {
            twttr.widgets.load();
        }, 500);
    }
})();
