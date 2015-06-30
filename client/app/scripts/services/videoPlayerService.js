'use strict';

lucidAerials.service('videoPlayerService', function ($window) {
		var player = {
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

        return player.init();
	});