'use strict';

require('es5-shim');
require('es5-sham');

require('./pace');

require('jquery');
var angular = require('angular');
require('angular-resource');
require('angular-sanitize');
require('angular-route');
require('angular-cookies');
require('angular-aria');
require('angular-animate');
require('angular-messages');
require('angular-touch');
require('angular-utils-pagination');
require('bootstrap-sass');




angular
    .module('LucidAerials', [
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngCookies',
        'ngAria',
        'ngAnimate',
        'ngMessages',
        'ngTouch',
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
    }])
    .service('VideoService', require('./services/videoService'))
    .service('PictureService', require('./services/pictureService'))
    .service('TransformiconService', require('./services/transformiconService'))
    .directive('IndexDirective', require('./directives/indexDirective'))
    .directive('HideScroll', require('./directives/homeDirective').HideScroll)
    .directive('FadeOverlay', require('./directives/homeDirective').FadeOverlay)
    .directive('HomeCtrl', require('./directives/homeCtrl'))
    .directive('HomeCtrl', require('./directives/homeCtrl'))
    .directive('HomeCtrl', require('./directives/homeCtrl'))
    .directive('HomeCtrl', require('./directives/homeCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'));

require('./directives/indexDirective');
require('./directives/homeDirective');
require('./directives/picturesDirective');
require('./directives/videosDirective');
require('./directives/videosDirective');
require('./directives/twitterDirective');
require('./controllers/indexCtrl');

require('./controllers/videosCtrl');
require('./controllers/picturesCtrl');
require('./controllers/contactCtrl');