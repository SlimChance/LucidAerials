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
    .directive('hideScroll', require('./directives/homeDirective').hideScroll)
    .directive('fadeOverlay', require('./directives/homeDirective').fadeOverlay)
    .directive('mobileNav', require('./directives/indexDirective').mobileNav)
    .directive('desktopNav', require('./directives/indexDirective').desktopNav)
    .directive('mobileScrollHide', require('./directives/indexDirective').mobileScrollHide)
    .directive('footer', require('./directives/indexDirective').footer)
    .directive('modalClick', require('./directives/picturesDirective').modalClick)
    .directive('imageDropdown', require('./directives/picturesDirective').imageDropdown)
    .directive('twitterTimeline', require('./directives/twitterDirective'))
    .directive('videoPlayButton', require('./directives/videosDirective').videoPlayButton)
    .directive('scrollToCenter', require('./directives/videosDirective').scrollToCenter)
    .directive('scrollToTop', require('./directives/videosDirective').scrollToTop)
    .controller('ContactCtrl', require('./controllers/contactCtrl'))
    .controller('HomeCtrl', require('./controllers/homeCtrl'))
    .controller('IndexCtrl', require('./controllers/indexCtrl'))
    .controller('PicturesCtrl', require('./controllers/picturesCtrl'))
    .controller('VideosCtrl', require('./controllers/videosCtrl'));