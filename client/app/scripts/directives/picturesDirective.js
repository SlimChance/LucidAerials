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
    });