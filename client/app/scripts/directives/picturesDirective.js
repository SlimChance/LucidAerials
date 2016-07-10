'use strict';

function modalClick() {
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
}

function imageDropdown() {
    return {
        restrict: 'A',
        scope: {
            index: '='
        },
        link: function (scope, element) {
            element.bind('click', function () {
                var clientWidth = document.documentElement.clientWidth,
                    clone = element.clone(),
                    image = clone.children('img'),
                    prevClone = angular.element('.cloned-image'),
                    domIndex = scope.index + 1,
                    clientHeight = document.documentElement.clientHeight;

                if (clientWidth > 490 && clientWidth < 768) {
                    // remove old clone and add new clone
                    prevClone.remove();
                    clone.addClass('cloned-image');

                    // place clone after each third element
                    if (domIndex <= 60) {
                        if (domIndex % 2 === 0) {
                            element.after(clone);
                        } else if (domIndex % 2 === 1) {
                            var secondElem = element.next();
                            secondElem.after(clone);
                        }
                    } else {
                        element.after(clone);
                    }

                    // scroll to image
                    clientHeight -= 30;
                    image.css({ 'height': clientHeight });
                    window.scrollTo(0, clone[0].offsetTop - 15);
                } else if (clientWidth >= 768) {
                  // remove old clone and add new clone
                  prevClone.remove();
                  clone.addClass('cloned-image');

                  // place clone after each third element
                  if (domIndex <= 60) {
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
                      image.css({ 'height': clientHeight });
                      // Scroll to center!!!
                      window.scrollTo(0, clone[0].offsetTop - 50);
                  } else {
                      clientHeight -= 30;
                      image.css({ 'height': clientHeight });
                      window.scrollTo(0, clone[0].offsetTop - 15);
                  }
                }
            });
        }
    };
}

module.exports = {
    modalClick: modalClick,
    imageDropdown: imageDropdown
}