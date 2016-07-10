'use strict';

function mobileNav() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/mobileNav.html'
    };
}

function desktopNav() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/desktopNav.html'
    };
}

function mobileScrollHide() {
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

function footer() {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/footer.html'
    };
}

module.exports = {
    mobileNav: mobileNav,
    desktopNav: desktopNav,
    mobileScrollHide: mobileScrollHide,
    footer: footer
}