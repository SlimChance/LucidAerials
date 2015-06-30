'use strict';

lucidAerials.controller('VideosCtrl', function($scope, $window, $timeout, videoService) {
        $scope.expanded = 0;
        $scope.player = videoService.player;
        $scope.videos = videoService.videos;
        $scope.playReady = true;

        videoService.init();

        $scope.expand = function(index) {
            if (index !== $scope.expanded) {
                // Check if playing, if it is pause video
                if ($scope.player[$scope.expanded].getPlayerState() === 1) {
                    $scope.pause($scope.expanded);
                }

                $scope.expanded = index;

                // disable play button until video is ready
                $scope.playReady = false;

                if (!$scope.player[index]) {
                    // Don't block animation render
                    $timeout(function() {
                        var element = 'ytplayer' + index;
                        videoService.createPlayer(element, index).then(function () {
                            $scope.playReady = true;
                        });
                    }, 500);
                } else if ($scope.player[index]) {
                    $scope.playReady = true;
                } else {
                    console.log('Failed to expand video');
                }
            }
        };

        $scope.play = function(index) {
            if ($scope.player[index]) {
                if ($scope.player[index].getPlayerState() !== 1) {
                    $scope.player[index].playVideo();
                }
            } else {
                console.log('Failed to play video ' + index);
            }
        };

        $scope.pause = function(index) {
            console.log("pause: " + index);
            if ($scope.player[index]) {
                $scope.player[index].pauseVideo();
            } else {
                console.log('Failed to pause video ' + index);
            }
        };
    });
