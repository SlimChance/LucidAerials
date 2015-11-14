'use strict';

angular
    .module('LucidAerials', [
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
    .config(['$routeProvider', function($routeProvider) {
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
    }]);
