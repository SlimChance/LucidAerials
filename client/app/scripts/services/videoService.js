(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .service('videoService', VideoService);

    VideoService.$inject = ['$q', '$http', '$rootScope', '$cacheFactory', '$timeout'];

    function VideoService($q, $http, $rootScope, $cacheFactory, $timeout) {
        const youtubeApi = 'https://www.googleapis.com/youtube/v3/playlistItems',
              key = 'AIzaSyB_nhTaFbVfTkzQbg8Yq23P6HNoE8cROsk',
              part = 'snippet',
              playlistId = 'PLTKCH_zvmqr_QjUjif0HgJ8U2bGUVJ6Ws';

        var vs = {
                cache: {},
                videos: [],
                getVideos: getVideos,
                getCache: getCache,
                putCache: putCache,
                clearCache: clearCache,
                createPlayer: createPlayer,
                playerStateChange: playerStateChange,
                init: init
            }

        function getVideos(direction) {
            var pageToken;

            if (direction === '') {
                pageToken = '';
            } else if (direction === 'next') {
                pageToken = vs.nextPageToken;
            } else if (direction === 'prev') {
                pageToken = vs.prevPageToken;
            }

            // https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyB_nhTaFbVfTkzQbg8Yq23P6HNoE8cROsk&playlistId=PLTKCH_zvmqr_QjUjif0HgJ8U2bGUVJ6Ws&maxResults=7
            $http.get(youtubeApi, { params: { part: part, key: key, playlistId: playlistId, maxResults: 50 } }).then((videos) => {
                vs.videos = videos.data.items;
                vs.nextPageToken = videos.data.nextPageToken;
                vs.prevPageToken = videos.data.prevPageToken;
                console.log(vs.videos);
            }, (e) => { console.log(e) });
        }

        function getCache(videoId) {
            return vs.cache[videoId];
        }

        function putCache(videoId, video) {
            vs.cache[videoId] = video;
        }

        function clearCache() {
            vs.cache = {};
        }

        // Returns a promise
        function createPlayer(elementId, index) {
            var deferred = $q.defer(),
                videoId = vs.videos[index].snippet.resourceId.videoId,
                element = angular.element(elementId)[0];

            console.log(videoId);
            function createYTPlayer() {
                if (YT) {
                    var YTPlayer = new YT.Player(element, {
                        videoId: videoId,
                        playerVars: {
                            autoplay: 0
                        },
                        events: {
                            'onStateChange': playerStateChange
                        }
                    });

                    putCache(videoId, YTPlayer);
                } else {
                    createPlayer();
                }
            }

            deferred.resolve(createYTPlayer());

            return deferred.promise;
        }

        function playerStateChange(event) {
            console.log(event);
            if (event.data === 0) {
                var iframeId = event.target.a.id;
                var indexPattern = /\d+/g;
                var index = iframeId.match(indexPattern)[0];
                var nextVideo = parseInt(index) + 1;

                // if (vs.player[nextVideo]) {
                //     // play next video
                // } else {
                //     // vs.createPlayer(element, nextVideo).then(function() {
                //     //     cache.get(videoId).playVideo();
                //     // });
                // }

                $rootScope.$emit('playNext', nextVideo);
            }
        }

        function init(itemsPerPage) {
            getVideos();

            $timeout(function() {
                var element = 'div#ytplayer0',
                    index = 0;
                createPlayer(element, index).then(function() {
                    console.log('successfully created player');
                });
            }, 1000);
        }

        return vs;
    };
})();