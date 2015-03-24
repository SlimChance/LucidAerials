'use strict';

angular.module('clientApp')
    .controller('PicturesCtrl', function($scope) {
        $scope.pictures = [{
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
    });
