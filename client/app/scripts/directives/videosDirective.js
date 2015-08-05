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
    })
    .directive('youtubeVideo', function($window, $resource) {
        return {
            restrict: 'E',
            scope: {
                videoId: '='
            },
            template: '<div>{{.id}}</div>',
            link: function(scope, element, attrs) {
                var resource = $resource('/data/videos.json').query();
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                $window.onYoutubeIframeAPIReady = function() {
                    player = new YT.Player(element.children()[0], {
                        videoId: scope.videoId,
                        events: {
                            'onStateChange': me.playerStateChange
                        }
                    })
                }
            }
        }
    });