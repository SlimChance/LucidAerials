'use strict';

lucidAerials.directive('modalClick', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.bind('click', function() {
                    var modalContent = element.next().next().children('.modal-dialog').children('.modal-content'),
                        windowHeight = document.documentElement.clientHeight - 20;
                        //windowWidth = document.documentElement.clientWidth - 20;

                    // Grab modal content
                    modalContent.css({'height': 'auto', 'width': windowHeight});
                    // Change height and width to fullscreen
                });
            }
        };
    })
    .directive('imageDropdown', function () {
        return {
            restrict: 'A',
            scope: {
                index: '='
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var clone = element.clone();
                    var prevClone = angular.element('.cloned-image');
                    var domIndex = scope.index + 1;
                    var clientHeight = document.documentElement.clientHeight;
                    var clientWidth = document.documentElement.clientWidth;

                    // remove old clone and add new clone
                    prevClone.remove();
                    clone.addClass('cloned-image');

                    // place clone after each third element
                    if (domIndex <= 9) {
                        if (domIndex % 3 === 0) {
                            element.after(clone);
                        } else if (domIndex % 3 === 1) {
                            var thirdElem = element.next().next();
                            thirdElem.after(clone);
                        } else if (domIndex % 3 === 2) {
                            var thirdElem = element.next();
                            thirdElem.after(clone);
                        }
                    } else {
                        element.after(clone);
                    }

                    // scroll to image
                    if (clientHeight >= 800) {
                        clientHeight -= 100;
                        clone.css({ 'height': clientHeight });
                        window.scrollTo(0, clone[0].offsetTop - 50);
                    } else {
                        clientHeight -= 30;
                        clone.css({ 'height': clientHeight });
                        window.scrollTo(0, clone[0].offsetTop - 15);
                    }
                });
            }
        }
    });