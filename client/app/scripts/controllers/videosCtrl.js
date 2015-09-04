'use strict';

lucidAerials.controller('VideosCtrl', function($window, $scope, $timeout, $interval, $rootScope, $cacheFactory, $sce, videoService) {
        var vs = new videoService();
        $scope.playReady = true;
        $scope.seconds = 5;
        $scope.expanded = 0;
        $scope.videos = vs.videos;

        $scope.expand = function(index) {
            if ($scope.videos[index]) {
                if (index !== $scope.expanded) {
                    var videoId = $scope.videos[index].id,
                        expandedId = $scope.videos[$scope.expanded].id;

                    $scope.expanded = index;

                    if (typeof vs.getCache(videoId) === 'undefined') {
                        // Timeout to not block render
                        $timeout(function() {
                            var element = 'div#ytplayer' + index;
                            if (vs.getCache(expandedId)) {
                                $scope.pause(expandedId);
                            }

                            $scope.playReady = false;

                            vs.createPlayer(element, index).then(function() {
                                $scope.playReady = true;
                            });
                        }, 200);
                    } else {
                        var element = angular.element('.play-button' + index)[0];
                        console.log(element);

                        if (vs.getCache(expandedId)) {
                            console.log('pausing old video');
                            $scope.pause(expandedId);
                        }
                        // if element hasn't been clicked, don't play
                        // console.log(element.style.opacity);
                        // if (element.style.opacity == 0) {
                        //     console.log('inside timeout');
                        //     $timeout(function() {
                        //         $scope.play(index, videoId);
                        //     }, 1000);
                        // }   
                    }
                };
            } else {
                vs.resource.query().$promise.then(function (data) {
                    $scope.videos = data;
                    var video = $scope.videos[index];
                    $scope.expand(index);
                });
            }
        };

        $scope.getImage = function (index, video) {
            if ($scope.expanded === index) {
                return video.largeImage;
            } else {
                return video.smallImage;
            }
        };

        $scope.play = function(index, videoId) {
            if (vs.getCache(videoId)) {
                var video = vs.getCache(videoId);
                console.log(video);

                // check if type function, if not, timeout and try again
                if (typeof video.getPlayerState === 'function') {
                    if (vs.getCache(videoId).getPlayerState() !== 1) {
                        video.playVideo();
                    }
                } else {
                    $timeout(function() {
                        $scope.play(index, videoId);
                    }, 1000);
                }
            } else {
                console.log('Video not in cache, creating');
                var element = 'div#ytplayer' + index;

                vs.createPlayer(element, index).then(function() {
                    console.log('promise video id' + videoId)
                    $scope.play(index, videoId);
                });
            }
        };

        $scope.pause = function(videoId) {
            var video = vs.getCache(videoId);

            if (video) {
                console.log('Pausing video');
                video.pauseVideo();
            } else {
                console.log('Paused cache.get = undefined');
            }
        };

        $scope.cancelTimer = function (intervalPromise) {
            $interval.cancel(intervalPromise);
        }

        // Listens for videoService broadcast when video ends. Kicks off a countdown timer and autoplays next video
        $scope.$on('playNext', function (event, index) {
            var timerElem = angular.element('.expanded .countdown-timer').css({ 'display': 'block' });
            var playButtonElem = angular.element('.play-button' + index);
            var videoElem = angular.element('#ytplayer' + index);
            var gradientElem = angular.element('#ytplayer' + index).next('.gradient');

            console.log(videoElem);
            // console.log('Video: ' + videoElem);
            // console.log('Gradient: ' + gradientElem);

            var intervalPromise = $interval(function () {
                $scope.seconds--
                if ($scope.seconds === 0) {
                    $scope.expand(index);

                    var videoId = $scope.videos[index].id;
                    timerElem.css({ 'display': 'none' });
                    $scope.play(index, videoId);

                    // simulate play button click
                    playButtonElem.css('opacity', '0');
                    gradientElem.css({ 'opacity': '0.8', 'z-index': '1' });
                    videoElem.css({ 'opacity': '1' });

                    $scope.seconds = 5;
                    $scope.cancelTimer(intervalPromise);
                }
            }, 1000);
        });
    });
