'use strict';

lucidAerials.directive('videoPlayButton', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var gradient = element.next('.video').next('.gradient');
                    var video = element.next('.video');

                    element.css('opacity', '0');
                    gradient.css({ 'opacity': '0.8', 'z-index': '1' });
                    video.css({ 'opacity': '1', 'z-index': '2' });
                });
            }
        };
    });