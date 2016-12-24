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

function socialParallax($window) {
    'ngInject';
    return {
        restrict: 'A',
        link: function(scope, element) {
            var ratio, origElemWidth, socialWrap;

            // init
            if (!origElemWidth) {
                socialWrap = element[0].children[0];

                socialWrap.style.width = '100vw';
                origElemWidth = element[0].clientWidth / 1.75;

                let origSocialWidth = origElemWidth - 416;
                ratio = origSocialWidth / 450;
            }

            angular.element($window).bind('scroll', function() {
                 var scroll = this.scrollY;

                 // meet at 450
                 if (scroll < 450) {
                     let socialWidth = (450 - scroll) * ratio + 416; // 416 ending elem width
                     
                     socialWrap.style.width = `${socialWidth}px`;
                 }
            });
        }
    };
}

function selfieParallax($window) {
    'ngInject';
    return {
        restrict: 'A',
        link: function(scope, element) {
            var selfie = element[0];

            angular.element($window).bind('scroll', function() {
                var scroll = this.scrollY;
                var ratio = (800 - 350) / 50;

                if (scroll > 350 && scroll < 800) {
                    var temp = (800 - scroll) / ratio;
                    selfie.style.right = `-${temp}px`;
                }
            });
        }
    };
}        

module.exports = {
    hideScroll: hideScroll,
    fadeOverlay: fadeOverlay,
    socialParallax: socialParallax,
    selfieParallax: selfieParallax
}