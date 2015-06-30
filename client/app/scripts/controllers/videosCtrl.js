'use strict';

angular.module('clientApp')
    .controller('VideosCtrl', function($scope, $window, $timeout, videoService) {
        $scope.expanded = 0;

        // array with 9 indices
        var players = [,,,,,,,,,];

        // Videos array.
        $scope.videos = videoService.getVideos();

        $scope.expand = function(index) {
            if (index !== $scope.expanded) {
                // Check if playing, pause video
                if (players[$scope.expanded].getPlayerState() === 1) {
                    $scope.pause($scope.expanded);
                }

                $scope.expanded = index;

                console.log("Create player?: " + !players[index] + index);
                
                // Don't block animation render
                $window.setTimeout(function() { 
                    if (!players[index]) {
                        var element = 'ytplayer' + index;
                        $scope.player.createPlayer(element, index);    
                    }
                }, 500);
            }
        };
        
        $scope.play = function(index) {
            if (players[index]) {
                if (players[index].getPlayerState() !== 1) {
                    players[index].playVideo();
                }
            } else {
                console.log('Failed to play video ' + index);
            }
        };

        $scope.pause = function(index) {
            console.log("pause: " + index);
            if (players[index]) {
                if (players[index].getPlayerState() === 1) {
                    players[index].pauseVideo();
                }
            } else {
                console.log('Failed to pause video ' + index);
            }
        };

        /***** Move this to service ******/
        $scope.player = {
            // Grab api and load first video
            init: function() {
                var tag = document.createElement('script');

                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                // Load in first video once API loaded
                $window.onYouTubeIframeAPIReady = function() {
                    //players = [9];
                    $scope.YTPlayer = new YT.Player('ytplayer0', {
                        videoId: $scope.videos[0].id
                    });

                    players.splice(0, 1, $scope.YTPlayer);
                    
                    console.log("init array: " + players);
                }
            },
            // Create the video and add it to dom. Must go through expand
            createPlayer: function(element, index) {
                $scope.YTPlayer = new YT.Player(element, {
                    videoId: $scope.videos[index].id,
                    playerVars: {
                        autoplay: 0
                    }
                });

                players.splice(index, 1, $scope.YTPlayer);
            }
        };
        // Initialize player api on page load
        $scope.player.init();
    });
