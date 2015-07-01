'use strict';

lucidAerials.service('videoService', function ($window, $q, $resource) {
    var me = this;
    var resource = $resource('/data/videos.json');

    me.player = [,,,,,,,,,];

    me.getVideos = function () {
        return resource.query();
    }
    me.videos = me.getVideos();

    me.initYTPlayer = function () {
        var tag = document.createElement('script');

        // YouTube API
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Must be global. YT looks at the window scope once the script tag is initialized. Loads in first video
        $window.onYouTubeIframeAPIReady = function() {
            var YTPlayer = new YT.Player('ytplayer0', {
                videoId: me.videos[0].id
            });

            me.player.splice(0, 1, YTPlayer);
        }
    };

    me.createPlayer = function(element, index) {
        // Returns a promise. Won't let user play video until loaded
        var deferred = $q.defer();

        var createYTPlayer = function () {
            var YTPlayer = new YT.Player(element, {
                videoId: me.videos[index].id,
                playerVars: {
                    autoplay: 0
                }
            });

            console.log('create player called');
            me.player.splice(index, 1, YTPlayer);
        }

        deferred.resolve(createYTPlayer());

        return deferred.promise;
    };
});