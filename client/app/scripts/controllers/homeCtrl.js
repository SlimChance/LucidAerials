'use strict';

function HomeCtrl($scope, $window) {
    'ngInject';
    let vm = this, // home
        video = angular.element('video.home-video'),
        videoOverlay = angular.element('div.video-overlay');

    // Exposed to DOM
    vm.resizeVideo = resizeVideo;
    vm.playVideo = playVideo;

    function resizeVideo() {
        let windowWidth = $window.innerWidth,
            windowHeight = $window.innerHeight,
            ratio = windowWidth / windowHeight;

        if (ratio < 0.9) {
            //video.width(windowWidth - 17);
            video.height(windowWidth * 0.85);
            videoOverlay.height(windowWidth * 0.85);
        } else {
            //video.width(windowWidth - 17);
            video.height(windowHeight);
            videoOverlay.height(windowHeight);
        }

        if (windowWidth >= 480) {
            playVideo();
        }
    };

    function playVideo() {
        video[0].play();
    };

    resizeVideo();

    angular.element(window).resize(() => resizeVideo());
}

module.exports = HomeCtrl;