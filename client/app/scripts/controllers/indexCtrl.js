'use strict';

lucidAerials.controller('IndexCtrl', function($scope, $location) {
        $scope.navigateTo = function(view) {
            $location.path(view);
        };
    });
