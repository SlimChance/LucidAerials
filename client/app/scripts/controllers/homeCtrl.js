(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$window'];

    function HomeCtrl($scope, $window) {
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
            console.log('play');
            video[0].play();
        };

        resizeVideo();

        angular.element(window).resize(() => resizeVideo());
    }
})();
