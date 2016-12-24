'use strict';

require('es5-shim');
require('es5-sham');
require('json3');

require('jquery');
var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-cookies');
require('angular-messages');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('angular-utils-pagination');
require('bootstrap-sass');
require('moment');
require('angular-moment');

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
        'angularMoment',
        'angularUtils.directives.dirPagination'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'videosCtrl',
                controllerAs: 'videos'
            })
            .when('/pictures', {
                templateUrl: 'views/pictures.html',
                controller: 'picturesCtrl',
                controllerAs: 'pics'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'contactCtrl',
                controllerAs: 'contact'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .service('videoService', require('./services/videoService'))
    .service('pictureService', require('./services/pictureService'))
    .service('transformiconService', require('./services/transformiconService'))
    .directive('hideScroll', require('./directives/homeDirective').hideScroll)
    .directive('fadeOverlay', require('./directives/homeDirective').fadeOverlay)
    .directive('socialParallax', require('./directives/homeDirective').socialParallax)
    .directive('selfieParallax', require('./directives/homeDirective').selfieParallax)
    .directive('lcdNavigation', require('./directives/commonDirectives').lcdNavigation)
    .directive('mobileScrollHide', require('./directives/commonDirectives').mobileScrollHide)
    .directive('lcdSocialMedia', require('./directives/commonDirectives').lcdSocialMedia)
    .directive('footer', require('./directives/commonDirectives').footer)
    .directive('modalClick', require('./directives/picturesDirective').modalClick)
    .directive('imageDropdown', require('./directives/picturesDirective').imageDropdown)
    .directive('twitterTimeline', require('./directives/twitterDirective'))
    .directive('videoPlayButton', require('./directives/videosDirective').videoPlayButton)
    .directive('scrollToCenter', require('./directives/videosDirective').scrollToCenter)
    .directive('scrollToTop', require('./directives/videosDirective').scrollToTop)
    .controller('contactCtrl', require('./controllers/contactCtrl'))
    .controller('homeCtrl', require('./controllers/homeCtrl'))
    .controller('commonCtrl', require('./controllers/commonCtrl'))
    .controller('picturesCtrl', require('./controllers/picturesCtrl'))
    .controller('videosCtrl', require('./controllers/videosCtrl'));