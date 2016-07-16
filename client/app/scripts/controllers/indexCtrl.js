'use strict';

function indexCtrl($scope, $location) {
    'ngInject';
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

module.exports = indexCtrl;