'use strict';

lucidAerials.directive('hideScroll', function($window) {
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
    })
    .directive('fadeOverlay', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var siteTitle = angular.element('.site-title');
                var filter = angular.element('.home-video-filter');
                var video = filter.children('.home-video-element');
                var logo = angular.element('.logo');

                element.bind('click', function() {
                    siteTitle.css('opacity', '0');
                    element.css('opacity', '0');
                    filter.css('opacity', '1');
                    logo.css('opacity', '0');
                    video.attr('controls', true);
                });
            }
        };
    });