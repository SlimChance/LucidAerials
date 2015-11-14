(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .directive('mobileNav', MobileNav)
        .directive('desktopNav', DesktopNav)
        .directive('mobileScrollHide', MobileScrollHide)
        .directive('footer', Footer);

    function MobileNav() {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/mobileNav.html'
        };
    }

    function DesktopNav() {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/desktopNav.html'
        };
    }

    function MobileScrollHide() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // var lastScroll = 0;
                // angular.element($window).bind('scroll', function() {
                //     var scroll = this.scrollY;
                //     var menuWrapper = element.children('.menu-wrapper');
                //     if (!menuWrapper.hasClass('menu-wrapper-toggled')) {
                //         if (scroll < lastScroll) {
                //             if (element.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
                //                 element.css('transform', 'translateY(0px)');
                //             }
                //         } else if (scroll > 55) {
                //             if (element.css('transform') === 'matrix(1, 0, 0, 1, 0, 0)') {
                //                 element.css('transform', 'translateY(-55px)');
                //             }
                //         }
                //         lastScroll = scroll;
                //     }
                // });
            }
        };
    }

    function Footer() {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/footer.html'
        };
    }
})();