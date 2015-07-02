'use strict';

lucidAerials.directive('mobileNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/mobileNav.html'
        }
    })
    .directive('desktopNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/desktopNav.html'
        }
    })
    .directive('toggleMobileMenu', function() {
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
    .directive('mobileScrollHide', function($window) {
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
    });