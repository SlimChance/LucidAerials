(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .controller('PicturesCtrl', PicturesCtrl);

    PicturesCtrl.$inject = ['$scope', '$window', 'pictureService'];

    function PicturesCtrl($scope, $window, pictureService) {
        // $scope.hidePrev = false;
        // $scope.hideNext = false;
        $scope.expanded = null;
        $scope.allLoaded = false;
        $scope.value = 21;
        pictureService.getPictures().then(function(images) {
            $scope.images = images;
            $scope.lazyLoadImages = $scope.images.slice(0, 12);
        });

        $scope.grabImages = function() {
            $scope.lazyLoadImages = $scope.images.slice(0, $scope.value);
            $scope.value += 9;

            if ($scope.value >= 42) {
                $scope.allLoaded = true;
            }
        };

        $scope.expand = function(index) {
            $scope.expanded = index;
        };

        $scope.getImage = function(index, picture) {
            if ($scope.expanded === index) {
                return picture.largeImage;
            } else {
                return picture.smallImage;
            }
        };
        // $scope.nextPic = function(index) {
        //     // Grab elements
        //     var modal = '#picModal' + index,
        //         nextModal = '#picModal' + (index + 1),
        //         modalElem = angular.element(modal),
        //         nextModalElem = angular.element('.picture-repeat').children(nextModal),
        //         modalContent = nextModalElem.children('.modal-dialog').children('.modal-content'),
        //         windowHeight = document.documentElement.clientHeight - 20;
        //         //windowWidth = document.documentElement.clientWidth - 20;

        //     // Hide current modal
        //     modalElem.modal('hide');

        //     // Go to next picture
        //     if (index < 8) {
        //         modalContent.css({'height': 'auto', 'width': windowHeight});
        //         nextModalElem.modal('show');
        //     }
        // };

        // $scope.prevPic = function(index) {
        //     // Grab elements
        //     var modal = '#picModal' + index,
        //         prevModal = '#picModal' + (index - 1),
        //         modalElem = angular.element(modal),
        //         prevModalElem = angular.element('.picture-repeat').children(prevModal),
        //         modalContent = prevModalElem.children('.modal-dialog').children('.modal-content'),
        //         windowHeight = document.documentElement.clientHeight - 20;
        //         //windowWidth = document.documentElement.clientWidth - 20;

        //     // Hide current modal
        //     modalElem.modal('hide');

        //     // Go to previous picture
        //     if (index > 0) {
        //         modalContent.css({'height': 'auto', 'width': windowHeight});
        //         prevModalElem.modal('show');
        //     }
        // };

        // $scope.checkArrow = function(index) {
        //     if (index === 0) {
        //         $scope.hidePrev = true;
        //     } else if (index === 8) {
        //         $scope.hideNext = true;
        //     }

        //     if (index !== 0) {
        //         $scope.hidePrev = false;
        //     } else if (index !== 8) {
        //         $scope.hideNext = false;
        //     }
        // };
    }
})();
