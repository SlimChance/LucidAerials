'use strict';

lucidAerials.service('videoService', function ($window, $q, $resource, $rootScope, $cacheFactory) {
    var me = this;
    var cache = $cacheFactory('videos');
    me.resource = $resource('/data/videos.json');

    me.resource.query().$promise.then(function (data) {
        me.videos = data;
    });

    me.initYTPlayer = function (element, index) {
        var youtubeAPI = document.getElementsByTagName('script')[0];
        console.log(youtubeAPI);

        if (!youtubeAPI.src == 'https://www.youtube.com/iframe_api') {
            var tag = document.createElement('script');
            var element = element | 'ytplayer0';
            var index = index | 0;
            var videoId = me.videos[index].id;

            // YouTube API
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // Must be global. YT looks at the window scope once the script tag is initialized. Loads in first video
            $window.onYouTubeIframeAPIReady = function() {
                var YTPlayer = new YT.Player('ytplayer0', {
                    videoId: videoId,
                    events: {
                        'onStateChange': me.playerStateChange
                    }
                });

                cache.put(videoId, YTPlayer);
            }
        }
    };

    me.createPlayer = function(element, index) {
        // Returns a promise. Won't let user play video until loaded
        var deferred = $q.defer();
        var videoId = me.videos[index].id;

        console.log(cache.get(videoId));

        function createYTPlayer() {
            if (YT) {
               var YTPlayer = new YT.Player(element, {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 0
                    },
                    events: {
                        'onStateChange': me.playerStateChange
                    }
                });

                cache.put(videoId, YTPlayer);
            } else {
                me.initYTPlayer(element, index);
            }
        }

        deferred.resolve(createYTPlayer());
        console.log(cache);

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