'use strict';

function VideosCtrl($window, $scope, $timeout, $interval, $rootScope, $cacheFactory, $sce, videoService) {
    'ngInject';
    let vm = this, // videos
        screenWidth = $window.innerWidth;

    vm.videoService = videoService;
    vm.seconds = 5;
    vm.expanded = 0;
    vm.prevExpanded = 0;
    vm.removed = false;
    vm.currentPage = 1;

    // Exposed to DOM
    vm.init = init;
    vm.pageChange = pageChange;
    vm.expand = expand;
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

        videoService.init();
    }

    init();

    function pageChange(newPageNumber) {
        vm.currentPage = newPageNumber;

        $timeout(() => {
            expand(0);
        }, 0);
    }

    function expand(index) {
        let videoIndex = index + ((vm.currentPage - 1) * vm.itemsPerPage);

        if (videoService.videos[videoIndex]) {
            if (videoIndex !== vm.prevExpanded) {
                let videoId = videoService.videos[videoIndex].snippet.resourceId.videoId,
                    expandedId = videoService.videos[vm.prevExpanded].snippet.resourceId.videoId;

                console.log('expanding new video');

                vm.expanded = index;
                vm.prevExpanded = videoIndex;

                if (typeof videoService.getCache(videoId) !== 'undefined') {
                    let element = angular.element(`.play-button${index}`)[0];

                    if (videoService.getCache(expandedId)) {
                        pause(expandedId);
                    }
                } else {
                    let element = `div#ytplayer${index}`;

                    if (videoService.getCache(expandedId)) {
                        pause(expandedId);
                    }

                    videoService.createPlayer(element, videoIndex);
                }
            }
        } else {
            videoService.getVideos();
        }
    }

    function play(index, videoId) {
        let video = videoService.getCache(videoId);

        console.log(video);
        if (video) {
            // check if type function, if not, timeout and try again
            if (typeof video.getPlayerState === 'function') {
                if (videoService.getCache(videoId).getPlayerState() !== 1) {
                    video.playVideo();
                }
            } else {
                console.log('getPlayerState is not a function, could not play video');
            }
        } else {
            var element = `div#ytplayer${index}`,
                videoIndex = index + ((vm.currentPage - 1) * vm.itemsPerPage);

            console.log('Video not in cache');
            videoService.createPlayer(element, videoIndex);
        }
    }

    function pause(videoId) {
        let video = videoService.getCache(videoId);

        if (typeof video.getPlayerState === 'function') {
            if (videoService.getCache(videoId).getPlayerState() === 1) {
                video.pauseVideo();
            }
        } else {
            console.log('Could not pause video');
        }
    }

    // unbind?
    function cancelTimer(intervalPromise) {
        $interval.cancel(intervalPromise);
    }

    function remove() {
        vm.removed = true;
    }

    // Listens for videoService broadcast when video ends. Kicks off a countdown timer and autoplays next video
    $rootScope.$on('playNext', (event, index) => {
        var noExpand = false;

        // Next page if last video
        if (index % vm.itemsPerPage === 0) {
            var nextPage = vm.currentPage + 1,
                nextBtn = angular.element('.pagination li.active').next('li').children('a');

            nextBtn.click();
            pageChange(nextPage);
            noExpand = true;
        }

        // ****** Cancel if another video is clicked ****
        var timerElem = angular.element('.expanded .countdown-timer').css({ 'display': 'flex' }),
            playButtonElem = angular.element(`.play-button${index}`),
            videoElem = angular.element(`#ytplayer${index}`),
            gradientElem = angular.element(`#ytplayer${index}`).next('.gradient');

        var intervalPromise = $interval(() => {
            vm.seconds--;
                if (vm.seconds === 0) {
                    let videoId = videoService.videos[index].id;
                    if (!noExpand) {
                        expand(index);
                    }

                    timerElem.css({
                        'display': 'none'
                    });

                    $timeout(() => {
                        playButtonElem.click();
                        play(index, videoId);
                    }, 1000);

                    vm.seconds = 5;
                    cancelTimer(intervalPromise);
                }
        }, 1000);
    });
}

module.exports = VideosCtrl;