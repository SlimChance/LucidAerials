'use strict';

lucidAerials.controller('IndexCtrl', function($scope, $location) {
        $scope.navigateTo = function(view) {
            $location.path(view);
        };

        $scope.navToggled = false;

        var menuWrapper = angular.element('.mobile-nav').children('.nav-wrapper').children('.menu-wrapper'),
            navWrapper = angular.element('.mobile-nav').children('.nav-wrapper').next('.navbar-animate'),
            menu1 = menuWrapper.children('.menu-bar1'),
            menu2 = menuWrapper.children('.menu-bar2'),
            menu3 = menuWrapper.children('.menu-bar3');

                // console.log(menuWrapper);
                // console.log(navWrapper);
                // console.log(menu1);
                // console.log(menu2);
                // console.log(menu3);

        $scope.closeNav = function() {
            console.log('close nav');
            if (navWrapper.hasClass('navbar-animate-toggled')) {
                menu1.removeClass('menu-bar1-toggled');
                menu2.removeClass('menu-bar2-toggled');
                menu3.removeClass('menu-bar3-toggled');
                navWrapper.removeClass('navbar-animate-toggled');
                navWrapper.css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.258824');
            }
        };

        $scope.toggleNav = function(e) {
            console.log(e.originalEvent);
            e.stopPropagation();

            $scope.navToggled = !$scope.navToggled;
            //console.log($scope.navToggled);
        }
    });
