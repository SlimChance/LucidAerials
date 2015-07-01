'use strict';

var lucidAerials = angular.module('LucidAerials', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'smoothScroll'
    ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'VideosCtrl'
            })
            .when('/pictures', {
                templateUrl: 'views/pictures.html',
                controller: 'PicturesCtrl'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
