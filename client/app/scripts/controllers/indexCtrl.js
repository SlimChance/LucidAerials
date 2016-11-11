'use strict';

function indexCtrl($scope, $rootScope, $location) {
    'ngInject';
    $scope.navToggled = false;
    $scope.modal = false;

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

    $rootScope.$on('modal-open', (e, val) => {
        $scope.modal = val;
    });
}

module.exports = indexCtrl;