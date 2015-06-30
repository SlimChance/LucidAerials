'use strict';

angular.module('clientApp')
    .controller('IndexCtrl', function($scope, $location) {
        $scope.navigateTo = function(view) {
            $location.path(view);
        };
    });
