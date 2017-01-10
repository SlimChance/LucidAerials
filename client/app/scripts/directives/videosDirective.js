'use strict';

function videoPlayButton() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.bind('click', function() {
                var video = element.next('.video');

                element.css({ 'opacity': '0', display: 'none' });
                video.css({ 'opacity': '1', 'z-index': '2', 'display': 'block' });
            });
        }
    };
}

function scrollToCenter() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.bind('click', function() {
                window.scrollTo(0, element[0].offsetTop - 50);
            });
        }
    };
}

function scrollToTop($document, $timeout, $interval) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // element.bind('click', () => {
            //     let top = angular.element('#top'),
            //         elementY = $document[0].body.scrollTop;

            //     $interval(() => {
            //         if (elementY > 0) {
            //             elementY -= 25;
            //             window.scrollTo(0, elementY);
            //         }
            //     }, 17);
            // });
        }
    }
}

module.exports = {
    videoPlayButton: videoPlayButton,
    scrollToCenter: scrollToCenter,
    scrollToTop: scrollToTop
}