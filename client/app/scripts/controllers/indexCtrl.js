'use strict';

angular.module('clientApp')
    .controller('IndexCtrl', function($scope, $location) {
        $scope.toggled = false;

        $scope.navigateTo = function(view) {
            $location.path(view);
        };
    });
