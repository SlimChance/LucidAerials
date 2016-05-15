(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['$scope', '$location'];

    function IndexCtrl($scope, $location) {
        $scope.navToggled = false;

        $scope.closeNav = function() {
            if (!$scope.navToggled) {
                $scope.navToggled = false;
            }
        };

        $scope.toggleNav = function(e) {
            e.stopPropagation();

            $scope.navToggled = !$scope.navToggled;
        };

        $scope.navigateTo = function(view) {
            $location.path(view);
        };
    }
})();
