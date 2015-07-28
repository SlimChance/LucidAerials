'use strict';

lucidAerials.service('videoService', function ($window, $q, $resource, $rootScope) {
    var me = this;
    var resource = $resource('/data/videos.json');

    me.player = [,,,,,,,,,];

    me.videos = resource.query();

    me.initYTPlayer = function () {
        if (!me.player[0]) {
            var tag = document.createElement('script');

            // YouTube API
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Must be global. YT looks at the window scope once the script tag is initialized. Loads in first video
            $window.onYouTubeIframeAPIReady = function() {
                var YTPlayer = new YT.Player('ytplayer0', {
                    videoId: me.videos[0].id,
                    events: {
                        'onStateChange': me.playerStateChange
                    }
                });

                me.player.splice(0, 1, YTPlayer);
            }
        }
    };

    me.createPlayer = function(element, index) {
        // Returns a promise. Won't let user play video until loaded
        var deferred = $q.defer();

        var createYTPlayer = function () {
            if (YT) {
               var YTPlayer = new YT.Player(element, {
                    videoId: me.videos[index].id,
                    playerVars: {
                        autoplay: 0
                    },
                    events: {
                        'onStateChange': me.playerStateChange
                    }
                });

                console.log('create player called');
                me.player.splice(index, 1, YTPlayer); 
            } else {
                me.initYTPlayer();
            }
        }

        deferred.resolve(createYTPlayer());

        return deferred.promise;
    };

    me.playerStateChange = function (event) {
        if (event.data == 0) {
            var iframeId = event.target.f.id;
            var indexPattern = /\d+/g;
            var index = iframeId.match(indexPattern)[0];
            var nextVideo = parseInt(index) + 1;

            if (me.player[nextVideo]) {
                // play next video
            } else {
                var element = 'ytplayer' + nextVideo;
                me.createPlayer(element, nextVideo);
                // .then play video
            }

            $rootScope.$broadcast('playNext', nextVideo);
        }
    }
});