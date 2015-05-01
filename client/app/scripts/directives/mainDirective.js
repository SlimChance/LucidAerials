'use strict';

angular.module('clientApp')
    .directive('toggleMobileMenu', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var menuWrapper = element.children('.nav-wrapper').children('.menu-wrapper');
                var navWrapper = element.children('.nav-wrapper');
                var menu1 = menuWrapper.children('.menu-bar1');
                var menu2 = menuWrapper.children('.menu-bar2');
                var menu3 = menuWrapper.children('.menu-bar3');
                var navbar = element.children('.navbar-animate');

                scope.viewClicked = function() {
                    if (menuWrapper.hasClass('menu-wrapper-toggled')) {
                        menuWrapper.removeClass('menu-wrapper-toggled');
                        menu1.removeClass('menu-bar1-toggled');
                        menu2.removeClass('menu-bar2-toggled');
                        menu3.removeClass('menu-bar3-toggled');
                        navbar.removeClass('navbar-animate-toggled');
                        navWrapper.css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.258824');
                    }
                };

                menuWrapper.bind('click', function() {
                    menuWrapper.toggleClass('menu-wrapper-toggled');
                    menu1.toggleClass('menu-bar1-toggled');
                    menu2.toggleClass('menu-bar2-toggled');
                    menu3.toggleClass('menu-bar3-toggled');
                    navbar.toggleClass('navbar-animate-toggled');
                    if (menuWrapper.hasClass('menu-wrapper-toggled')) {
                        navWrapper.css('box-shadow', 'none');
                    } else {
                        navWrapper.css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.258824');
                    }
                });
            }
        };
    })
    .directive('hideScroll', function($window) {
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
    .directive('scrollHideMenu', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var lastScroll = 0;
                angular.element($window).bind('scroll', function() {
                    var scroll = this.scrollY;
                    var menuWrapper = element.children('.menu-wrapper');
                    if (!menuWrapper.hasClass('menu-wrapper-toggled')) {
                        if (scroll < lastScroll) {
                            if (element.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
                                element.css('transform', 'translateY(0px)');
                            }
                        } else if (scroll > 55) {
                            if (element.css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
                                element.css('transform', 'translateY(-55px)');
                            }
                        }
                        lastScroll = scroll;
                    }
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
    })
    .directive('topVideoPlayButton', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var videoWrapper = element.parent('.video-wrap');
                    var video = element.next('.play-button').next('.video');
                    console.log(video);
                    videoWrapper.css('background-color', 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))');
                    // videoWrapper.css('background-position', 'center');
                    element.css('opacity', '0');
                    video.css('opacity', '1');
                });
            }
        };
    })
    .directive('videoPlayButton', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var placeholderImage = element.next('.video').children('.placeholder-image');
                    var video = element.next('.video');

                    element.css('opacity', '0');
                    placeholderImage.css('opacity', '0');
                    video.css('opacity', '1');
                });
            }
        };
    })
    .directive('modalClick', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var modalContent = element.next().next().children('.modal-dialog').children('.modal-content'),
                        windowHeight = $window.innerHeight - 20,
                        windowWidth = $window.innerWidth - 15;

                    // Grab modal content
                    modalContent.css({'height': windowWidth, 'width': windowHeight});
                    // Change height and width to fullscreen
                });
            }
        };
    });
