'use strict';

function lcdScrollHideArrow($window) {
    'ngInject';
    return {
        restrict: 'A',
        link: function (scope, element) {
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
    'ngInject';
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
                if (element[0].clientWidth > 490) {
                    socialWrap = element[0].children[0];

                    origElemWidth = element[0].clientWidth / 1.5; // 1.5 starting ratio
                    socialWrap.style.width = `${origElemWidth}px`;

                    let origSocialWidth = origElemWidth - 300; // 300 ending elem width
                    ratio = origSocialWidth / 420; // meet at 420 height   
                }
            }

            angular.element($window).bind('scroll', function() {
                if (socialWrap) {
                    var scroll = this.scrollY;

                    if (scroll < 420) {
                        let socialWidth = (420 - scroll) * ratio + 300;
                        
                        socialWrap.style.width = `${socialWidth}px`;
                    }
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
                var ratio = (1000 - 400) / 70;

                if (scroll > 400 && scroll < 1000) {
                    var temp = (1000 - scroll) / ratio;
                    
                    selfie.style.right = `-${temp}px`;
                }
            });
        }
    };
}        

module.exports = {
    lcdScrollHideArrow: lcdScrollHideArrow,
    fadeOverlay: fadeOverlay,
    socialParallax: socialParallax,
    selfieParallax: selfieParallax
}