(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .service('videoService', VideoService);

    VideoService.$inject = ['$q', '$http', '$rootScope', '$cacheFactory', '$timeout'];

    function VideoService($q, $http, $rootScope, $cacheFactory, $timeout) {
        return function () {
            var vs = this,
                youtubeApi = 'https://www.googleapis.com/youtube/v3/playlistItems',
                key = 'AIzaSyB_nhTaFbVfTkzQbg8Yq23P6HNoE8cROsk',
                part = 'snippet',
                playlistId = 'PLTKCH_zvmqr_QjUjif0HgJ8U2bGUVJ6Ws',
                maxResults = 7;

            // https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyB_nhTaFbVfTkzQbg8Yq23P6HNoE8cROsk&playlistId=PLTKCH_zvmqr_QjUjif0HgJ8U2bGUVJ6Ws&maxResults=7

            $http.get(youtubeApi, { params: { part: part, key: key, playlistId: playlistId, maxResults: maxResults } }).then((videos) => {
                vs.videos = videos.data.items;
                console.log(vs.videos);
                vs.nextPageToken = videos.data.nextPageToken;
                vs.nextPageToken = videos.data.prevPageToken;
            }, (e) => { console.log(e) });

            vs.cache = {};

            vs.getCache = function(videoId) {
                return vs.cache[videoId];
            };
            vs.putCache = function(videoId, video) {
                vs.cache[videoId] = video;
            };

            vs.clearCache = function() {
                vs.cache = {};
            }

            // Returns a promise
            vs.createPlayer = function(elementId, index) {
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
                                'onStateChange': vs.playerStateChange
                            }
                        });

                        vs.putCache(videoId, YTPlayer);
                    } else {
                        vs.createPlayer();
                    }
                }

                deferred.resolve(createYTPlayer());

                return deferred.promise;
            };

            vs.playerStateChange = function (event) {
                if (event.data === 0) {
                    var iframeId = event.target.c.id;
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
            };

            // Call
            $timeout(function() {
                var element = 'div#ytplayer0',
                    index = 0;
                vs.createPlayer(element, index).then(function() {
                    console.log('successfully created player');
                });
            }, 1000);
        };
    }
})();