'use strict';

function picturesCtrl(pictureService) {
    'ngInject';
    let vm = this; // pics

    vm.expanded = null;
    vm.allLoaded = false;
    vm.value = 21;

    vm.grabImages = grabImages;
    vm.expand = expand;
    vm.getImage = getImage;

    pictureService.getRecentPhotos().get((images) => {
        vm.images = images.data;
        console.log(images);
    });

    function grabImages() {
        vm.lazyLoadImages = vm.images.slice(0, vm.value);
        vm.value += 9;

        if (vm.value >= (vm.images.length + 6)) {
            vm.allLoaded = true;
        }
    };

    function expand(index) {
        vm.expanded = index;
    };

    function getImage(index, picture) {
        if (vm.expanded === index) {
            return picture.largeImage;
        } else {
            return picture.smallImage;
        }
    };
}

module.exports = picturesCtrl;