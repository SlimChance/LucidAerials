'use strict';

angular
    .module('LucidAerials', [
        'ng',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'smoothScroll',
        'angularUtils.directives.dirPagination'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'VideosCtrl',
                controllerAs: 'videos'
            })
            .when('/pictures', {
                templateUrl: 'views/pictures.html',
                controller: 'PicturesCtrl',
                controllerAs: 'pics'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl',
                controllerAs: 'contact'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
