'use strict';

angular.module('clientApp')
    .controller('PicturesCtrl', function($scope, $window) {
        $scope.hidePrev = false;
        $scope.hideNext = false;

        $scope.pictures = [{
            'source': '../images/NyeRanch.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/Burnsville.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/ButteCreek.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/ChristmasLights.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/DuckHunting.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/HighlightVideo.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/MountainBiking.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/RockClimbing.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'source': '../images/SnowDay.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }];

        $scope.nextPic = function(index) {
            // Grab elements
            var modal = '#picModal' + index,
                nextModal = '#picModal' + (index + 1),
                modalElem = angular.element(modal),
                nextModalElem = angular.element('.picture-repeat').children(nextModal),
                modalContent = nextModalElem.children('.modal-dialog').children('.modal-content'),
                windowHeight = document.documentElement.clientHeight - 20;
                //windowWidth = document.documentElement.clientWidth - 20;

            // Hide current modal
            modalElem.modal('hide');

            // Go to next picture
            if (index < 8) {
                modalContent.css({'height': 'auto', 'width': windowHeight});
                nextModalElem.modal('show'); 
            }
        };

        $scope.prevPic = function(index) {
            // Grab elements
            var modal = '#picModal' + index,
                prevModal = '#picModal' + (index - 1),
                modalElem = angular.element(modal),
                prevModalElem = angular.element('.picture-repeat').children(prevModal),
                modalContent = prevModalElem.children('.modal-dialog').children('.modal-content'),
                windowHeight = document.documentElement.clientHeight - 20;
                //windowWidth = document.documentElement.clientWidth - 20;

            // Hide current modal
            modalElem.modal('hide');

            // Go to previous picture
            if (index > 0) {
                modalContent.css({'height': 'auto', 'width': windowHeight});
                prevModalElem.modal('show');
            }
        };

        $scope.checkArrow = function(index) {
            if (index === 0) {
                $scope.hidePrev = true;
            } else if (index === 8) {
                $scope.hideNext = true;
            }

            if (index !== 0) {
                $scope.hidePrev = false;
            } else if (index !== 8) {
                $scope.hideNext = false;
            }
        };
    });
