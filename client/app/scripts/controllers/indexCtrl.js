'use strict';

lucidAerials.controller('IndexCtrl', function($scope, $location) {
        $scope.navToggled = false;

        $scope.closeNav = function() {
            if (!$scope.navToggled) {
                $scope.navToggled = false;
            }
        };

        $scope.toggleNav = function(e) {
            console.log(e.originalEvent);
            e.stopPropagation();

            $scope.navToggled = !$scope.navToggled;
        };

        $scope.navigateTo = function(view) {
            $location.path(view);
        };
    });
