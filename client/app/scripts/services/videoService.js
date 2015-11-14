(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .service('videoService', VideoService);

    VideoService.$inject = ['$q', '$resource', '$rootScope', '$cacheFactory', '$timeout'];

    function VideoService($q, $resource, $rootScope, $cacheFactory, $timeout) {
        return function () {
            var vs = this;
            vs.resource = $resource('/data/videos.json').query();
            vs.videos = vs.resource;
            vs.cache = {};

            vs.getCache = function(videoId) {
                return vs.cache[videoId];
            };
            vs.putCache = function(videoId, video) {
                vs.cache[videoId] = video;
            };

            // Returns a promise
            vs.createPlayer = function(elementId, index) {
                var deferred = $q.defer(),
                    videoId = vs.videos[index].id,
                    element = angular.element(elementId)[0];
                
                console.log(element);
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

                        console.log('Pushing to array: ' + videoId);
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
                    var iframeId = event.target.f.id;
                    var indexPattern = /\d+/g;
                    var index = iframeId.match(indexPattern)[0];
                    var nextVideo = parseInt(index) + 1;

                    console.log(index, nextVideo);

                    // if (vs.player[nextVideo]) {
                    //     // play next video
                    // } else {
                    //     // vs.createPlayer(element, nextVideo).then(function() {
                    //     //     cache.get(videoId).playVideo();
                    //     // });
                    // }

                    $rootScope.$broadcast('playNext', nextVideo);
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