'use strict';

lucidAerials.directive('hideScroll', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                angular.element($window).bind('scroll', function() {
                    element.children('.scroll-arrow').css({
                        'opacity': '0',
                        'filter': 'alpha(opacity=0)',
                        'transition': 'opacity 0.5s ease-in-out',
                        '-webkit-transition': 'opacity 0.5s ease-in-out'
                    });
                });
            }
        };
    })
    .directive('fadeOut', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var siteTitle = element.children('.site-title');
                var button = element.children('button.md-primary');
                var filter = element.next('.home-video-filter');
                var video = element.next('.home-video-filter').children('home-video');

                button.bind('click', function() {
                    console.log(button);
                    siteTitle.css('opacity', '0');
                    element.css('opacity', '0');
                    filter.css('opacity', '1');
                    video.attr('controls');
                });
            }
        };
    });