'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
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
            .otherwise({
                redirectTo: '/'
            });
    });
