(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('VideosCtrl', VideosCtrl);

    VideosCtrl.$inject = ['$window', '$scope', '$timeout', '$interval', '$rootScope', '$cacheFactory', '$sce', 'videoService'];

    function VideosCtrl($window, $scope, $timeout, $interval, $rootScope, $cacheFactory, $sce, videoService) {
        let vm = this, // videos
            vs = new videoService(),
            screenWidth = $window.innerWidth;

        vm.playReady = true;
        vm.seconds = 5;
        vm.expanded = 0;
        vm.prevExpanded = 0;
        vm.videos = vs.videos;
        vm.removed = false;
        vm.currentPage = 1;

        // Exposed to DOM
        vm.init = init;
        vm.pageChange = pageChange;
        vm.expand = expand;
        vm.getImage = getImage;
        vm.play = play;
        vm.pause = pause;
        vm.cancelTimer = cancelTimer;
        vm.remove = remove;

        function init() {
            if (screenWidth >= 900) {
                vm.itemsPerPage = 7;
            } else if (screenWidth >= 767) {
                vm.itemsPerPage = 5;
            } else {
                vm.itemsPerPage = 6;
            }
        };

        init();

        function pageChange(newPageNumber) {
            vm.currentPage = newPageNumber;
            clearCache();
        };

        function expand(index) {
            let videoIndex = index + ((vm.currentPage - 1) * vm.itemsPerPage);

            if (vm.videos[videoIndex]) {
                if (index !== vm.expanded) {
                    let videoId = vm.videos[videoIndex].id,
                        expandedId = vm.videos[vm.prevExpanded].id;

                    vm.expanded = index;
                    vm.prevExpanded = videoIndex;

                    if (typeof vs.getCache(videoId) === 'undefined') {
                        // Timeout to not block render
                        $timeout(() => {
                            let element = `div#ytplayer${index}`;

                            if (vs.getCache(expandedId)) {
                                pause(expandedId);
                            }

                            vm.playReady = false;

                            vs.createPlayer(element, videoIndex).then(() => vm.playReady = true);
                        }, 200);
                    } else {
                        let element = angular.element(`.play-button${index}`)[0];

                        if (vs.getCache(expandedId)) {
                            pause(expandedId);
                        }
                    }
                }
            } else {
                vs.resource.query().$promise.then((data) => {
                    vm.videos = data;
                    expand(index);
                });
            }
        };

        function getImage(index, video) {
            if (vm.expanded === index) {
                return video.largeImage;
            } else {
                return video.smallImage;
            }
        };

        function play(index, videoId) {
            if (vs.getCache(videoId)) {
                let video = vs.getCache(videoId);

                // check if type function, if not, timeout and try again
                if (typeof video.getPlayerState === 'function') {
                    if (vs.getCache(videoId).getPlayerState() !== 1) {
                        video.playVideo();
                    }
                } else {
                    $timeout(() => play(index, videoId), 1000);
                }
            } else {
                var element = 'div#ytplayer' + index,
                    videoIndex = index + ((vm.currentPage - 1) * vm.itemsPerPage);

                vs.createPlayer(element, videoIndex).then(() => play(videoIndex, videoId));
            }
        };

        function pause(videoId) {
            var video = vs.getCache(videoId);

            if (video) {
                video.pauseVideo();
            } else {
                console.log('Paused cache.get = undefined');
            }
        };

        // unbind?
        function cancelTimer(intervalPromise) {
            $interval.cancel(intervalPromise);
        };

        function remove() {
            vm.removed = true;
        };

        // Listens for videoService broadcast when video ends. Kicks off a countdown timer and autoplays next video
        $scope.$on('playNext', (event, index) => {
            let timerElem = angular.element('.expanded .countdown-timer').css({ 'display': 'block' }),
                playButtonElem = angular.element(`.play-button${index}`),
                videoElem = angular.element(`#ytplayer${index}`),
                gradientElem = angular.element(`#ytplayer${index}`).next('.gradient');

            var intervalPromise = $interval(() => {
                vm.seconds--;
                    if (vm.seconds === 0) {
                        let videoId = vm.videos[index].id;
                        expand(index);

                        timerElem.css({
                            'display': 'none'
                        });
                        play(index, videoId);

                        // simulate play button click
                        playButtonElem.css('opacity', '0');
                        gradientElem.css({
                            'opacity': '0.8',
                            'z-index': '1'
                        });
                        videoElem.css({
                            'opacity': '1'
                        });

                        vm.seconds = 5;
                        cancelTimer(intervalPromise);
                    }
            }, 1000);
        });
    }
})();
