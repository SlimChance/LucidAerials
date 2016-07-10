'use strict';

function hideScroll($window) {
    'ngInject';
    return {
        restrict: 'A',
        link: function(scope, element) {
            angular.element($window).bind('scroll', function() {
                element.css({
                    'opacity': '0',
                    'filter': 'alpha(opacity=0)',
                    'transition': 'opacity 0.5s ease-in-out',
                    '-webkit-transition': 'opacity 0.5s ease-in-out'
                });
            });
        }
    };
}

function fadeOverlay($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var overlay = element.parent('.video-overlay');
            var video = angular.element('#bgvid');

            element.bind('click', function() {
                overlay.css('opacity', 0);

                var timeout = $timeout(function() {
                    overlay.css('z-index', -1);
                    $timeout.cancel(timeout);
                }, 1000);

                video.attr('controls', true);
            });
        }
    };
}

module.exports = {
    hideScroll: hideScroll,
    fadeOverlay: fadeOverlay
}