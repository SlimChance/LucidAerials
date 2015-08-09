'use strict';

lucidAerials.controller('HomeCtrl', function($scope, $window, videoService) {
        var video = angular.element('div.home-video-element');

        $scope.resizeVideo = function() {
            var windowWidth = $window.innerWidth,
                windowHeight = $window.innerHeight,
                ratio = windowWidth / windowHeight;

            if (ratio < 0.9) {
                video.width(windowWidth);
                video.height(windowWidth * 0.85);
            } else {
                video.height(windowHeight);
                video.width(windowWidth);
            }

            if (windowWidth > 500) {
                $scope.playVideo();
            };
        };

        $scope.playVideo = function() {
            video[0].play();
        };

        $scope.resizeVideo();

        angular.element(window).resize(function() {
            $scope.resizeVideo();
        });
    });
