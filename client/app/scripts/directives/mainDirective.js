'use strict';

lucidAerials.directive('toggleMobileMenu', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var menuWrapper = element.children('.nav-wrapper').children('.menu-wrapper'),
                    navWrapper = element.children('.nav-wrapper'),
                    menu1 = menuWrapper.children('.menu-bar1'),
                    menu2 = menuWrapper.children('.menu-bar2'),
                    menu3 = menuWrapper.children('.menu-bar3'),
                    navbar = element.children('.navbar-animate');

                scope.closeNav = function() {
                    if (navWrapper.hasClass('navbar-animate-toggled')) {
                        menu1.removeClass('menu-bar1-toggled');
                        menu2.removeClass('menu-bar2-toggled');
                        menu3.removeClass('menu-bar3-toggled');
                        navbar.removeClass('navbar-animate-toggled');
                        navWrapper.css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.258824');
                    }
                };

                menuWrapper.bind('click', function() {
                    menu1.toggleClass('menu-bar1-toggled');
                    menu2.toggleClass('menu-bar2-toggled');
                    menu3.toggleClass('menu-bar3-toggled');
                    navbar.toggleClass('navbar-animate-toggled');
                    if (navWrapper.hasClass('navbar-animate-toggled')) {
                        navWrapper.css('box-shadow', 'none');
                    } else {
                        navWrapper.css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.258824');
                    }
                });
            }
        };
    })
    .directive('toggleDesktopMenu', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var menuWrapper = element.children('.menu-wrapper'),
                    navWrapper = menuWrapper.next('.navbar-animate'),
                    menu1 = menuWrapper.children('.menu-bar1'),
                    menu2 = menuWrapper.children('.menu-bar2'),
                    menu3 = menuWrapper.children('.menu-bar3');

                scope.closeNav = function() {
                    if (menuWrapper.hasClass('menu-wrapper-toggled')) {
                        menuWrapper.removeClass('menu-wrapper-toggled');
                        menu1.removeClass('menu-bar1-toggled');
                        menu2.removeClass('menu-bar2-toggled');
                        menu3.removeClass('menu-bar3-toggled');
                        navWrapper.removeClass('navbar-animate-toggled');
                    }
                };

                menuWrapper.bind('click', function() {
                    menuWrapper.toggleClass('menu-wrapper-toggled');
                    menu1.toggleClass('menu-bar1-toggled');
                    menu2.toggleClass('menu-bar2-toggled');
                    menu3.toggleClass('menu-bar3-toggled');
                    navWrapper.toggleClass('navbar-animate-toggled');
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
    .directive('videoPlayButton', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var gradient = element.next('.video').next('.gradient');
                    var video = element.next('.video');

                    element.css('opacity', '0');
                    gradient.css({ 'opacity': '0.8', 'z-index': '1' });
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
                        windowHeight = document.documentElement.clientHeight - 20;
                        //windowWidth = document.documentElement.clientWidth - 20;

                    // Grab modal content
                    modalContent.css({'height': 'auto', 'width': windowHeight});
                    // Change height and width to fullscreen
                });
            }
        };
    });
